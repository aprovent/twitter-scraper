# Twitter Scraper

Twitter Scraper is a simple scraper tool based on [playwright](https://github.com/microsoft/playwright). 
It can scrap **multiple tweets** and generate for each a beautiful **screenshot** and a **pdf**.

Example:

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

