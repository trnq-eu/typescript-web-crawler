import { JSDOM } from 'jsdom'

export function normalizeURL(urlString: string): string {
    try {
        // parse a url string into a URL Object (from the Node API)
        const url = new URL(urlString);

        // extract hostname and pathname
        let normalizedURL = `${url.hostname}${url.pathname}`;
        
        // Remove the trailing slash if it exists.
        if (normalizedURL.endsWith("/")) {
            normalizedURL = normalizedURL.slice(0, -1);
        }

        // Handle empty path
        if (normalizedURL === url.hostname) {
            normalizedURL = url.hostname;
        }


        return normalizedURL;


    } catch (error) {
        // Handle invalid URLs.  The URL constructor throws an error for invalid URLs.
        console.error(`Error normalizing URL: ${urlString}`, error);
        return ""; 

    }
}


export function getURLsFromHTML(html: string, baseURL: string): string[] {
    try {
        const dom = new JSDOM(html, {url: baseURL});
        const anchors = dom.window.document.querySelectorAll('a');
        const links: string[] = [];

        for (const anchor of anchors) {
            const href = anchor.href
            console.log(href)
            links.push(href)
        }
        return links
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getHTML(URL:string): Promise<string> {
    // The function should fetch the webpage on the URL
    // and if the http status code is an error lelev code
    // prints the error. Otherwise print the html body as a string
    try {
    const response = await fetch(URL);
    // if the error is a 400+ code, print and error and return
    if (response.status >= 400){
        console.error(`Error fetching ${URL}: Status code: ${response.status} ${response.statusText}`);
        return "";
    } 
    // If the response content-type header is not text/html print an error and return
   const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
        console.error(`Error fetching ${URL}: Content type: ${contentType}`);
        return "";
    }

    const htmlBody = await response.text();
    console.log(htmlBody);  
    return htmlBody;
    } catch (error) {
        console.error(error);
        return "";
    }

}

;