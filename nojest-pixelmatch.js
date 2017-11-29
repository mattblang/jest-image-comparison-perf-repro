const puppeteer = require('puppeteer');
const pixelmatch = require('pixelmatch');
const PNG = require('pngjs').PNG;
const fs = require('fs');

(async() => {
    let browser = await puppeteer.launch({
        headless: true // false to launch real browser
    });
    const page = await browser.newPage();

    await page.setViewport({
        width: 1100,
        height: 2400
    })

    console.time("screenshot1");
    await page.goto('https://www.google.com/about/');
    const screenshot1 = await page.screenshot();
    console.timeEnd("screenshot1");

    console.time("screenshot2")
    await page.goto('https://www.google.com/about/');
    const screenshot2 = await page.screenshot();
    console.timeEnd("screenshot2");

    const diff = new PNG({
        width: 1100,
        height: 2400
    });

    console.time("compare")
    const numDiffPixels = pixelmatch(screenshot1, screenshot2, diff.data, 1100, 2400, {
        threshold: 0.1
    });
    console.timeEnd("compare");

    diff.pack().pipe(fs.createWriteStream('__pixelmatch__/diff.png'));

    if (numDiffPixels > 0) {
        console.log(`Does not match by ${numDiffPixels} pixels`);
    }

    await browser.close();
})();