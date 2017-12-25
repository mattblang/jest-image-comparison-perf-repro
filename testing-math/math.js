(() => {
    var sum = 0;

    console.time('math');
    for (var i = 0; i < 10000000; i++) {
        sum += Math.abs(0);
    }
    console.timeEnd('math');
    console.log(`ran ${i} times`)
})();