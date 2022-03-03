window.onload = function () {
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
    var paw = document.getElementsByClassName('paw')[0];
    var passReset = document.getElementsByClassName('passReset')[0];
    user.onkeyup = function(){
            userReset.style.display = 'block';
    }
    userReset.onclick = function(){
        user.value = '';
        userReset.style.display = 'none';
    }
    paw.onkeyup = function(){
        passReset.style.display = 'block';
    }
    passReset.onclick = function(){
        paw.value = '';
        passReset.style.display = 'none';
    }
    





}