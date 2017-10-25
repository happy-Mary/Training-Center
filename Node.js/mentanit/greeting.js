let currDate = new Date();
module.exports.date = currDate;

module.exports.greet = function(name) {
    let hour = currDate.getHours();

    if (hour > 16) {
        return `Good evening ${name}`
    } else if (hour > 10) {
        return `Good afternoon ${name}`
    } else {
        return `Good morning ${name}`
    }
}