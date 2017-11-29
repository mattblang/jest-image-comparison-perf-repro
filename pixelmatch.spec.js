const puppeteer = require('puppeteer');
const pixelmatch = require('pixelmatch');

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
    await page.goto('https://www.google.com/about/our-company/');
    const screenshot1 = await page.screenshot();
    console.timeEnd("screenshot1");

    console.time("screenshot2")
    await page.goto('https://www.google.com/about/our-commitments/');
    const screenshot2 = await page.screenshot();
    console.timeEnd("screenshot2");

    console.time("compare")
    const numDiffPixels = pixelmatch(screenshot1, screenshot2, null, 1100, 2400, {
        threshold: 0.1
    });
    console.timeEnd("compare");

    expect(numDiffPixels).toEqual(0);
}, 20000);

afterAll(async() => {
    await browser.close();
});