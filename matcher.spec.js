const puppeteer = require('puppeteer');

const {
    toMatchImageSnapshot
} = require('jest-image-snapshot');
expect.extend({
    toMatchImageSnapshot
});

let browser;
let page;

beforeEach(async() => {
    browser = await puppeteer.launch({
        headless: true // false to launch real browser
    });

    page = await browser.newPage();

    await page.setViewport({
        width: 1100,
        height: 2400
    })
});

it('works', async() => {
    console.time("screenshot1");
    await page.goto('https://www.google.com/about/our-commitments/');
    const screenshot1 = await page.screenshot();
    console.timeEnd("screenshot1");

    console.time("compare")
    expect(screenshot1).toMatchImageSnapshot();
});

afterAll(async() => {
    console.timeEnd("compare");
    await browser.close();
});