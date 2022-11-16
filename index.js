import cheerio from 'cheerio';
import playwright from 'playwright';

import twitterUrls from './twitter-links.js';

/// Async sleep method
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

async function getTweet(page, url)
{
	try {
		await page.goto(url, { waitUntil: 'networkidle' });
		await page.waitForSelector('[data-testid="primaryColumn"]');
		
		/// Remove no content parts
		await (await page.$('#layers')).evaluate(node => node.remove());
		await (await page.$('header')).evaluate(node => node.remove());
		await (await page.$('[data-testid="sidebarColumn"]')).evaluate(node => node.remove());
		await (await page.$('[data-testid="primaryColumn"]')).evaluate(node => {
			node.style.maxWidth = '100%';
			node.parentNode.parentNode.parentNode.style.width = '100%';
		});
		
		/// Retrieve the twitter account name
		const accountName = url.split(".com/")[1].split('/')[0];
		
		/// Retrieve the tweet datetime
		const timeNode = (await page.locator('time').first());
		const time = await timeNode.evaluate(e => e.getAttribute("datetime").split('T')[0]);
		
		const tweetContentStart = (await page.locator('.r-1blvdjr[data-testid="tweetText"]').first().textContent())
			.trim()
			.replace(/\n/g, ' ')
			.replace(/[/\\?%*:|"<>]/gi, '-')
			.substring(0, 100)
		
		/// Define filename 
		const filename = `${time}_${accountName}_${tweetContentStart}`;

		/// Extend HTMLDivElement.removeChild to prevent the timeline from deleting previous tweets when scrolling the page  
		await page.evaluate(() => {
			HTMLDivElement.prototype.oldRemoveChild = HTMLDivElement.prototype.removeChild;
			HTMLDivElement.prototype.removeChild = function(node) {
				if (!node.hasAttribute("data-testid")) {
					HTMLDivElement.prototype.oldRemoveChild.call(this, node);
				}
			};			
		});
		
		/// Scroll the page of 1024px 40 times 
		process.stdout.write("Scrolling the page: ");
		for (var i = 0 ; i < 40; i++) {
			process.stdout.write(".");
			await page.mouse.wheel(0, 1024);
			await sleep(250);
		}
		process.stdout.write("\n");
		
		console.log("Writing screenshot");
		await page.screenshot({ path: "tweets/" + filename + '.png', fullPage: true });

		console.log("Writing pdf");
		await page.pdf({ path: "tweets/" + filename + '.pdf', printBackground: true });
	}
	catch(e) { 
		console.log('exception', e);
		return false;
	}
	return true;
}

const browser = await playwright.chromium.launch();
const page = await browser.newPage();

/// Timeout of 15s
// page.setDefaultTimeout(15000);

let index = 0;
for(; index < twitterUrls.length; index++) {
	const url = twitterUrls[index];
	console.log(`Process tweet #${index} - ${url}`);
	try {
		await getTweet(page, url);
	}
	catch {
		continue;
	}
}
await browser.close();