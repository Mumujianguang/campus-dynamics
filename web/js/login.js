// 登录
$('.login').on('click', function () {
    $('.dialog_log').show();
    $('.dialog_log .loginBox').animate({
        width: 500,
        height: 400,
        opacity: 1
    });
});
$('.dialog_log .mask').on('click', function () {
    var flag = confirm('确认离开登录页面吗');
    if (flag) {
        leaveLogin();
    }
});


// 登录按钮
$('.logBtn').on('click', function (e) {
    e.preventDefault();

    var userId = loginForm.userId.value;
    var password = loginForm.password.value;
    var autoLoginStatus = loginForm.autoLogin.checked;

    if (userId.length == 0 || password.length == 0) {
        alert("账号和密码不能为空!");
    } else {
        login('http://localhost:8080/demo_war_exploded/DealLogin', userId, password, function (res) {
            if (res == "true") {
                if (autoLoginStatus) {
                    managerCookie.setCookie("userId", userId, 3600);
                    managerCookie.setCookie("password", password, 3600);
                }
                alert("登录成功!");
                leaveLogin();
                $('.user_opt').hide();

                $('.nav_userId').text( userId );
                $('.user_info').show();
            } else if (res == "false") {
                alert("账号/密码错误!");
            }
        });
    }
});

// 登录成功后用户按钮
$('.nav_userId').on('click', function (e) {
    e.preventDefault();

    var clickStatus = parseInt($('.nav_userId').attr('data-clickStatus'));
    if ( clickStatus ) {
        $('.nav_userId').attr('data-clickStatus', 0);
        $('.nav_userClick').hide();
    } else {
        $('.nav_userId').attr('data-clickStatus', 1);
        $('.nav_userClick').show();
    }
})

// 退出登录按钮
$('.nav_userClick').on('click', function () {
    managerCookie.removeCookie("userId");
    managerCookie.removeCookie("password");

    $('.user_opt').show();
    $('.user_info').hide();
    $('.nav_userClick').hide();
    $('#mainPageBtn').trigger('click');
});

function leaveLogin() {
    $('.dialog_log').hide();
    $('.dialog_log .loginBox').css({
        width: 0,
        height: 0,
        opacity: 0
    });
    loginForm.reset();
}

function login(url, userId, password, callbacks) {
    $.ajax({
        type: 'POST',
        url: url,
        data: {
            userId,
            password
        },
        success: function (res) {
            typeof callbacks == "function" && callbacks(res);
        }
    });
}