function getNum(num) {
    var arr = [];
    while(num > 10) {
        var i = 0;
        var numCheck = num;
        while(numCheck >= 10) {
            numCheck = parseInt(numCheck/10);
            i++;
        }
        var decNum = Math.pow(10, i)*numCheck;
        num = num - decNum;
        arr.push(decNum);
    }
    arr.push(num);
    return arr.join(' + ');
}

// const expandedForm = n => n.toString()
//                             .split("")
//                             .reverse()
//                             .map( (a, i) => a * Math.pow(10, i))
//                             .filter(a => a > 0)
//                             .reverse()
//                             .join(" + ");

getNum(70304);