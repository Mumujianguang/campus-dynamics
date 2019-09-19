(function ($) {
    function DynamicData(config) {
        this.self = config.self;
        this.id = config.id;
        this.userId = config.userId;
        this.userImage = config.userImage;
        this.userName = config.userName;
        this.date = config.date;
        this.content = config.content;
        this.readNum = config.readNum;
        this.likeNum = config.likeNum;

        this.createMyDynamic = config.createMyDynamic;

        this.likeBtnLock = true;
        this.readLock = true;

        this.createDom();
        this.bindEvent();
    }

    DynamicData.prototype.createDom = function () {
        this.box = $('<div class="myDynamic_slide" data-id="' + this.id + '" data-userId="' + this.userId + '"></div>');
        // 动态头部
        var $dynamicSlideHead = $('<div class="myDynamic_slide_head"></div>');
        this.$oImg1 = $('<img src="' + (!this.userImage ? './image/07.jpg' : this.userImage) + '">');
        
        var $oDiv1 = $('<div><div>');
        var $myname = $('<p class="myname">' + (!this.userName ? this.userId : this.userName) + '</p>');
        var $date = $('<p class="date">' + this.date + '</p>');
        $oDiv1.append( $myname );
        $oDiv1.append( $date );

        var $oSpan = $('<span class="more" flag="1">更多></span>');
        
        var $moreList = $('<ul class="more_list"></ul>');
        var $li1 = $('<li class="remove_myDynamic_slide">删除</li>');
        var $li2 = $('<li class="only">仅自己可见</li>');
        var $li3 = $('<li class="every">任何人可见</li>');
        $moreList.append( $li1 );
        $moreList.append( $li2 );
        $moreList.append( $li3 );

        $dynamicSlideHead.append( this.$oImg1 );
        $dynamicSlideHead.append( $oDiv1 );
        if (this.createMyDynamic) {
            $dynamicSlideHead.append( $oSpan );
        }    
        $dynamicSlideHead.append( $moreList );

        // 内容区
        var $myDynamicSlideContent = $('<div class="myDynamic_slide_content"></div>');
        var $content = $('<p class="content">' + this.content + '</p>');
        $myDynamicSlideContent.append($content);

        // 底部
        var $myDynamicSlideBottom = $('<div class="myDynamic_slide_bottom"></div>');
        var $readNum = $('<div class="read_num"></div>');
        var $oSpan1 = $('<span>阅读</span>');
        this.$oSpan2 = $('<span>' + this.readNum + '</span>');
        $readNum.append( $oSpan1 );
        $readNum.append( this.$oSpan2 );

        var $forward = $('<div class="forward">转发</div>');
        this.$comments = $('<div class="comments" flag="1">评论</div>');

        this.$likeNum = $('<div class="like_num"></div>');
        var $oSpan3 = $('<span>赞</span>');
        this.$oSpan4 = $('<span>' + this.likeNum + '</span>');
        this.$likeNum.append( $oSpan3 );
        this.$likeNum.append( this.$oSpan4 );

        $myDynamicSlideBottom.append( $readNum );
        $myDynamicSlideBottom.append( $forward );
        $myDynamicSlideBottom.append( this.$comments );
        $myDynamicSlideBottom.append( this.$likeNum );

        // 评论区
        this.$myDynamicSlideComment = $('<div class="myDynamic_slide_comment"></div>');
        this.$oImg2 = $('<img src="" class="comment_user_image">');
        this.$Input = $('<input type="text" class="comment_user_text">');
        this.$button = $('<button class="comment_user_btn">评论</button>');
        this.$myDynamicSlideComment.append( this.$oImg2 );
        this.$myDynamicSlideComment.append( this.$Input );
        this.$myDynamicSlideComment.append( this.$button );

        // 评论展示区
        this.$myDynamicSlideCommentDisplay = $('<div class="myDynamic_slide_comment_display"></div>');

        this.box.append( $dynamicSlideHead );
        this.box.append( $myDynamicSlideContent );
        this.box.append( $myDynamicSlideBottom );
        this.box.append( this.$myDynamicSlideComment );
        this.box.append( this.$myDynamicSlideCommentDisplay );

        this.self.append( this.box );
    }

    DynamicData.prototype.bindEvent = function () {
        var mine = this;
        $('.more', this.box).on('click', function () {
            changeStatus(this, '.more_list', mine.box);
        });
        // 删除按钮
        $('.remove_myDynamic_slide', this.box).on('click', function () {
            var flag = confirm("确认删除此动态吗");
            if (flag) {
                var ID = mine.box.attr("data-id");

                var dataJson = {
                    ID
                }
                getData("POST", 'http://localhost:8080/demo_war_exploded/DeleteDynamic', dataJson, function (res) {
                    res = parseInt(res);
                    if (res) {
                        $('#myPageBtn').trigger("click");
                    }
                });
            }
        });
        // 设置仅自己可见
        $('.only', this.box).on('click', function () {
            $('.more', mine.box).trigger("click");
            var ID = mine.box.attr("data-id");
            var dataJson = {
                permission : "1",
                ID
            }
            getData("POST", 'http://localhost:8080/demo_war_exploded/SetDynamicPermission', dataJson, function (res) {
                res = parseInt(res);
                if (res) {
                    alert("此动态已设置为仅自己可见");
                } else {
                    alert("设置失败!");
                }
            });
        });
        // 设置所有人可见
        $('.every', this.box).on('click', function () {
            $('.more', mine.box).trigger("click");
            var ID = mine.box.attr("data-id");
            var dataJson = {
                permission : "0",
                ID
            }
            getData("POST", 'http://localhost:8080/demo_war_exploded/SetDynamicPermission', dataJson, function (res) {
                res = parseInt(res);
                if (res) {
                    alert("此动态已设置为所有人可见");
                } else {
                    alert("设置失败!");
                }
            });
        });

        // 点击头像访问用户主页
        if (!this.createMyDynamic) {
            this.$oImg1.on('click', function () {
                var curUser = managerCookie.getCookie("userId");
                var userId = mine.box.attr('data-userId');
                var dataJson = {
                    userId,
                    curUser
                }
                console.log(dataJson);
                getData("GET", 'http://localhost:8080/demo_war_exploded/GetUser', dataJson, function (res) {
                    var data = res[0];
                    console.log(data);
                    $('.dialog_friPage').show();
                    $('.dialog_friPage .friPageBox').empty();
                    $('.dialog_friPage .friPageBox').personPage({
                        userId : mine.userId,
                        backImage : !data.backImage ? './image/06.jpg' : data.backImage,
                        userImage : !data.userImage ? './image/07.jpg' : data.userImage,
                        userName : data.userName,
                        userSign : data.userSign,
                        userConcernNum : !data.concernNum ? "0" : data.concernNum,
                        userDynamicNum : !data.dynamicNum ? "0" : data.dynamicNum,
                        curConcernState : data.curConcernState,
                        createMyPage : false
                    });
                })
            })
        }

        // 评论按钮
        mine.$comments.on('click', function () {
            var dataJson = {
                userId : managerCookie.getCookie("userId")
            }
            getData('GET', 'http://localhost:8080/demo_war_exploded/GetUserImage', dataJson, function (res) {
                var userImage = res;
                console.log(userImage);
                mine.$oImg2.attr('src', (!userImage ? './image/07.jpg' : userImage));
            })
            changeStatus(this, mine.$myDynamicSlideComment, mine.self);
        });

        // 提交评论
        mine.$button.on('click', function () {
            console.log(12);
            var date = new Date();
            var commentTime = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日" + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
            var dataJson = {
                ID : mine.id,
                commentUserId : managerCookie.getCookie("userId"),
                commentContent : mine.$Input.val(),
                commentTime,
            }
            getData('POST', 'http://localhost:8080/demo_war_exploded/PullComments', dataJson, function (res) {
                res = parseInt(res);
                if (res) {
                    mine.$Input.val("");
                    changeStatus(mine.$comments, mine.$myDynamicSlideComment, mine.self);
                    if ( $('#dynamicPageBtn').css('display') != 'none' ) {
                        $('#dynamicPageBtn').trigger('click');
                    }
                } else {
                    alert("评论失败!");
                }
            });
        });

        // 阅读
        mine.box.on('mouseenter', function () {
            if (mine.readLock) {
                mine.readLock = false;
                setTimeout(function () {
                    mine.readLock = true
                }, 600000);
                var dataJson = {
                    ID : mine.id
                }
                getData("POST", 'http://localhost:8080/demo_war_exploded/AddReadNum', dataJson, function (res) {
                    res = parseInt(res);
                    if (res) {
                        var val = parseInt(mine.$oSpan2.text());
                        mine.$oSpan2.text( "" + (++val) );
                    } else {
                        alert("阅读失败!");
                    }
                })
            }
        });

        // 点赞
        mine.$likeNum.on('click', function () {
            if (mine.likeBtnLock) {
                mine.likeBtnLock = false;
                setTimeout(function () {
                    mine.likeBtnLock = true;
                }, 5000);
                var dataJson = {
                    ID : mine.id
                }
                getData("POST", 'http://localhost:8080/demo_war_exploded/AddLikeNum', dataJson, function (res) {
                    res = parseInt(res);
                    if (res) {
                        var val = parseInt(mine.$oSpan4.text());
                        mine.$oSpan4.text( "" + (++val) );
                    } else {
                        alert("点赞失败!");
                    }
                })
            } else {
                alert("短时间内不能重复点赞!");
            }
        })


        // 渲染回复面板
        var dataJson = {
            dynamicId : mine.id
        }
        getData("GET", "http://localhost:8080/demo_war_exploded/GetCommentList", dataJson, function (res) {
            var data = res;
            console.log(res);
            mine.$myDynamicSlideCommentDisplay.empty();
            data.forEach(function (ele, index) {
                mine.$myDynamicSlideCommentDisplay.append( $('<div class="usersComments"><div class="first_content">\
                    <div class="commentBox">\
                        <img src="' + (!ele.userImage ? "./image/07.jpg" : ele.userImage) + '" class="comment_user_image">\
                        <p class="commentTime">' + ele.commentTime + '</p>\
                        <div class="commentContentBox">\
                            <span class="comment_user">' + (!ele.userName ? ele.commentUserId : ele.userName) + '</span>\
                            <span>:</span>\
                            <span class="commentContent">' + ele.commentContent + '</span>\
                        </div>\
                    </div>\
                 </div></div>')
                )
            })

        })

    }

    $.fn.extend({
        renderDynamic : function (config) {
            config.self = this;
            new DynamicData(config);
        }
    });
} (jQuery))