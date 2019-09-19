(function () {

    function CreateWheel (config) {
        this.self = config.self;
        this.imageList = config.imageList || [];
        this.width = config.width || 500;
        this.height = config.height || 300;
        this.animateType = config.animateType || 'animate';
        this.isAuto = config.isAuto || true;
        this.direction = config.direction || 'left';

        this.imageNum = this.imageList.length;
        this.nowIndex = 0;
        this.lock = true;

        this.createDom();
        this.initStyle();
        this.bindEvent();
        if (this.isAuto) {
            this.autoMove();
        }
    }

    CreateWheel.prototype.createDom = function () {
        var oUL = $('<ul class="wrapper"></ul>');
        var oSpanBox = $('<div class="spanBox"></div>');
        var oLeft = $('<div class="leftBtn">&lt;</div>');
        var oRight = $('<div class="rightBtn">&gt;</div>');
        this.wheel = oUL;
        this.indexBox = oSpanBox;
        this.imageList.forEach(function (ele, index) {
            var oLi = $('<li><a><img src=" ' + ele + ' "></a></li>');
            var oSpan = $('<span></span>');
            oUL.append(oLi);
            oSpanBox.append(oSpan);
        });
        
        if (this.animateType == 'animate') {
            var oLi = $('<li><a><img src=" ' + this.imageList[0] + ' "></a></li>');
            oUL.append(oLi);
        }
        this.self
            .append(oUL)
                .append(oSpanBox)
                    .append(oLeft)
                        .append(oRight);
    }

    CreateWheel.prototype.initStyle = function () {
        // 初始化css
        $('*', this.self).css({
            listStyle : 'none',
            margin : 0,
            padding : 0
        });
        $(this.self).css({
            overflow : 'hidden'
        });
        if (this.animateType == 'animate') {
            $('.wrapper', this.self).css({
                position : 'absolute',
                top : 0,
                left : 0,
                width : this.width * (this.imageList.length + 1),
                height : this.height
            }).find('li').css({
                width : this.width,
                height : this.height,
                float : 'left'
            });
        } else if (this.animateType == 'fade'){
            $('.wrapper', this.self).css({
                position : 'absolute',
                top : 0,
                left : 0,
                width : this.width,
                height : this.height
            }).find('li').css({
                display : 'none',
                position : 'absolute',
                top : 0,
                left : 0,
                width : this.width,
                height : this.height,
            }).eq(0).css({
                display : 'block'
            });
        }
        
        $('.wrapper > li > a, .wrapper > li > a > img', this.self).css({
            display : 'inline-block',
            width : this.width,
            height : this.height,
        });
        $('.spanBox', this.self).find('span').css({
            display : 'inline-block',
            width : 10,
            height : 10,
            margin : 3,
            borderRadius : '50%',
            backgroundColor : '#fff'
        }).eq(0).css({
            backgroundColor : '#f40'
        }).end().end().css({
            position : 'absolute',
            width : 16 * this.imageNum,
            height : 16,
            bottom : 20,
            left : '50%',
            marginLeft : -16 * this.imageNum / 2,
        });
        $('.leftBtn, .rightBtn', this.self).css({
            display : 'none',
            position : 'absolute',
            top : '50%',
            marginLeft : 10,
            marginTop : -15,
            width: 50,
            height : 30,
            lineHeight : '30px',
            backgroundColor : '#000',
            borderRadius : '20px',
            color : '#fff',
            textAlign : 'center',
            opacity : '0.8'
        }).eq(1).css({
            right : 10
        });
    }

    CreateWheel.prototype.bindEvent = function () {
        var mine = this
        // 鼠标移入展示按钮
        this.self.on('mouseenter', function () {
            $('.leftBtn, .rightBtn', mine.self).fadeIn();
            clearInterval(mine.timer);
        });
        // 鼠标移出隐藏按钮
        this.self.on('mouseleave', function () {
            $('.leftBtn, .rightBtn', mine.self).fadeOut();
            if (mine.isAuto) {
                mine.autoMove();
            }
        });
        // 点击向左
        $('.leftBtn', mine.self).on('click', function () {
            mine.move('left');
        });
        // 点击向右
        $('.rightBtn', mine.self).on('click', function () {
            mine.move('right');
        });

        $('.spanBox > span').on('click', function (e) {
            mine.nowIndex = $(e.target).index();
            
            mine.indexBox.find('span').css({
                backgroundColor : '#fff'
            }).eq(mine.nowIndex).css({
                backgroundColor : '#f40'
            });

            if (mine.animateType == 'animate') {
                mine.wheel.animate({left : -(mine.nowIndex) * mine.width});
            } else if (mine.animateType == 'fade') {
                mine.wheel
                    .find('li').fadeOut()
                        .eq(mine.nowIndex).fadeIn()
            }
        });
    }

    CreateWheel.prototype.move = function (dir) {
        var mine= this;
        if (mine.lock) {
            mine.lock = false;
            if (dir == 'left') { 
                if (mine.animateType == 'animate') {
                    if ( mine.nowIndex == 0 ) {
                        mine.nowIndex = mine.imageNum; 
                        mine.wheel.css({left : -mine.nowIndex * mine.width});  
                    }
                    mine.wheel.animate({left : -(--mine.nowIndex) * mine.width}, function () {
                        mine.lock = true;
                    });
                } else if (mine.animateType == 'fade') {
                    if ( mine.nowIndex == 0 ) {
                        mine.nowIndex = mine.imageNum;
                    }
                    mine.wheel
                        .find('li').fadeOut()
                            .eq(--mine.nowIndex).fadeIn(function () {
                                mine.lock = true;
                            });
                }
                
            } else if ( dir == 'right' ) {
                if (mine.animateType == 'animate') {
                    if ( mine.nowIndex == mine.imageNum ) {
                        mine.nowIndex = 0;
                        mine.wheel.css({left : 0});
                    }
                    mine.wheel.animate({left : -(++mine.nowIndex) * mine.width}, function () {
                        mine.lock = true;
                    });
                } else if (mine.animateType == 'fade') {
                    if ( mine.nowIndex == mine.imageNum - 1) {
                        mine.nowIndex = -1;
                    }
                    mine.wheel
                        .find('li').fadeOut()
                            .eq(++mine.nowIndex).fadeIn(function () {
                                mine.lock = true;
                            });
                }
            }
            mine.indexBox.find('span').css({
                backgroundColor : '#fff'
            }).eq(mine.nowIndex % mine.imageNum).css({
                backgroundColor : '#f40'
            });
        }
        
    }

    CreateWheel.prototype.autoMove = function () {
        var mine = this;
        this.timer = setInterval(function () {
            mine.move(mine.direction);
        }, 5000);
    }


    $.fn.extend({
        createWheel: function (config) {
            config.self = this;
            new CreateWheel(config);
        }
    });


}())