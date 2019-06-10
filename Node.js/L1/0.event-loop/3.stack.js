(function stack1() {

    function stack1Func1() {
        stack1Func2();
    }

    function stack1Func2() {
        console.trace();
    }

    stack1Func1();
})();

///////////

(function stack2() {

    function stack2Func1() {
        stack2Func2();
    }

    function stack2Func2() {
        console.trace();
    }

    setImmediate(function () {
        stack2Func1();
    });
})();

///////////

function stack3Func1() {
    stack3Func2();
}

function stack3Func2() {
    setImmediate(function () {
        console.trace();
    });
}

stack3Func1();
