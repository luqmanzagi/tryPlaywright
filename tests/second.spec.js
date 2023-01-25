//npx playwright codegen

const {test, expect} = require('@playwright/test');

test('Second Test', async({page}) => {
    await page.goto('https://www.programsBuzz.com/user/login')

    //use id name
    await page.locator('#edit-name').type('username')

    //use xpath
    await page.locator("//input[@id='edit-pass']").type('mypassword')

    //click button
    await page
        .getByRole('button', {name: 'op'})
        .click() 
});