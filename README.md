# jest-image-comparison-perf-repro
Reproducing a performance degradation when doing image comparison in Jest

- Run `npm install` to install local dependencies
- Run `npm install -g jest` to install Jest globally for use on the command line
- Run `node nojest-pixelmatch.js` to see a screenshot comparison in Node that writes the diff to a file and takes about four seconds.
- Run `jest pixelmatch.spec.js` to see the same screenshot comparison in Jest without writing the diff to a file that takes about six seconds.
- Uncomment the block in `pixelmatch.spec.js#45` to make it write the diff to a file.
- Run `jest pixelmatch.spec.js` again and see that it takes twenty-five seconds.
