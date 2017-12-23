# jest-image-comparison-perf-repro

After drilling down further we realized that a simple Math call is slow by several orders of magnitude:
- Run `npm install` to install local dependencies
- Run `node testing-math/math.js`
- Run `jasmine testing-math/math.jasmine.js`
- Now run `jest testing-math` to see the slowdown


Reproducing a performance degradation when doing image comparison in Jest:
- Run `npm install` to install local dependencies
- Run `node pixelmatch.js` and take note of the performance metrics that are logged to the console
- Run `npm test` and take note of the performance metrics that are logged to the console