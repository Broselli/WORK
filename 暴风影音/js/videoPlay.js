window.onload = function () {
    //生成猜你喜欢电影图片列表
    var gusee = document.getElementsByClassName('guess')[0];

    ajax({
        method: 'get',
        url: '../data/videoData.json',
        headerType: 'application/x-www-form-urlencoded',
        mode: true,
        success: function (a) {
            arr = eval(a);
            console.log(arr);
            for (let i = 0; i < 8; i++) {
                var li = document.createElement('li');
                li.innerHTML = "<a href=" + 'javascript:' + ">" +
                    '<img src=' + arr[i].imgSrc + '>' + '</a><div class=' + "movieInfo" + '><h4><a href=' + "javascript:" + '>' + arr[i].name + '</a></h4><p>' + arr[i].intro + '</p><div class=' + "score" + '>' + arr[i].score + '</div></div><a class="enshrine"></a>';
                gusee.appendChild(li);

            }

        }
    })


    //js改变样式
    var discussItem = document.getElementsByClassName('discussItem');

    for (var i = 0; i < discussItem.length; i++) {
        discussItem[i].index = i;
        discussItem[i].onclick = function () {

            for (var j = 0; j < discussItem.length; j++) {
                discussItem[j].className = 'discussItem';
            }
            this.className = 'discussDefault discussItem';
        }

    }

    //广告列表生成
    var adverUl = document.getElementsByClassName('adverUl')[0];
    var adver = document.getElementsByClassName('adver')[0];
    var closeAdv = document.getElementsByClassName('closeAdv')[0];
    var lastAdvUl = document.getElementsByClassName('lastAdvUl')[0];
    var adver1 = document.getElementsByClassName('adver')[1];
    var closeAdv1 = document.getElementsByClassName('closeAdv')[1];

    ajax({
        method: 'get',
        url: '../data/adverData.json',
        headerType: 'application/x-www-form-urlencoded',
        mode: true,
        success: function (a) {
            arr3 = eval(a);
            console.log(arr3);
            for (let i = 0; i < arr3.length; i++) {
                var li = document.createElement('li');
                li.className = 'adverLi';
                li.innerHTML = '<div class="adverPic"><img src="' + arr3[i].advPicSrc + '"></div><p class="adverCon">' + arr3[i].advContent + '</p>';
                adverUl.appendChild(li);
            }

        }
    })
    /* 最后的广告 */
    ajax({
        method: 'get',
        url: '../data/lastAdvData.json',
        headerType: 'application/x-www-form-urlencoded',
        mode: true,
        success: function (a) {
            arr6 = eval(a);
            for (var i = 0; i < arr6.length; i++) {
                var li = document.createElement('li');
                li.className = 'lastAdvLi fl';
                li.innerHTML = ' <a href="javascript:" class="advContent">' + arr6[i].addContent + '</a>';
                lastAdvUl.appendChild(li);
            }

        }
    })



    //关闭广告
    closeAdv.onclick = function () {
        closeAdv.className = 'close';
        adver.className = 'close';
        adverUl.className = 'close';
    }
    closeAdv1.onclick = function () {
        closeAdv1.className = 'close';
        adver1.className = 'close';
        lastAdvUl.className = 'close';
    }


    //生成评论列表
    var discussListBox = document.getElementsByClassName('discussListBox')[0];
    var discussUl = discussListBox.getElementsByTagName('ul')[0];
    //评论页数
    var toPage = document.getElementsByClassName('toPage')[0];
    var allPage = document.getElementsByClassName('allPage')[0];
    var prevPage = document.getElementsByClassName('prevPage')[0];
    var nextPage = document.getElementsByClassName('nextPage')[0];
    var doJump = document.getElementsByClassName('doJump')[0];

    var count1 = 1;
    ajax({
        method: 'get',
        url: '../data/discussData.json',
        headerType: 'application/x-www-form-urlencoded',
        mode: true,
        success: function (a) {
            arr1 = eval(a);
            console.log(arr1);
            for (let i = 0; i < 6; i++) {
                var li = document.createElement('li');
                li.className = "listItem clearfix";
                li.innerHTML = '<a class="userPic fl"><img src="' + arr1[i].userPicSrc + '"></a><div class="userInfo fl"><p class="userName">' + arr1[i].userName + '</p><p class="sendTime">' + arr1[i].sendTime + '</p></div><p class="discussContent fl"> ' + arr1[i].discussContent + ' </p><div class="likeNum"><a href="javascript:" class="inform">举报</a><a href="javascript:" class="tap"></a><span class="tapNum">' + arr1[i].supportNum + '</span></div>';
                discussUl.appendChild(li);

            }
            var final = Math.ceil(arr1.length / 6);//总页数
            allPage.innerHTML = final;


            //点击左右按钮时样式的切换
            nextPage.onclick = function () {
                count1++;
                if (count1 >= final) {
                    //点击下一页按钮，当当前是最后一页的时候，让下一页按钮变灰色
                    count1 = final;
                    nextPage.className = 'nextPage nomore';
                } else {
                    //不是最后一页的时候，下一页按钮不变灰色
                    nextPage.className = 'nextPage';
                }
                if (count1 != 1) {
                    //当当前不是在第一页的时候，让上一页按钮的样式不变灰色
                    prevPage.className = 'prevPage';
                }
                toPage.value = count1;//显示当前是第几页
            }
            prevPage.onclick = function () {
                count1--;
                if (count1 <= 1) {
                    //点击上一页按钮，当当前是第一页的时候，让上一页按钮变灰色
                    count1 = 1;
                    prevPage.className = 'prevPage nomore';
                } else {
                    //当当前不是在第一页的时候，让上一页按钮不变灰色
                    prevPage.className = 'prevPage';
                }
                if (count1 != final) {
                    //当当前不是在最后一页的时候，让下一页按钮不变灰色
                    nextPage.className = 'nextPage';
                }
                toPage.value = count1;
            }
            //手动改变跳转页面的输入框数值时，样式的切换
            toPage.onfocus = function () {
                toPage.onchange = function () {
                    doJump.onclick = function () {
                        count1 = toPage.value;
                        if (count1 == 1) {
                            prevPage.className = 'prevPage nomore';
                        } else {
                            prevPage.className = 'prevPage';
                        }
                        if (count1 == final) {
                            nextPage.className = 'nextPage nomore';
                        } else {
                            nextPage.className = 'nextPage';
                        }

                    }
                }
            }

        }
    })

    //热门推荐列表
    var promoteBox = document.getElementsByClassName('promoteBox')[0];
    var proUl = promoteBox.getElementsByTagName('ul')[0];
    ajax({
        method: 'get',
        url: '../data/hotData.json',
        headerType: 'application/x-www-form-urlencoded',
        mode: true,
        success: function (a) {
            arr4 = eval(a);
            for (let i = 0; i < arr4.length; i++) {
                var li = document.createElement('li');
                li.className = 'promoteItem fl';
                li.innerHTML = '<a href="javascript:" class="itemPic"><img src="' + arr4[i].imgSrc + '" alt=""><span class="promoteName">' + arr4[i].hotContent + '</span></a>';
                proUl.appendChild(li);

            }

        }
    })

    //电影榜列表
    var movieTopBox = document.getElementsByClassName('movieTopBox')[0];
    var topUl = movieTopBox.getElementsByTagName('ul')[0];
    console.log(topUl)
    ajax({
        method: 'get',
        url: '../data/topData.json',
        headerType: 'application/x-www-form-urlencoded',
        mode: true,
        success: function (a) {
            arr5 = eval(a);
            for (let i = 0; i < arr5.length; i++) {
                var li = document.createElement('li');
                li.className = 'movieTopItem';
                li.innerHTML = '<div class="boxAfter"><a href="javascript:" class="itemPic"><img src="' + arr5[i].imgSrc + '"><span class="shadow"></span><span class="blueCircle">' + arr5[i].blueCircle + '</span><span class="movieTopName">' + arr5[i].movieTopName + '</span></a></div><div class="boxBefore"><span class="befNum">' + arr5[i].blueCircle + '</span><span class="befText">' + arr5[i].movieTopName + '</span><span class="befScore fr">' + arr5[i].befScore + '</span></div>';
                topUl.appendChild(li);
            }
            var topLi = topUl.getElementsByTagName('li');
            var boxAfter = document.getElementsByClassName('boxAfter');
            var boxBefore = document.getElementsByClassName('boxBefore');
            boxAfter[0].style.display = 'block';
            boxBefore[0].style.display = 'none';
            for (var a = 0; a < topLi.length; a++) {
                (function (a) {
                    topLi[a].onmouseover = function () {
                        for (var j = 0; j < arr5.length; j++) {
                            boxAfter[j].style.display = 'none';
                            boxBefore[j].style.display = 'block';
                        }
                        boxAfter[a].style.display = 'block';
                        boxBefore[a].style.display = 'none';
                    }
                })(a)
            }

        }
    })


    // 选集商品选项卡 
    var seleTab = document.getElementsByClassName('seleTab')[0];
    console.log(seleTab);
    var xuanjiTab = seleTab.getElementsByTagName('li')[0];
    console.log(xuanjiTab);
    var goodsTab = seleTab.getElementsByTagName('li')[1];
    console.log(goodsTab);
    // 电影选集滑动条
    var moviesBox = document.getElementsByClassName('moviesBox')[0];
    var mvBox_l = moviesBox.getElementsByClassName('mvBox_l')[0];
    var sliderWrap = moviesBox.getElementsByClassName('sliderWrap')[0];
    var sliderBox = sliderWrap.getElementsByClassName('sliderBox')[0];

    
    var goodReco = moviesBox.getElementsByClassName('goodReco')[0];
    var videoPlayData = [];
    ajax({
        url: '../data/videoPlayData.json',
        success: function (reg) {
            videoPlayData = eval(reg);
            for (var s = 0; s < videoPlayData.length; s++) {
                var vPlayLi = document.createElement('li');
                vPlayLi.innerHTML = '<a href="javascript:"><span>' + videoPlayData[s].name + '</span><i class="playIcon fr"></i></a>';
                goodReco.appendChild(vPlayLi);
            }
            var goodRecoLi = goodReco.getElementsByTagName('li');
            var oiframe = document.getElementsByTagName('iframe')[0];

            for (var n = 0; n < goodRecoLi.length; n++) {
                (function (n) {
                    goodRecoLi[n].onclick = function () {
                        console.log(n);
                        oiframe.src = videoPlayData[n].src;
                    }
                })(n)
            }
        }
    })

    // 点击选集选项卡
    xuanjiTab.onclick = function () {
        xuanjiTab.className = 'default';
        goodsTab.className = 'noColor';
        moviesBox.style.display = 'block';
    }
    // 点击商品选项卡
    goodsTab.onclick = function () {
        goodsTab.className = 'default';
        xuanjiTab.className = 'noColor'
        moviesBox.style.display = 'none';
    }

    // 滑动条事件 
    sliderBox.onmousedown = function (evs) {
        var ev = window.event || evs;
        var top = ev.clientY - sliderBox.offsetTop;
        if (sliderBox.setCapture) {
            sliderBox.setCapture();
        }
        document.onmousemove = function (evs) {
            var event = window.event || evs;
            var t = event.clientY - top;
            if (t <= 0) {
                t = 0;
            }
            var max = sliderWrap.clientHeight - sliderBox.offsetHeight;
            if (t >= max) {
                t = max;
            }
            sliderBox.style.top = t + 'px';
            var leftTop = (mvBox_l.clientHeight - moviesBox.clientHeight) * t / max;
            // console.log(leftTop);
            mvBox_l.style.top = -leftTop + 'px';
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            if (sliderBox.releaseCapture) {
                sliderBox.releaseCapture();
            }
        }
        return false;
    }


    //视频播放生成

















}