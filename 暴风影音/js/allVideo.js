window.onload = function () {

    var movieList = document.getElementsByClassName('movieList')[0];

    var arr = [];//承接json数据

    //生成图片列表
    ajax({
        method: 'get',
        url: '../data/videoData.json',
        headerType: 'application/x-www-form-urlencoded',
        mode: true,
        success: function (a) {
            arr = eval(a);
            console.log(arr);
            for (let i = 0; i < arr.length; i++) {
                var li = document.createElement('li');
                li.innerHTML = "<a href=" + 'javascript:' + ">" +
                    '<img src=' + arr[i].imgSrc + '>' + "<div class=" + 'vipTop' + "></div>" + '<div class=' + "textBox" + '>标清</div></a><div class=' + "movieInfo" + '><h4><a href=' + "javascript:" + '>' + arr[i].name + '</a></h4><p>' + arr[i].intro + '</p><div class=' + "score" + '>' + arr[i].score + '</div></div>';
                movieList.appendChild(li);

            }

        }
    })


    function ajax(json) {
        var ajax = null;
        json.method = json.method ? json.method : 'get';
        json.data = json.data ? json.data : '';
        json.headerType = json.headerType ? json.headerType : 'application/x-www-form-urlencoded';
        json.mode = json.mode ? json.mode : true;
        //创建异步对象
        if (window.XMLHttpRequest) {
            ajax = new XMLHttpRequest();
        } else {
            ajax = new ActiveXObject('Microsoft.XMLHTTP');
        }

        if (json.method == 'get') {
            ajax.open('get', json.url + "?" + json.data, json.mode);
            ajax.send();
        } else {
            ajax.open('post', json.url, json.mode);
            ajax.setRequestHeader('Content-type', json.headerType + 'charset = utf-8');
            ajax.send(json.data);
        }
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    json.success(ajax.response);//回调函数
                }
            }
        }

    }
    //js改变样式
    var vipBlock = document.getElementsByClassName('vipBlock')[0];
    var liList = vipBlock.getElementsByTagName('li');
    for (var i = 0; i < liList.length; i++) {
        liList[i].index = i;
        liList[i].onclick = function () {
            console.log('..')
            for (var j = 0; j < liList.length; j++) {
                liList[j].className = 'change0';
            }
            this.className = 'change1';
        }

    }


    var new_pop = document.getElementsByClassName('new-pop')[0];
    var newLiList = new_pop.getElementsByTagName('li');
    for (var i = 0; i < newLiList.length; i++) {
        newLiList[i].index = i;
        newLiList[i].onclick = function () {
            console.log('...')
            for (var j = 0; j < newLiList.length; j++) {
                newLiList[j].className = '';
            }
            this.className = 'change2';
        }

    }


    var bar = document.getElementsByClassName('bar')[0];
    var barLiList = bar.getElementsByTagName('li');
    for (var i = 0; i < barLiList.length; i++) {
        barLiList[i].index = i;
        barLiList[i].onclick = function () {
            console.log('...')
            for (var j = 0; j < barLiList.length; j++) {
                barLiList[j].className = '';
            }
            this.className = 'change4';
        }

    }


}


