const puppeteer = require('puppeteer');
var fs = require('fs'),
    PNG = require('pngjs').PNG,
    pixelmatch = require('pixelmatch');

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
    await page.goto('https://www.google.com');
    const screenshot1 = await page.screenshot();
    console.timeEnd("screenshot1");

    console.time("screenshot2")
    await page.goto('https://www.google.com/about');
    const screenshot2 = await page.screenshot();
    console.timeEnd("screenshot2");

    console.time("compare")
    const data = await compareImages(screenshot1, screenshot2);
    console.timeEnd("compare");

    if (data.misMatchPercentage > 0) {
        console.log("Does not match");
    }

    await browser.close();
})();