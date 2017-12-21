const vm = require('vm');

(async () => {
    const code = `
        (async(require, __dirname) => {
            const pixelmatch = require('pixelmatch');
            const fs = require('fs');
            const rimraf = require('rimraf');
            const { PNG } = require('./pngjs/lib/png');

            console.time('reading screenshot-a:');
            const screenshotA = fs.readFileSync(__dirname + '/stubs/screenshot-a.png');
            console.timeEnd('reading screenshot-a:');
        
            console.time('reading screenshot-b:');
            const screenshotB = fs.readFileSync(__dirname + '/stubs/screenshot-b.png');    
            console.timeEnd('reading screenshot-b:');
        
            const diff = new PNG({
            width: 1100,
            height: 2400,
            });
        
            console.time('running image comparison:');
            pixelmatch(screenshotA, screenshotB, diff.data, 1100, 2400, {
            threshold: 0.1
            });
            console.timeEnd('running image comparison:');
        
            console.time('creating diff buffer:');
            const buffer = PNG.sync.write(diff);
            console.timeEnd('creating diff buffer:');
        
            console.time('writing diff file:');
            fs.writeFileSync('image-diff.png', buffer);
            console.timeEnd('writing diff file:');
        
            rimraf.sync('image-diff.png');
        })
    `;

    vm.runInThisContext(code)(require, __dirname);
})();