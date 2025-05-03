# TypeScript Web Crawler

A simple web crawler built with TypeScript and Node.js that takes a starting URL, crawls all pages within the same domain, and generates a report of found internal links sorted by count.

## Features

*   Crawls a website starting from a given URL.
*   Stays within the domain of the starting URL (does not crawl external links).
*   Normalizes URLs to avoid duplicate counting (e.g., handles trailing slashes).
*   Counts the number of internal links pointing to each page found within the site.
*   Outputs a sorted report to the console, listing pages by the number of incoming links (most linked first).

## Prerequisites

*   [Node.js](https://nodejs.org/) (which includes npm)

## Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd typescript-web-crawler
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
    *(Note: If you haven't initialized npm yet, run `npm init -y` first)*
    *(Note: You might need to install `tsx` if it's not already a dev dependency: `npm install --save-dev tsx`)*

## Usage

Run the crawler from your terminal using the `npm run start` command, followed by the starting URL:

```bash
npm run start <starting-url>
