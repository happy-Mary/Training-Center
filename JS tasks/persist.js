// function persistence(num) {
//     var i = 0;
//     function countTimes(num) {
//         var arrayNum = Array.from(num.toString()).map(Number);
//         if (arrayNum.length > 1) {
//             let num = arrayNum.reduce(function(a,b){return a*b;});
//             i+=1;
//             return countTimes(num);
//         } else {
//             return i;
//         }
//     } 
//    return countTimes(num);  
// }

function persistence(num) {
    var times = 0;
    num = num.toString();
    while (num.length > 1) {
      times++;
      num = num.split('').map(Number).reduce((a, b) => a * b).toString();
    }
   return times;
 }

 console.log(persistence(39));
 console.log(persistence(4));
 console.log(persistence(25));
 console.log(persistence(999));