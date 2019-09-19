// 注册
$('.register').on('click', function () {
    $('.dialog_reg').show();
    $('.dialog_reg .registerBox').animate({
        width: 500,
        height: 400,
        opacity: 1
    });
});
$('.dialog_reg .mask').on('click', function () {
    clearInp();
    $('.dialog_reg').hide();
    $('.dialog_reg .registerBox').css({
        width: 0,
        height: 0,
        opacity: 0
    });
});


// 用户输入注册学号时检测是否该学号已经注册
$('#userIdInp').on('change', function () {
    var userId = $(this).val();

    console.log(userId);

    if (userId.length < 9) {
        $('.isOK').hide();
        $('.isNot').text("学号至少为9位");
        $('.isNot').show();
    } else {
        checkUser('http://localhost:8080/demo_war_exploded/CheckUser', userId, function (res) {
            if (res == "true") {
                $('.isNot').hide();
                $('.isOK').show();
            } else if (res == "false") {
                $('.isOK').hide();
                $('.isNot').text("已存在该用户");
                $('.isNot').show();
            }
        });
    }
});

// 注册
$('.resBtn').on('click', function (e) {
    e.preventDefault();
    var userId = $('#userIdInp').val();
    var pswd = $('#passwordInp').val();
    var truePswd = $('#truePswdInp').val();
    if (userId.length == 0) {
        alert("账号不能为空!");
    } else if (pswd.length < 6 || pswd.length > 18) {
        alert("密码要求为6-18位!");
        return 0;
    } else if (pswd === truePswd) {
        post_resgister('http://localhost:8080/demo_war_exploded/DealRegister', userId, pswd, function (res) {
            res = parseInt(res);
            if (res) {
                alert("注册成功!");
                clearInp();
            } else {
                alert("注册失败!");
            }
        });
    } else {
        alert("两次密码输入不一致!");
    }
});

function clearInp () {
    $('#userIdInp').val("");
    $('#passwordInp').val("");
    $('#truePswdInp').val("");
    $('.isOK').hide();
    $('.isNot').hide();
}

function checkUser(url, userId, callback) {
    $.ajax({
        type: 'GET',
        url: url,
        data: {
            userId : userId
        },
        success: function (res) {
            typeof callback == 'function' && callback(res);
        }
    });
}

function post_resgister(url, userId, password, callback) {
    $.ajax({
        type: 'POST',
        url: url,
        data: {
            userId,
            password
        },
        success: function (res) {
            typeof callback == 'function' && callback(res);
        }
    });
}