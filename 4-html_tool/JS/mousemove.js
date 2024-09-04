$(function () {
    $('#big-box2').hide();
    // 1. 主题按钮
    // 鼠标移动与离开按钮的效果
    var t = '';
    var bg_color = 'rgb(100, 188, 156, 0.8)';
    $('.theme').on({
        mouseover: function () {
            $(this).css('background', 'pink');
        },
        mouseleave: function () {
            $(this).css('background', bg_color);
        },
        click: function () {
            t = $(this).text();
            $(this).siblings('.theme').css('background', bg_color);
            $(this).off('mouseover');
            $(this).off('mouseleave');
            $(this)
                .siblings('.theme')
                .on({
                    mouseover: function () {
                        $(this).css('background', 'pink');
                    },
                    mouseleave: function () {
                        $(this).css('background', bg_color);
                    },
                });
        },
    });

    // 2.提交与重置按钮
    // 鼠标经过效果
    $('.bt').on({
        mouseover: function () {
            $(this).css('background', 'pink');
        },
        mouseleave: function () {
            $(this).css('background', bg_color);
        },
    });
    // 点击提交的效果
    $('#submit').on('click', function () {
        $('#big-box1').fadeOut('fast');
        $('#big-box2').fadeIn('normal');
        var cnum = $('#color-num').val();
        var h_c = $('#hot-cold').val();
        var d_s = $('#deep-shallow').val();
        var g_m = $('#gradate-mutate').val();
    });

    // 点击重置的效果
    t = '';
    $('#reset').on('click', function () {
        $('#color-num').prop('value', '5');
        $('.select').prop('value', '50');

        $('.theme').css('background', bg_color);
        $('.theme').on({
            mouseover: function () {
                $(this).css('background', 'pink');
            },
            mouseleave: function () {
                $(this).css('background', bg_color);
            },
        });
    });
});
