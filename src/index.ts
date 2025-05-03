import { getHTML, crawlPage } from './crawl'
import { printReport } from './report'

async function main(): Promise<void> {
    const args = process.argv.slice(2);
    if (args.length < 1) {
      console.error("Error: Please provide the starting URL as a command-line argument.")
      process.exit(1);
    }
    else if (args.length > 1) {
      console.error("Error: Too many arguments provided. Please provide only the starting URL.")
      process.exit(1);
    }
    const baseURL = args[0]

    console.log(`Crawler starting at base URL: ${baseURL}`)
    try {
        // start crawling using baseURL for both initial and current page
        // The initial pages object is empty by default
        const pages = await crawlPage(baseURL, baseURL, {})

        // After the crawl is complete, print the pages object
        // After the crawl is complete, print the pages object properly
        printReport(baseURL, pages)

    } catch (error) {
        console.error('An unexpected error occurred:', error);
        process.exit(1);
    }
      
    }; 

  
  main();