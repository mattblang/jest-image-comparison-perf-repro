const puppeteer = require('puppeteer');
const compareImages = require('resemblejs/compareImages');

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
    await page.goto('https://www.google.com');
    const screenshot1 = await page.screenshot();
    console.timeEnd("screenshot1");

    console.time("screenshot2");
    await page.goto('https://www.google.com/about');
    const screenshot2 = await page.screenshot();
    console.timeEnd("screenshot2")

    console.time("compare");
    const data = await compareImages(screenshot1, screenshot2);
    console.timeEnd("compare");

    expect(data.misMatchPercentage).toBe(0);
}, 20000);

afterAll(async() => {
    await browser.close();
});