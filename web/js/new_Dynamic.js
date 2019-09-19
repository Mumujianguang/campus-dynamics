// 动态按钮
var lock = true;
$('#dynamicPageBtn').on('click', function () {
    if (lock) {
        lock = false;
        getData("GET", 'http://localhost:8080/demo_war_exploded/GetAllDynamic', {}, function (res) {
            console.log(res);
            $('.dynamic_wrapper').empty();
            res.forEach(function (ele, index) {
                ele.createMyDynamic = false;
                $('.dynamic_wrapper').renderDynamic(ele);
            })
            changeMenu(this, '#dynamicPage');
        })
    }
    setTimeout(function () {
        lock = true;
    }, 1000);

});

$('.pullDynamicBtn').on('click', function () {
    var userId = managerCookie.getCookie("userId");
    var password = managerCookie.getCookie("password");
    if ( userId && password ) {
        var date = new Date();
        var content = $('#editInp').val();
        var dynamicDate = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日" + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
        var readNum = 0;
        var likeNum = 0;
        var permission = 0;
        var dataJson = {
            userId,
            content,
            dynamicDate,
            readNum,
            likeNum,
            permission
        }
        getData('POST', 'http://localhost:8080/demo_war_exploded/PullDynamic', dataJson, function (res) {
            res = parseInt(res);
            if (res) {
                alert("发布成功!");
                $('#editInp').val("");
                $('#dynamicPageBtn').trigger("click");
            } else {
                alert("发布失败!");
            }
        })
    } else {
        alert("登录后才能发布动态!");
    }
});

function getData(method, url, json, callback) {
    $.ajax({
        type: method,
        url: url,
        data: json,
        dataType: 'json',
        success: function (res) {
            typeof callback == 'function' && callback(res);
        }
    });
}