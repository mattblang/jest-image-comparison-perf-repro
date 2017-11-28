const puppeteer = require('puppeteer');

const {
    toMatchImageSnapshot
} = require('jest-image-snapshot');
expect.extend({
    toMatchImageSnapshot
});

let browser;

it('works', async() => {
    browser = await puppeteer.launch({
        headless: true // false to launch real browser
    });
    const page = await browser.newPage();

    await page.setViewport({
        width: 1100,
        height: 2400
    })
    await page.goto('https://www.yahoo.com');

    const screenshot1 = await page.screenshot();
    expect(screenshot1).toMatchImageSnapshot();
});

afterAll(async() => {
    await browser.close();
});