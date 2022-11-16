# Twitter Scraper

Twitter Scraper is a simple scraper tool based on [playwright](https://github.com/microsoft/playwright). 
It can scrap **multiple tweets** and generate for each a beautiful **screenshot** and a **pdf**.

Examples:

![example.jpg](tweets/2021-01-13_DalaiLama_Watch Live- HHDL joins Harvard Business School professor and columnist Arthur Brooks for an online c.png?raw=true)

and

![example.pdf](tweets/2021-01-13_DalaiLama_Watch Live- HHDL joins Harvard Business School professor and columnist Arthur Brooks for an online c.pdf)

# Installation

Clone the project then execute :

````
npm i
````

# Configuration

Edit the `twitter-links.js` file and add all the tweet urls you want to scrap.

````
const urls = [
  "https://twitter.com/DalaiLama/status/1559111653450727425",
  "https://twitter.com/DalaiLama/status/2",
  "https://twitter.com/DalaiLama/status/3",
  "https://twitter.com/DalaiLama/status/4"
];
````

# Execution

````
npm run scrap
````

Pdf and Screenshots will be exported in the `/tweets` directory


# Configuration

You can configure the scraper in the `index.js` file :

Change export directory:
````
const exportDir = "tweets";
````

Enable/Disable screenshot or pdf export :
````
const exportScreenshot = true;
const exportPdf = true;
````

Increase or decrease scraper timeout :
````
const timeout = 30; // in seconds
````

Increase or decrease screenshot/pdf number of page :
````
const pageCount = 40; // number of page (page height 1024px)
````


# Knwown problems

## Timeout

On some big tweets or slow computers, you may encounter a timeout. 

In that case, you could increase the timeout 

Replacing
````
const timeout = 30; // in seconds
````

by (or more)
````
const timeout = 60; // in seconds
````

# Todo

- Pass configuration to index.js by arguments
- Best timeout handle
