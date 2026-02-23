function NewScramble(z0) {
    var MoveNames = ["R", "R2", "R'", "F", "F2", "F'", "L", "L2", "L'", "B", "B2", "B'", "U", "U2", "U'", "D", "D2", "D'"];
    var MoveNamesWCA;
    if ("White" == "Yellow") {
        MoveNamesWCA = ["R", "R2", "R'", "F", "F2", "F'", "L", "L2", "L'", "B", "B2", "B'", "U", "U2", "U'", "D", "D2", "D'"];
    } else {
        MoveNamesWCA = ["R", "R2", "R'", "B", "B2", "B'", "L", "L2", "L'", "F", "F2", "F'", "D", "D2", "D'", "U", "U2", "U'"];
    }
    var Level = document.getElementById("Level").value;
    var RandomScramble = Scrambles[Level - 1][Math.floor(Math.random() * 1000)];
    var TextScramble = "";
    var TextScrambleWithSpaces = "";

    document.getElementById("Output").innerHTML = "";

    for (var A = 0; A < RandomScramble.length; A++) {
        TextScramble += MoveNames[RandomScramble[A].charCodeAt(0) - 'A'.charCodeAt(0)];
        if (A > 0) {
            TextScrambleWithSpaces += " ";
        }
        TextScrambleWithSpaces += MoveNamesWCA[RandomScramble[A].charCodeAt(0) - 'A'.charCodeAt(0)];
    }

    if ("0" != "0") {
        var OutputString = '';
        OutputString = OutputString + '<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="5" BGCOLOR="#000000">';

        var TextScrambleArray = TextScrambleWithSpaces.split(" ");

        for (var A = 0; A < TextScrambleArray.length + 2; A++) {
            if (A % '0'.value == 0) {
                OutputString = OutputString + '<TR>';
            }

            if (A == 0) {
                OutputString = OutputString + '<TD WIDTH="124" BGCOLOR="#FFFFFF"><CENTER><IMAGE HEIGHT="124" SRC="//icon.png';
                if ("White" == "Yellow") {
                    OutputString = OutputString + 'y24x-24';
                } else {
                    OutputString = OutputString + 'y-24x-204';
                }
                OutputString = OutputString + '&alg=">';
            } else if (A == TextScrambleArray.length + 1) {
                OutputString = OutputString + '<TD WIDTH="124" BGCOLOR="#FFFFFF"><CENTER><IMAGE HEIGHT="124" SRC="//icon.png';
                if ("White" == "Yellow") {
                    OutputString = OutputString + 'y24x-24';
                } else {
                    OutputString = OutputString + 'y-24x-204';
                }
                OutputString = OutputString + '&alg=' + TextScramble + '">';
            } else {
                OutputString = OutputString + '<TD WIDTH="124" BGCOLOR="#FFFFFF"><CENTER>';
                var Move = TextScrambleArray[A - 1].substring(0, 1);
                var MoveVariant = TextScrambleArray[A - 1].substring(1, 2);
                if (MoveVariant == "'") {
                    MoveVariant = 'i';
                }
                if (MoveVariant == '2') {
                    OutputString = OutputString + '<IMAGE SRC="../Images/' + Move + '.png">';
                    OutputString = OutputString + '<IMAGE SRC="../Images/' + Move + '.png">';
                } else {
                    OutputString = OutputString + '<IMAGE SRC="../Images/' + Move + MoveVariant + '.png">';
                }
            }
        }

        Output(OutputString);
    }

    Output(TextScrambleWithSpaces + "<BR>");
}

var Output = function(z0) {
    document.getElementById("Output").innerHTML = document.getElementById("Output").innerHTML + z0;
}
window.addEventListener("keypress", function onEvent(event) {

    if (event.key === " ") {
        NewScramble();
    }

});

function loadCountData() {
    var today = new Date().toLocaleDateString();
    var defaultData = {
        today: today,
        todaySuccess: 0,
        todayFail: 0,
        totalSuccess: 0,
        totalFail: 0
    };

    var storedData = localStorage.getItem('cfopCount');
    var data = storedData ? JSON.parse(storedData) : defaultData;

    if (data.today !== today) {
        data.today = today;
        data.todaySuccess = 0;
        data.todayFail = 0;
    }

    var elTodaySuccess = document.getElementById('todaySuccess');
    var elTodayFail = document.getElementById('todayFail');
    var elTotalSuccess = document.getElementById('totalSuccess');
    var elTotalFail = document.getElementById('totalFail');

    if (elTodaySuccess) elTodaySuccess.innerText = data.todaySuccess;
    if (elTodayFail) elTodayFail.innerText = data.todayFail;
    if (elTotalSuccess) elTotalSuccess.innerText = data.totalSuccess;
    if (elTotalFail) elTotalFail.innerText = data.totalFail;

    function calcRate(success, fail) {
        var total = success + fail;
        if (total === 0) return "0%";
        return Math.round((success / total) * 100) + "%";
    }

    var elTodayRate = document.getElementById('todayRate');
    var elTotalRate = document.getElementById('totalRate');

    if (elTodayRate) elTodayRate.innerText = calcRate(data.todaySuccess, data.todayFail);
    if (elTotalRate) elTotalRate.innerText = calcRate(data.totalSuccess, data.totalFail);

    localStorage.setItem('cfopCount', JSON.stringify(data));
}

function recordSuccess() {
    try {
        NewScramble();
    } catch (e) {
        console.log('打乱函数执行异常，但不影响计数:', e);
    }

    var today = new Date().toLocaleDateString();
    var data = JSON.parse(localStorage.getItem('cfopCount') || JSON.stringify({
        today: today,
        todaySuccess: 0,
        todayFail: 0,
        totalSuccess: 0,
        totalFail: 0
    }));

    if (data.today !== today) {
        data.today = today;
        data.todaySuccess = 0;
        data.todayFail = 0;
    }

    data.todaySuccess++;
    data.totalSuccess++;

    localStorage.setItem('cfopCount', JSON.stringify(data));
    loadCountData(); 
}

function recordFail() {
    try {
        NewScramble();
    } catch (e) {
        console.log('打乱函数执行异常，但不影响计数:', e);
    }

    var today = new Date().toLocaleDateString();
    var data = JSON.parse(localStorage.getItem('cfopCount') || JSON.stringify({
        today: today,
        todaySuccess: 0,
        todayFail: 0,
        totalSuccess: 0,
        totalFail: 0
    }));

    if (data.today !== today) {
        data.today = today;
        data.todaySuccess = 0;
        data.todayFail = 0;
    }

    data.todayFail++;
    data.totalFail++;

    localStorage.setItem('cfopCount', JSON.stringify(data));
    loadCountData(); 
}

function calcRate(success, fail) {
    const total = success + fail;
    if (total === 0) return "0%";
    return Math.round((success / total) * 100) + "%";
}

window.addEventListener('load', loadCountData);