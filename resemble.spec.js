const puppeteer = require('puppeteer');
const compareImages = require('resemblejs/compareImages');

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

    await page.goto('https://www.google.com');
    const screenshot1 = await page.screenshot();

    await page.goto('https://www.yahoo.com');
    const screenshot2 = await page.screenshot();

    const data = await compareImages(screenshot1, screenshot2);
    //fs.writeFileSync(`screenshots/${this.suite}/careers-edit-compare.png`, data.getBuffer());
});

afterAll(async() => {
    await browser.close();
});