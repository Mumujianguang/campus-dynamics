(function ($) {
    // 关注列表——好友框
    function FriDataBox(config) {
        this.userId = config.userId;
        this.self = config.self;
        this.userImage = config.userImage;
        this.userName = config.userName;
        this.userSign = config.userSign;
        this.concernNum = config.concernNum;
        this.dynamicNum = config.dynamicNum;

        this.createDom();
        this.bindEvent();
    }

    FriDataBox.prototype.createDom = function () {
        this.box = $('<div class="concern_slide" data-userId="' + this.userId + '"></div>');
        var $friImage = $('<img src="' + (!this.userImage ? "./image/07.jpg" : this.userImage) + '" class="fir_image">');
        var $oDiv = $('<div></div>');
        var $friName = $('<p class="fri_name">' + (!this.userName ? this.userId : this.userName) + '</p>');
        var $friSign = $('<p class="fri_sign"></p>');
        var $Span = $('<span>简介:</span>');
        var $friSignInfo = $('<span class="fri_sign_info">' + (!this.userSign ? "暂无个人签名" : this.userSign) + '</span>');


        $friSign.append( $Span );
        $friSign.append( $friSignInfo );

        $oDiv.append( $friName );
        $oDiv.append( $friSign );

        this.box.append( $friImage );
        this.box.append( $oDiv );
        console.log(this.box);
        console.log(this.self);
        this.self.append( this.box );
    }

    FriDataBox.prototype.bindEvent = function () {
        var mine = this;
        this.box.on('click', function () {
            var curUser = managerCookie.getCookie('userId');
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
                    userId : data.userId,
                    backImage : !data.backImage ? './image/06.jpg' : data.backImage,
                    userImage : !data.userImage ? './image/07.jpg' : data.userImage,
                    userName : !data.userName ? data.userId : data.userName,
                    userSign : !data.userSign ? "暂无个人签名" : data.userSign,
                    userConcernNum : !data.concernNum ? "0" : data.concernNum,
                    userDynamicNum : !data.dynamicNum ? "0" : data.dynamicNum,
                    curConcernState : "1",
                    createMyPage : false
                });
            })
        });
    }

    $.fn.extend({
        renderFriData : function (config) {
            
            config.self = this;
            new FriDataBox(config);
        }
    });
} (jQuery))