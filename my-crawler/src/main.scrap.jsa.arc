//https://crawlee.dev/docs/introduction/scraping

import { PlaywrightCrawler, Dataset } from 'crawlee';

const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page, request, enqueueLinks }) => {
        console.log(`Processing: ${request.url}`)
        if (request.label === 'DETAIL') {
            const urlParts = request.url.split('/').slice(-2);
            const modifiedTimestamp = await page.locator('time[datetime]').getAttribute('datetime');
            const runsRow = page.locator('ul.ActorHeader-stats > li').filter({ hasText: 'Runs' });
            const runCountString = await runsRow.locator('span').last().textContent();

            const results = {
                url: request.url,
                uniqueIdentifier: urlParts.join('/'),
                owner: urlParts[0],
                title: await page.locator('h1').textContent(),
                description: await page.locator('span.actor-description').textContent(),
                modifiedDate: new Date(Number(modifiedTimestamp)),
                runCount: Number(runCountString.replaceAll(',', '')),
            }

            Dataset.pushData(results);
        } else {
            // This means we're either on the start page, with no label,
            // or on a list page, with LIST label.

            await page.waitForSelector('.ActorStorePagination a');
            await enqueueLinks({
                selector: '.ActorStorePagination a',
                label: 'LIST',
            })
            
            // In addition to adding the listing URLs, we now also
            // add the detail URLs from all the listing pages.
            await page.waitForSelector('.eIAjBO');
            await enqueueLinks({
                selector: '.eIAjBO',
                label: 'DETAIL', // <= note the different label
            })
        }
    },
});

await crawler.run(['https://apify.com/store']);