// 获取非行间样式函数
function getEleStyle(ele, attr) {
    return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele)[attr];
}

// 拖拽封装
function drag(ele) {
    ele.onmousedown = function (evs) {
        var ev = event || evs;
        var lx = ev.clientX - ele.offsetLeft;
        var ty = ev.clientY - ele.offsetTop;
        // 鼠标移动
        document.onmousemove = function (evs) {
            var ev = event || evs;
            console.log(lx, ty);
            // 获取定位移动的left 和 top的值
            var l = ev.clientX - lx + 'px';
            var t = ev.clientY - ty + 'px';
            console.log(l, t);
            ele.style.left = l;
            ele.style.top = t;
            if (ev.setCapture) {
                ele.setCapture();
            }
            return false;
        }
    }
    // 鼠标抬起还原
    ele.onmouseup = function () {
        document.onmousemove = null;
        if (ele.releaseCapture) {
            ele.releaseCapture();
        }
    }
}

// 移动函数封装
// 多属性移动函数封装
// ele  移动的元素
// obj  移动属性和目标值对象  例: obj = {'left':1000,'opacity':30,'top':500}
// fn   回调函数
function move(ele, obj, fn) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var flag = true;//定时器开关
        for (var attr in obj) {
            if (attr == 'opacity') {
                var curDis = parseInt(getEleStyle(ele, attr) * 100);
            } else {
                var curDis = parseInt(getEleStyle(ele, attr));
            }
            var speed = (obj[attr] - curDis) / 10;  //速度的设置最好最终能够达到目标值
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            var nl = curDis + speed;
            if (obj[attr] != curDis) {
                flag = false;//只要有一个属性没有到达目标值，定时器开关就是关着的（不清除定时器）
            }
            if (attr == 'opacity') {
                ele.style[attr] = nl / 100;
            } else {
                ele.style[attr] = nl + 'px';
            }
        }
        if (flag) {
            clearInterval(ele.timer);//定时器开关值为true，清除定时器
            // if(fn){
            //     fn();
            // }
            // 简写方式  当fn存在的时候调用函数
            fn && fn();
        }
    }, 30)
}

// 设置本地cookie
function setCookies(key, value, exp) {
    var date = new Date();
    date.setDate(date.getDate() + exp);
    document.cookie = key + '=' + value + ';expires=' + date;
}

// 获取本地cookie
function getCookies(key) {
    var cookie = document.cookie;
    // 获取每一个键值对
    var cArr = cookie.split('; ');
    // 获取每一个键和值
    var json = {};
    for (var i = 0; i < cArr.length; i++) {
        var jArr = cArr[i].split('=');
        // 添加到json对象中
        json[jArr[0]] = jArr[1];
    }
    return json[key];
}
// ajax封装
function ajax(json) {
    var ajax = null;
    json.method = json.method ? json.method : 'get';
    json.data = json.data ? json.data : '';
    json.contentType = json.contentType ? json.contentType : 'application-x-www-form-urlencoded';
    if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest();
    } else {
        ajax = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (json.method.toUpperCase() == 'GET') {
        ajax.open(json.method, json.url + '?' + json.data);
        ajax.send();
    } else {
        ajax.open(json.method, json.url);
        ajax.setRequestHeader('Content-type', json.contentType);
        ajax.send(json.data);
    }
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            json.success(ajax.responseText);
        }
    }

}

