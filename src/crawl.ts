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
    return [];

}
