(async() => {
    var sum = 0;

    console.time('math');
    for (var i = 0; i < 100000; i++) {
        for (var j = 0; j < 100; j++) {
            sum += Math.abs(100);
        }
    }
    console.timeEnd('math');
    console.log(`ran ${sum} times`)
})();