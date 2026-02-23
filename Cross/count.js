// 读取并显示计数（初始值设为0，如需1可修改defaultData里的数值）
function loadCountData() {
    var today = new Date().toLocaleDateString();
    var defaultData = {
        today: today,
        todaySuccess: 0,  // 如需初始值1，改成1
        todayFail: 0,     // 如需初始值1，改成1
        totalSuccess: 0,  // 如需初始值1，改成1
        totalFail: 0      // 如需初始值1，改成1
    };

    // 获取本地存储数据，无数据则用默认值
    var storedData = localStorage.getItem('cfopCount');
    var data = storedData ? JSON.parse(storedData) : defaultData;

    // 跨天重置今日计数
    if (data.today !== today) {
        data.today = today;
        data.todaySuccess = 0;  // 跨天重置后初始值，如需1改成1
        data.todayFail = 0;     // 跨天重置后初始值，如需1改成1
    }

    // 更新页面显示（增加容错，避免元素不存在报错）
    var elTodaySuccess = document.getElementById('todaySuccess');
    var elTodayFail = document.getElementById('todayFail');
    var elTotalSuccess = document.getElementById('totalSuccess');
    var elTotalFail = document.getElementById('totalFail');

    if (elTodaySuccess) elTodaySuccess.innerText = data.todaySuccess;
    if (elTodayFail) elTodayFail.innerText = data.todayFail;
    if (elTotalSuccess) elTotalSuccess.innerText = data.totalSuccess;
    if (elTotalFail) elTotalFail.innerText = data.totalFail;

    // 保存数据到本地存储
    localStorage.setItem('cfopCount', JSON.stringify(data));
}

// 成功 +1
function recordSuccess() {
    try {
        // 先执行打乱（加try避免打乱函数报错阻断计数）
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
    loadCountData(); // 更新显示
}

// 失败 +1
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
    loadCountData(); // 更新显示
}

// 页面加载时初始化计数显示
window.addEventListener('load', loadCountData);