window.onload = function(){
    var user = document.getElementsByClassName('user')[0];
    var correct = document.getElementsByClassName('correct')[0];
    //手机号验证
    //以1开头，第二位是3，5，6，7，8任意一个
    //一共11位
    var regPhone = /^(13|15|16|17|18)\d{9}$/;/*  ^[1][3,5,6,7,8]\d{9}$  */
    user.onblur = function(){
        console.log(regPhone.test(user.value));
         
        if(!regPhone.test(user.value)){
            correct.innerHTML = '手机号码不正确';
        }else{
            correct.innerHTML = '';
        }
        
    }

    
  
   
  


















}