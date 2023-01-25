import { CheerioCrawler } from 'crawlee';

const crawler = new CheerioCrawler({
    maxRequestsPerCrawl: 20,

    async requestHandler({ $, request, enqueueLinks }) {
        const title = $('title').text();
        console.log(`The title of "${request.url}" is: ${title}.`);

        await enqueueLinks({
            strategy: 'all',
            globs: ['http?(s)://apify.com/*/*'],
            transformRequestFunction(req){
                if (req.url.endsWith('.pdf')) return  false;
                return req;
            }
        });
    },
})

await crawler.run(['https://crawlee.dev']);