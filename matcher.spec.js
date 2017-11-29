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

    // await page.goto('https://www.google.com')
    await page.goto('https://www.google.com/about');

    const screenshot1 = await page.screenshot();

    console.time("compare");
    expect(screenshot1).toMatchImageSnapshot();
});

afterAll(async() => {
    console.timeEnd("compare");
    await browser.close();
});