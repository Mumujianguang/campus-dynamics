// $('.wheel').createWheel({
//     imageList: [
//         './image/01.jpg',
//         './image/02.jpg',
//         './image/03.jpg',
//         './image/04.jpg',
//         './image/05.jpg'
//     ],
//     width : 800,
//     height : 450,
//     direction : 'right'
// });

// cookie管理对象
var managerCookie = {
    setCookie : function (key, value, time) {
        document.cookie = key + '=' + value + ';max-age' + time;
        return this;
    },
    removeCookie : function (key) {
        return this.setCookie(key, '', -1);
    },
    getCookie : function (key) {
        var cookieArr = document.cookie.split('; ');
        var cookieObj = {};
        cookieArr.forEach(function (ele, index) {
            var dealArr = ele.split('=');
            cookieObj[dealArr[0]] = dealArr[1];
        });
        return cookieObj[key];
    }
}

function init() {
    bindEvent();
    $('#mainPageBtn').trigger('click');

    var userId = managerCookie.getCookie("userId");
    var password = managerCookie.getCookie("password");
    if ( userId && password ) {
       login('http://localhost:8080/demo_war_exploded/DealLogin', userId, password, function () {
           $('.user_opt').hide();
           $('.nav_userId').text( userId );
           $('.user_info').show();
       });
   }

    // 照片墙
    setTimeout(function () {
        $('.wallWrapper').removeClass('init');
    }, 300)

    $('.item').on('click', function () {
        $(this).addClass('active');
        $('.wallWrapper').addClass('focus');
    });

    $('.close').on('click', function (e) {
        e.stopPropagation();
        $('.active').removeClass('active');
        $('.wallWrapper').removeClass('focus');
    })
}

function bindEvent() {
    // 首页按钮
    $('#mainPageBtn').on('click', function () {
        changeMenu(this, '#mainPage')
    });
    
    // 头部导航——首页
    $('.head_nav').find('li').eq(0).on('click', function () {
        $('#mainPageBtn').trigger('click');
    });
    // 头部导航——动态
    $('.head_nav').find('li').eq(1).on('click', function () {
        $('#dynamicPageBtn').trigger('click');
    });
    // 头部导航——新闻
    $('.head_nav').find('li').eq(2).on('click', function () {
        $('#newsPageBtn').trigger('click');
    });


    // 动态展示好友主页——遮罩层——点击隐藏
    $('.dialog_friPage .mask').on('click', function () {
        $('.dialog_friPage').hide();
    });


    // 个人主页菜单切换
    $('#myPage .user_nav_concernBtn').on('click', function () {
        $('#mtPage .concern').siblings().hide();
        $('#mtPage .concern').show();
    });
    $('#myPage .user_nav_myDynamicBtn').on('click', function () {
        $('#mtPage .myDynamic').siblings().hide();
        $('#mtPage .myDynamic').show();
    });
    $('#myPage .user_nav_myInfoBtn').on('click', function () {
        $('#mtPage .myInfo').siblings().hide();
        $('#mtPage .myInfo').show();
    });
}

function changeStatus(self, selector, context) {
    var flag = $(self, context).attr('flag');
    if (flag == '1') {
        $(self, context).attr('flag', '0');
        $(selector, context).show();
    } else{
        $(self, context).attr('flag', '1');
        $(selector, context).hide();
    }
}

function changeMenu(self, page) {
    $('.active').removeClass('active');
    $(self).addClass('active');

    $('.active_page').fadeOut();
    $('.active_page').removeClass('active_page');
    $(page).addClass('active_page');
    $(page).fadeIn();
}

init();
