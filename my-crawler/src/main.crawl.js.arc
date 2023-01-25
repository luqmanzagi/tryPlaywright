//https://crawlee.dev/docs/introduction/crawling

import { PlaywrightCrawler } from 'crawlee';

const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page, request, enqueueLinks }) => {
        console.log(`Processing: ${request.url}`)
        if (request.label === 'DETAIL') {
            // We're not doing anything with the details yet.
        } else {
            await page.pause()
            // This means we're either on the start page, with no label,
            // or on a list page, with LIST label.

            await page.waitForSelector('.ActorStorePagination-loadMoreButton');
            // await enqueueLinks({
            //     selector: '.ActorStorePagination-loadMoreButton',
            //     label: 'LIST',
            // })

            await page.locator('text=Load more').click()
            

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