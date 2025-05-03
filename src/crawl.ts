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
};

export async function crawlPage(
    baseURL: string,
    currentURL: string,
    pages: Record<string, number> = {},
):Promise<Record<string,number>>{
    try {

        const baseURLObj = new URL(baseURL);
        const currentURLObj = new URL(currentURL);
        // 1. Check if the current URL's hostname matches the base URL's hostname.
        if (baseURLObj.hostname !== currentURLObj.hostname) {
            return pages;
        }
        // 2. Get a normalized version of the currentURL.
        const normalizedCurrentURL = normalizeURL(currentURL);

        // 3. Check if the current URL is already in pages
        if (pages[normalizedCurrentURL] > 0){
            pages[normalizedCurrentURL]++;
            console.log(`Already visited ${normalizedCurrentURL}, incrementing count.`);
            return pages;
        } else {
            pages[normalizedCurrentURL]=1;
            console.log(`Visiting ${normalizedCurrentURL} for the first time.`);
        
        // 4. Fetch html for the pages being crawled
        const htmlBody = await getHTML(currentURL);

        // 5. Handle fetch failure
        if (!htmlBody) {
            console.log(`Failed to fetch HTML for ${currentURL}`)
            // Keep the page in the 'pages' object with count 1 to mark it as attempted.
            return pages; 
        }

        // 6. Extract URLs from the fetched HTML.
        const nextURLs=  getURLsFromHTML(htmlBody, baseURL);

        // 7. Recursively crawl the extracted URLs.
        let updatedPages = pages;
        for (const nextURL of nextURLs){
            // pass the accumulated pages object to the recursive call
            updatedPages = await crawlPage(baseURL, nextURL, updatedPages);
        }
        // return the updated pages object
        return updatedPages;
        }
        
    }catch(error) {
        console.error(error);
        return pages;
    }
    return pages;

    };

    
