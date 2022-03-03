window.onload = function () {
    var user = document.getElementsByClassName('user')[0];
    var correct = document.getElementsByClassName('correct')[0];
    //手机号验证
    //以1开头，第二位是3，5，6，7，8任意一个
    //一共11位
    var regPhone = /^(13|15|16|17|18)\d{9}$/;/*  ^[1][3,5,6,7,8]\d{9}$  */
    var flag0 = true;
    user.onblur = function () {
        // console.log(regPhone.test(user.value));
        if (!regPhone.test(user.value)) {
            flag0 = false;
            correct.innerHTML = '手机号格式不正确';
        } else {
            flag0 = true;
            correct.innerHTML = '';
        }
        return flag0;
    }

    //密码等级判定
    var paw = document.getElementsByClassName('paw')[0];
    var rank = document.getElementById('rank');
    var flag = true;
    paw.onfocus = function (){
        if (flag0) {
            correct.innerHTML = '请输入6-32位英文、数字和符号的组合密码';
        }else{
            correct.innerHTML = '手机号格式不正确';
        }
        var regPassword = /^.{6,32}$/;
        var reg1 = /[a-zA-Z]/;
        var reg2 = /[0-9]/;
        var reg3 = /[~!@#$%^&*(){};,.?/'"]/;
       
        // var reg11 = /[a-zA-Z]{6,32}/;
        // var reg22 = /[0-9]{6,32}/;
        // var reg33 = /[~!@#$%^&*(){};,.?/'"]{6,32}/;
        // var mo = reg11.test(paw.value) || reg22.test(paw.value) || reg33.test(paw.value);
        paw.onkeyup = function () {
            rank.style. backgroundPosition = '-40PX -70PX';
            if (regPassword.test(paw.value)) {
                if (reg1.test(paw.value) && reg2.test(paw.value)) {
                    flag = true;
                    if (reg3.test(paw.value)) {
                        // console.log(3);
                        rank.style. backgroundPosition = '-130PX -70PX';
                    }else{
                        // console.log(2);
                        rank.style. backgroundPosition = '-100PX -70PX';
                    }    
                } else if (reg1.test(paw.value) && reg3.test(paw.value)) {
                    flag = true;
                    if (reg2.test(paw.value)) {
                        // console.log(3);
                        rank.style. backgroundPosition = '-130PX -70PX';
                    }else{
                        // console.log(2);
                        rank.style. backgroundPosition = '-100PX -70PX';
                    }   

                } else if (reg2.test(paw.value) && reg3.test(paw.value)) {
                    flag = true;
                    if (reg1.test(paw.value)) {
                        // console.log(3);
                        rank.style. backgroundPosition = '-130PX -70PX';
                    }else{
                        // console.log(2);
                        rank.style. backgroundPosition = '-100PX -70PX';
                    }  
                } else {
                    //弱
                    rank.style. backgroundPosition = '-70PX -70PX';
                    flag = false;
                }
              
            }

        }
        return flag;
    }
    paw.onblur = function(){
      if (!flag) {
        correct.innerHTML = '密码过于简单，请试试英文、数字和符号的组合';
      }else{
        correct.innerHTML = '';
      }
    }





    //生成随机数字和字母组合的四位验证码
    var verificationCodeArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var verificationCodeColorArr = ['red', 'blue', 'cyan', 'green', 'brown', 'orange', 'purple', 'pink']
    // console.log(verificationCodeArr.length);
    var yanZhengMa1 = document.getElementsByClassName('yanZhengMa1')[0];
    var span1 = document.getElementsByClassName('span1')[0];
    span1.onclick = function () {
        var codeItem = '';
        for (var c = 0; c < 4; c++) {
            codeItem += verificationCodeArr[parseInt(Math.random() * 62)];
        }
        console.log(codeItem);
        yanZhengMa1.value = codeItem;

        yanZhengMa1.style.color = verificationCodeColorArr[parseInt(Math.random() * 7)];
    }

    //生成随机短信验证码
    var duanXin = document.getElementsByClassName('duanXin')[0];
    var huoQu = document.getElementsByClassName('huoQu')[0];
    huoQu.onclick = function () {
        var messageCodeItem = '';
        for (var m = 0; m < 6; m++) {
            messageCodeItem += verificationCodeArr[parseInt(Math.random() * 10)];
        }
        duanXin.value = messageCodeItem;
    }

    //复选框按钮点击切换样式
    var checkIcon = document.getElementsByClassName('checkIcon')[0];
    var mode = true;
    checkIcon.onclick = function () {
        //    mode = false;
        if (mode) {
            checkIcon.style.background = "url('../images/154.png') no-repeat -20px -66px";
            mode = false;
        } else {
            checkIcon.style.background = "url('../images/154.png') no-repeat 0px -66px";
            mode = true;
        }
    }

    
    //重置手机号和密码输入框
    var user = document.getElementsByClassName('user')[0];
    var userReset = document.getElementsByClassName('userReset')[0];
    // var paw = document.getElementsByClassName('paw')[0];
    // var passReset = document.getElementsByClassName('passReset')[0];
    user.onkeyup = function(){
            userReset.style.display = 'block';
    }
    userReset.onclick = function(){
        user.value = '';
        userReset.style.display = 'none';
    }
    // paw.onkeyup = function(){
    //     passReset.style.display = 'block';
    // }
    // passReset.onclick = function(){
    //     paw.value = '';
    //     passReset.style.display = 'none';
    // }
    




}