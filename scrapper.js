//source: https://blog.apify.com/how-to-scrape-the-web-with-playwright-ece1ced75f73/

// Import the playwright library into our scraper.
const playwright = require('@playwright/test');

async function main() {
    // Open a Chromium browser. We use headless: false
    // to be able to watch what's going on.
    const browser = await playwright.chromium.launch({
        headless: false,
    });
    // Open a new page / tab in the browser.
    const page = await browser.newPage({
        bypassCSP: true, // This is needed to enable JavaScript execution on GitHub.
    });
    // Tell the tab to navigate to the GitHub Topics page.
    await page.goto('https://github.com/topics/javascript');
    await page.pause();
    // Click and tell Playwright to keep watching for more than
    // 20 repository cards to appear in the page.
    await page.click('text=Load more');
    await page.waitForFunction(() => {
        const repoCards = document.querySelectorAll('article.border');
        return repoCards.length > 20;
    });
    // Extract data from the page. Selecting all 'article' elements
    // will return all the repository cards we're looking for.
    const repos = await page.$$eval('article.border', (repoCards) => {
        return repoCards.map(card => {
            const [user, repo] = card.querySelectorAll('h3 a');
            const stars = card.querySelector('#repo-stars-counter-star').getAttribute('title');
            const description = card.querySelector('div.px-3 > p + div');
            const topics = card.querySelectorAll('a.topic-tag');

            const toText = (element) => element && element.innerText.trim();
            const parseNumber = (text) => Number(text.replace(/,/g, ''));

            return {
                user: toText(user),
                repo: toText(repo),
                url: repo.href,
                stars: parseNumber(stars),
                description: toText(description),
                topics: Array.from(topics).map((t) => toText(t)),
            };
        });
    });
    // Print the results. Nice!
    console.log(`We extracted ${repos.length} repositories.`);
    console.dir(repos);
    // Turn off the browser to clean up after ourselves.
    await browser.close();
}

main();