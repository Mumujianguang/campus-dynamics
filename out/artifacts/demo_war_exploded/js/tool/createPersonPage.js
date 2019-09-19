(function ($) {

    function CreatePersonPage (personInfo) {
        this.self = personInfo.self;
        this.userId = personInfo.userId;
        this.backImage = personInfo.backImage;
        this.userImage = personInfo.userImage;
        this.userName = personInfo.userName;
        this.userSign = personInfo.userSign;
        this.userConcernNum = personInfo.userConcernNum;
        this.userDynamicNum = personInfo.userDynamicNum;

        this.createMyPage = personInfo.createMyPage;
        this.curConcernState = personInfo.curConcernState;

        this.createDom();
        this.initStyle();
        this.bindEvent();
    }

    CreatePersonPage.prototype.createDom = function () {
        // 头部
        var $pageBox = $('<div class="page_content" data-userId="' + this.userId + '"></div>');
        var $userInfoBox = $('<div class="userInfoBox"></div>');
        var $user_image = $('<img class="userImage">');
        var $ODiv1 = $('<div class="ODiv1"></div>');
        var $userName = $('<p class="userName">' + (!this.userName ? this.userId : this.userName) + '</p>');
        var $userSign = $('<p class="userSign">' + (!this.userSign ? "暂无个人签名" : this.userSign) + '</p>');

        // 个人主页导航
        var $userNav = $('<ul class="userNav user_nav"></ul>');
        var $li1 = $('<li class="userNavConcernBtn"></li>');
        var $Span1 = $('<span>关注</span>');
        var $Span2 = $('<span>' + this.userConcernNum + '</span>');
        var $li2 = $('<li class="userNavMyDynamicBtn"></li>');
        var $Span3 = $('<span>动态</span>');
        var $Span4 = $('<span>' + this.userDynamicNum+ '</span>');
        var $li3 = $('<li class="userNavMyInfoBtn">个人信息</li>');

        var $slideBox = $('<div class="slideBox"></div>');
        var $concern = $('<div class="concern"></div>');
        var $dynamic = $('<div class="myDynamic">2</div>');
        var $info = $('<div class="myInfo">\
            <form class="myInfo_list">\
                <p>基本信息</p>\
                <div class="text">\
                    <label for="userName">昵称</label>\
                    <input name="userName" type="text">\
                </div>\
                <div class="text">\
                    <label for="userSign">简介</label>\
                    <textarea name="userSign" wrap="hard"></textarea>\
                </div>\
                <div class="select">\
                    <label for="">性别</label>\
                    <div>\
                        <label for="male">男</label><input id="male" name="userSex" type="radio" value="0">\
                        <label for="female">女</label><input id="female" name="userSex" type="radio" value="1">\
                    </div>\
                </div>\
                <div class="text">\
                    <label for="userAge">年龄</label>\
                    <input name="userAge" type="text">\
                </div>\
                <div class="text">\
                    <label for="userCollege">学院</label>\
                    <input name="userCollege" type="text">\
                </div>\
                <div class="text">\
                    <label for="userGrade">年级</label>\
                    <input name="userGrade" type="text">\
                </div>\
            </form>\
        </div>');
        

        $ODiv1.append( $userName );
        $ODiv1.append( $userSign );

        $userNav.append($li1);
        $li1.append( $Span1 );
        $li1.append( $Span2 );
        $userNav.append($li2);
        $li2.append( $Span3 );
        $li2.append( $Span4 );
        $userNav.append($li3);

        $slideBox.append( $concern );
        $slideBox.append( $dynamic );
        $slideBox.append( $info );

        $userInfoBox.append( $user_image );
        $userInfoBox.append( $ODiv1 );

        $pageBox.append( $userInfoBox );
        $pageBox.append( $userNav );
        $pageBox.append( $slideBox );
        this.self.html( $pageBox );

        if (this.createMyPage) {
            $('.myInfo_list', this.self).append( $('<div class="btn">\
                <input class="save" type="submit" value="保存">\
                <input type="reset">\
            </div>') );
        }
        if (!this.createMyPage) {
            var $concernUser = $('<button class="concernUserBtn" data-state="' + this.curConcernState + '"></button>');
            var state = parseInt(this.curConcernState);
            if (state) {
                $concernUser.text('已关注');
            } else {
                $concernUser.text('关注');
            }
            $userInfoBox.append( $concernUser );
        }
    }

    CreatePersonPage.prototype.initStyle = function () {
        $('.page_content').css({
            position: 'relative',
            width: 900,
            margin: '0 auto',
            backgroundColor: 'rgb(244, 255, 253)'
        });
        $('.userInfoBox').css({
            position: 'relative',
            width: '100%',
            height: 200,
            backgroundImage: "url(" + this.backImage + ")",
            backgroundSize: 'cover',
            textAlign: 'center'
        });
        $('.userImage').css({
            position: 'absolute',
            left: 'calc(50% - 50px)',
            top: 20,
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: '1px solid black',
            overflow: 'hidden'
        }).attr('src', this.userImage);
        $('.ODiv1').css({
            position: 'absolute',
            width: 200,
            bottom: 10,
            left: 'calc(50% - 100px)'
        });
        $('.userName').add('.userSign').css({
            margin: '10px 0'
        }).end().css({
            color: '#fff',
            fontSize: '20px',
            fontWeight: 'bold',
        });
    }

    CreatePersonPage.prototype.bindEvent = function () {
        var mine = this;
        // 获取关注列表
        $('.userNavConcernBtn', this.self).on('click', function () {
            $('.concern', mine.self).siblings().hide();
            $('.concern', mine.self).empty();
            $('.concern', mine.self).show();
            var dataJson = {
                userId : $('.page_content', mine.self).attr('data-userId'),
            }
            getData('GET', 'http://localhost:8080/demo_war_exploded/GetUserConcernList', dataJson, function (res) {
                console.log(res);
                res.forEach(function (ele, index) {
                    $('.concern', mine.self).renderFriData(ele);
                });
            })

        });

        // 获取个人动态
        $('.userNavMyDynamicBtn', this.self).on('click', function () {
            $('.myDynamic', mine.self).siblings().hide();
            $('.myDynamic', mine.self).empty();
            $('.myDynamic', mine.self).show();

            var dataJson = {
                userId : mine.userId
            }
            getData("GET", 'http://localhost:8080/demo_war_exploded/GetUserDynamic', dataJson, function (res) {
                res.forEach(function (ele, index) {
                    ele.createMyDynamic = true;
                    if ( !mine.createMyPage ) {
                        ele.createMyDynamic = false;
                    }
                    ele.userImage = mine.userImage;
                    ele.userName  = mine.userName;
                    $('.myDynamic', mine.self).renderDynamic(ele);
                })
            })

        });

        // 获取个人信息
        $('.userNavMyInfoBtn', this.self).on('click', function () {
            $('.myInfo', mine.self).siblings().hide();
            $('.myInfo', mine.self).show();

            var userId = mine.userId;
            var dataJson = {
                userId : userId
            }
            getData("GET", 'http://localhost:8080/demo_war_exploded/GetUserInfo', dataJson, function (data) {
                var data = data[0];
                console.log(data);
                $('.myInfo_list', mine.self)[0].userName.value = !data.userName ? "" : data.userName;
                $('.myInfo_list', mine.self)[0].userSign.value = !data.userSign ? "" : data.userSign;
                $('.myInfo_list', mine.self)[0].userSex.value = !data.userSex ? "" : data.userSex;
                $('.myInfo_list', mine.self)[0].userAge.value = !data.userAge ? "" : data.userAge;
                $('.myInfo_list', mine.self)[0].userCollege.value = !data.userCollege ? "" : data.userCollege;
                $('.myInfo_list', mine.self)[0].userGrade.value = !data.userGrade ? "" : data.userGrade;
            })
        });

        // 更新个人信息
        $('.save', this.self).on('click', function (e) {
            e.preventDefault();
            var userId = mine.userId;
            var userName = $('.myInfo_list', mine.self)[0].userName.value;
            var userSign = $('.myInfo_list', mine.self)[0].userSign.value;
            var userSex = $('.myInfo_list', mine.self)[0].userSex.value;
            var userAge = $('.myInfo_list', mine.self)[0].userAge.value;
            var userCollege = $('.myInfo_list', mine.self)[0].userCollege.value;
            var userGrade = $('.myInfo_list', mine.self)[0].userGrade.value;

            var dataJson = {
                userId,
                userName,
                userSign,
                userSex,
                userAge,
                userCollege,
                userGrade
            }

            getData("POST", 'http://localhost:8080/demo_war_exploded/UpdateUserInfo', dataJson,function (res) {
                res = parseInt(res);
                if (res) {
                    alert("更新信息成功!");
                    $('#myPageBtn').trigger('click');
                } else {
                    alert("保存失败!");
                }
            })

        });


        // 关注事件
        $('.concernUserBtn', this.self).on('click', function () {
            var self = this;
            var curUser = managerCookie.getCookie("userId");
            var curConcernState = $(self).attr('data-state');

            var dataJson = {
                userId : $('.page_content', mine.self).attr('data-userId'),
                curUser,
                curConcernState,
            }
            console.log(dataJson);
            getData('POST', 'http://localhost:8080/demo_war_exploded/ChangeConcernList', dataJson, function (res) {
                curConcernState = parseInt(res);

                if (curConcernState) {
                    $(self).text('已关注');
                    $(self).attr('data-state', "1");
                } else {
                    $(self).text('关注');
                    $(self).attr('data-state', "0");
                }
                if ( $('#myPage').css('display') != "none" ) {
                    $('#myPageBtn').trigger('click');
                }
            });
        });

        $('.userNavMyDynamicBtn', this.self).trigger('click');
    }

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


    $.fn.extend({
        personPage : function (json) {
            json.self = this;
            new CreatePersonPage(json);
        }
    });
} (jQuery))
