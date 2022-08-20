function dateDiffInYears(dateold, datenew) {
    var ynew = datenew.getFullYear();
    var yold = dateold.getFullYear();
    var diff = ynew - yold;
    return diff;
}

function getAge() {
    let now = new Date();
    let birthday = new Date("1986-10-11");
    let age = dateDiffInYears(birthday, now);
    return age;
}

function getTimeInArmy() {
    let now = new Date();
    let start = new Date("2003-09-01");
    let time = dateDiffInYears(start, now);
    return time;
}

function putAge(age) {
    document.querySelectorAll(".age").forEach((element) => {
        element.innerText = age;
    })
}

function putTime(time) {
    document.querySelector("#time").innerText = time
}

putAge(getAge());
putTime(getTimeInArmy());
