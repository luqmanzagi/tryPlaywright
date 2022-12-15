const {test, expect} = require ('@playwright/test');

test('Test Title', async({page}) => {
    await page.goto('https://programsbuzz.com');
    await expect(page).toHaveTitle("ProgramsBuzz - Online Technical Courses");
});