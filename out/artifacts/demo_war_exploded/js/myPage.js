// 个人主页按钮
$('#myPageBtn').on('click', function () {
    var userId = managerCookie.getCookie("userId");
    var password = managerCookie.getCookie("password");
    if ( userId && password ) {
        // 登录后点击个人主页拉取主页信息
        getUserInfo('http://localhost:8080/demo_war_exploded/GetUser', userId, function (res) {
            var data = res[0];
            console.log(res);
            console.log(data);
            $('#myPage').personPage({
                userId : userId,
                backImage : !data.backImage ? './image/06.jpg' : data.backImage,
                userImage : !data.userImage ? './image/07.jpg' : data.userImage,
                userName : !data.userName ? userId : data.userName,
                userSign : !data.userSign ? "暂无个人签名" : data.userSign,
                userConcernNum : !data.concernNum ? 0 : data.concernNum,
                userDynamicNum : !data.dynamicNum ? 0 : data.dynamicNum,
                createMyPage : true
            });
            changeMenu(this, '#myPage');

        });
    } else {
        alert('请先登录!');
    }
});


function getUserInfo(url, userId, callback) {
    $.ajax({
        type: 'GET',
        url: url,
        data: {
            userId : userId
        },
        dataType: 'json',
        success: function (res) {
            typeof callback == 'function' && callback(res);
        }
    });
}