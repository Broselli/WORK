window.onload = function () {
    
    var prevIcon = document.getElementsByClassName('prevIcon')[0];
    var nextIcon = document.getElementsByClassName('nextIcon')[0];
    //导航栏蓝色背景样式切换
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


    //生成强烈推荐电影列表
    var movieList = document.getElementsByClassName('movieList')[0];
    var movieList1 = document.getElementsByClassName('movieList')[1];
    var arr = [];//承接json数据

    ajax({
        method: 'get',
        url: '../data/videoData.json',
        headerType: 'application/x-www-form-urlencoded',
        mode: true,
        success: function (a) {
            arr = eval(a);
            console.log(arr);
            for (let i = 0; i < 5; i++) {
                var li = document.createElement('li');
                li.innerHTML = "<a href=" + 'javascript:' + ">" +
                    '<img src=' + arr[i].imgSrc + '>' + "<div class=" + 'vipTop' + "></div>" + '<div class=' + "textBox" + '>标清</div></a><div class=' + "movieInfo" + '><h4><a href=' + "javascript:" + '>' + arr[i].name + '</a></h4><p>' + arr[i].intro + '</p><div class=' + "score" + '>' + arr[i].score + '</div></div>';
                movieList.appendChild(li);

            }

        }
    })
    //生成热映大片电影列表
    ajax({
        method: 'get',
        url: '../data/videoData.json',
        headerType: 'application/x-www-form-urlencoded',
        mode: true,
        success: function (a) {
            arr = eval(a);
            // console.log(arr);
            for (let i = 5; i < 10; i++) {
                var li = document.createElement('li');
                li.innerHTML = "<a href=" + 'javascript:' + ">" +
                    '<img src=' + arr[i].imgSrc + '>' + "<div class=" + 'vipTop' + "></div>" + '<div class=' + "textBox" + '>标清</div></a><div class=' + "movieInfo" + '><h4><a href=' + "javascript:" + '>' + arr[i].name + '</a></h4><p>' + arr[i].intro + '</p><div class=' + "score" + '>' + arr[i].score + '</div></div>';
                movieList1.appendChild(li);

            }

        }
    })

    //轮播图小图片生成
    var littleAlternate = document.getElementsByClassName('littleAlternate')[0];
    var oLittleUl = littleAlternate.getElementsByTagName('ul')[0];
    var arr1 = [];
    ajax({
        method: 'get',
        url: '../data/indexSmallPicData.json',
        headerType: 'application/x-www-form-urlencoded',
        mode: true,
        success: function (a) {
            arr1 = eval(a);
            console.log(arr1);
            for (let i = 0; i < arr1.length; i++) {
                var li = document.createElement('li');
                li.innerHTML = '<div class="picUp"></div>' + '<a href=' + "javascript:" + '><img src="' + arr1[i].picSrc + '" class="frame"></a>';
                oLittleUl.appendChild(li);
            }

        }
    })


    var arr2 = [];
    var count = 0;
    var oImg = document.getElementsByClassName('changeP')[0];
    var picUp = document.getElementsByClassName('picUp');
    var oLittleImg = document.getElementsByClassName('frame');

    //轮播图大图的获取，以及所有轮播的设置
    ajax({
        method: 'get',
        url: '../data/indexBigPicData.json',
        headerType: 'application/x-www-form-urlencoded',
        mode: true,
        success: function (a) {
            arr2 = eval(a);

            var clock = setInterval(function () {
                autoPlay();
            }, 3000);
            function autoPlay() {
                count++;
                //大图轮播
                if (count == arr2.length) {
                    count = 0;
                }
                oImg.src = arr2[count].picSrc;
                //清除小图边框和图片覆盖层阴影的样式
                for (var j = 0; j < picUp.length; j++) {
                    picUp[j].className = "picUp";
                    oLittleImg[j].className = 'frame';
                }
                //大图切换时，切换小图边框和图片覆盖层阴影的样式
                if (count == arr2.length) {
                    picUp[0].className = 'picUp hide';
                    oLittleImg[0].className = 'frame bord';
                } else {
                    picUp[count].className = 'picUp hide';
                    oLittleImg[count].className = 'frame bord';
                }
            }
            //鼠标移入时定时器停止，移开时重启
            oImg.onmouseover = function () {
                clearInterval(clock);
            }
            oLittleUl.onmouseover = function () {
                clearInterval(clock);
            }
            prevIcon.onmouseover = function () {
                clearInterval(clock);
            }
            nextIcon.onmouseover = function () {
                clearInterval(clock);
            }
            oImg.onmouseout = function () {
                clock = setInterval(function () {
                    autoPlay();
                }, 500);
            }
            oLittleUl.onmouseout = function () {
                clock = setInterval(function () {
                    autoPlay();
                }, 500);
            }
            prevIcon.onmouseout = function () {
                clock = setInterval(function () {
                    autoPlay();
                }, 500);
            }
            nextIcon.onmouseout = function () {
                clock = setInterval(function () {
                    autoPlay();
                }, 500);
            }

            //鼠标划入小图时切换图片
            for (var i = 0; i < arr2.length; i++) {
                (function (i) {
                    picUp[i].onmouseover = function () {
                        //鼠标划入某个阴影覆盖层时
                        oImg.src = arr2[i].picSrc;//大图切换
                        for (let j = 0; j < arr2.length; j++) {
                            //清除所有小图边框和图片覆盖层阴影的样式
                            picUp[j].className = "picUp";
                            oLittleImg[j].className = 'frame';
                        }
                        //显示当前小图边框和图片覆盖层阴影的样式
                        picUp[i].className = 'picUp hide';
                        oLittleImg[i].className = 'frame bord';
                        count = i;//从当前开始再重新
                    }
                })(i)

            }
            //点击左右按钮时切换图片
            for (var i = 0; i < arr2.length; i++) {
                (function (i) {
                    //向前
                    prevIcon.onclick = function () {
                        count--;

                        if (count < 0) {
                            count = arr2.length - 1;
                        }
                        oImg.src = arr2[count].picSrc;
                        for (let j = 0; j < arr2.length; j++) {
                            //清除所有小图边框和图片覆盖层阴影的样式
                            picUp[j].className = "picUp";
                            oLittleImg[j].className = 'frame';
                        }
                        //显示当前小图边框和图片覆盖层阴影的样式
                        picUp[count].className = 'picUp hide';
                        oLittleImg[count].className = 'frame bord';
                    }
                    //向后
                    nextIcon.onclick = function () {
                        count++;
                        if (count == arr2.length) {
                            count = 0;
                        }
                        oImg.src = arr2[count].picSrc;
                        for (let j = 0; j < arr2.length; j++) {
                            //清除所有小图边框和图片覆盖层阴影的样式
                            picUp[j].className = "picUp";
                            oLittleImg[j].className = 'frame';
                        }
                        //显示当前小图边框和图片覆盖层阴影的样式
                        picUp[count].className = 'picUp hide';
                        oLittleImg[count].className = 'frame bord';
                    }
                })(i)

            }

        }
    })


    var pre = document.getElementsByClassName('pre')[0];
    var next = document.getElementsByClassName('next')[0];
    var vipUl= document.getElementsByClassName('vipUl')[0];
     console.log(pre)
   /* vip */
    pre.onclick = function(){
        move(vipUl,{'left':0});
    }
    next.onclick = function(){
        move(vipUl,{'left':-1075});
    }


}