// helper function to handle the sorting logic
function sortPages(pages: Record<string, number>): [string,number][] {
    // 1. Convert the Record<string, number> into an array of [key, value] pairs.
    const pagesArray = Object.entries(pages); // e.g., [['url1', 2], ['url2', 5]]


    // 2. Sort the array based on the value (the count), in descending order.
    pagesArray.sort((pageA: [string,number], pageB: [string,number]) => {
        // pageA is [urlA, countA]
        // pageB is [urlB, countB]
        // We want to sort from highest count to lowest
        return pageB[1] - pageA[1];
    });
    return pagesArray;
}

export function printReport(baseURL :string, pages :Record<string,number>):void{
    console.log(`
        =============================
        REPORT for ${baseURL}
        =============================`);
    if (Object.keys(pages).length === 0) {
        console.log("No pages were crawled.");
        console.log("=============================");
        
    }

    const sortedPages = sortPages(pages);

    console.log("\Pages sorted by internal link count:");
    for (const [url, count] of sortedPages) {
        const linkText = count === 1 ? "link" : "links";
        console.log(`FOund ${count} internal ${linkText} to ${url}`)
        console.log("\n=============================");
        console.log("        END REPORT");
        console.log("=============================");
    }
    
}