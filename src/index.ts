import { getHTML } from './crawl'

async function main(): Promise<void> {
    const commandLineArgs = process.argv[2];
    if (process.argv.length < 3) {
      console.error("not enough arguments")
      process.exit(1)
    }
    else if (process.argv.length > 3) {
      console.error("too many arguments")
      process.exit(1)
    }
    else if (process.argv.length === 3) {
      console.log(`The crawler is starting at url ${commandLineArgs}`)
      try {
        getHTML(commandLineArgs)
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
      
    }; 
  
  }
  
  main();