// import { RequestQueue, CheerioCrawler } from "crawlee";


// const requestQueue = await RequestQueue.open();

// await requestQueue.addRequest({url: 'https://crawlee.dev'});

//  //create the crawler and add the queue with our URL
//  // and request handler to process the page

//  const crawler = new CheerioCrawler({
//     requestQueue,
//     async requestHandler({$, request}){
//         const title = $('title').text();
//         console.log(`The title of "${request.url}" is: ${title}.`);
//     }
//  })


//  await crawler.run();



// -------------- simple way ---------------/

import { CheerioCrawler } from "crawlee";

const crawler = new CheerioCrawler({
    async requestHandler({$, request}){
        const title = $('title').text();
        console.log(`Title of ${request.url} is: ${title}.`);
    }
})

await crawler.run(['https://google.com'])