// 新闻按钮
$('#newsPageBtn').on('click', function () {
    var self = this;
    $('.news_box').empty();

    getNews('http://localhost:8080/demo_war_exploded/GetNews', function (res) {
        renderNews(res);
    })
    changeMenu(self, '#newsPage');
});

// 渲染新闻title
function renderNews(res) {
    var str = "";
    var newsNum = res.length;
    $('.news_box').empty();
    res.forEach(function (ele, index) {
        str += '<li class="news">\
                <span class="news_sign"></span>\
                <span class="news_title">' + ele.newsTitle + '</span>\
                <span class="news_date">' + ele.newsDate + '</span>\
            </li>';
    });

    $('.news_num').text( newsNum );
    $('.news_box').html( str );

    $('.news').on('click', newsClick);
}

// 获取全部新闻
function getNews(url, callback) {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (res) {
            typeof callback == 'function' && callback(res);
        }
    });
}

// 点击新闻标题查看新闻内容
function newsClick() {
    var title = $(this).find('.news_title').html();
    var date = $(this).find('.news_date').html();
    $('.new_info_title').html( title );
    $('.new_info_date').html( date );
    console.log(title, date);
    getNewContent('http://localhost:8080/demo_war_exploded/GetNewsInfo', title, function (res) {
        console.log(res);
        $('.new_info_content').html( res[0].newsContent );
        $('.new_info_image').css('backgroundImage', 'url(' + res[0].newsImage + ')');
    });
    $('.dialog_news').show();
}
// 获取内容
function getNewContent(url, data, callback) {
    $.ajax({
        type: 'GET',
        url: url,
        data: {
            newsTitle : data,
        },
        dataType: 'json',
        success: function (res) {
            typeof callback == 'function' && callback(res);
        }
    });
}


// 搜索
$('.search_news_box .sureBtn').on('click', function () {
    var Y = $('.search_news_box #year').val();
    var M = $('.search_news_box #month').val();
    if (Y && M) {
        getSearchNews('http://localhost:8080/demo_war_exploded/GetSearchNews', Y, M, function (res) {
            console.log(res);
            renderNews(res);
        })
    } else {
        alert('请输入完整信息!');
    }

});
function getSearchNews(url, newsY, newsM, callback) {
    $.ajax({
        type: 'GET',
        url: url,
        data: {
            newsY: newsY,
            newsM: newsM
        },
        dataType: 'json',
        success: function (res) {
            typeof callback == 'function' && callback(res);
        }
    });
}


$('.dialog_news .mask').on('click', function () {
    $('.dialog_news').hide();
});

// $('#newsPageBtn').on('click', function () {
//     changeMenu(this, '#newsPage');
// });
// $('.news').on('click', function () {
//     $('.dialog_news').show();
// });

