var cnum = 6;

var color_list1 = [
    'rgb(120, 129, 115)',
    'rgb(153, 164, 141)',
    'rgb(182, 182, 168)',
    'rgb(252, 224, 233)',
    'rgb(145, 169, 127)',
    'rgb(153, 220, 240)',
];
// 改变大盒子容器的高度（随cnum变化）
$('.scheme-img-big').css('height', String(cnum * 70 + 30) + 'px');
// 改变大盒子容器的位置，确保居中
$('.scheme-img-big').css(
    'top',
    String((500 - $('.scheme-img-big').height()) / 2) + 'px'
);

// 获取元素盒子
var big_box1 = document.getElementById('big1');
var big_box2 = document.getElementById('big2');
var big_box3 = document.getElementById('big3');
var big_box4 = document.getElementById('big4');
var big_box5 = document.getElementById('big5');
var big_boxes = [big_box1, big_box2, big_box3, big_box4, big_box5];

var small_box1 = document.getElementById('small1');
var small_box2 = document.getElementById('small2');
var small_box3 = document.getElementById('small3');
var small_box4 = document.getElementById('small4');
var small_box5 = document.getElementById('small5');
var small_boxes = [small_box1, small_box2, small_box3, small_box4, small_box5];

// 外循环遍历5个图像
for (var j = 1; j <= 5; j++) {
    // 内循环遍历每个图像小格
    for (var i = 1; i <= cnum; i++) {
        // 绘制大图
        var new_item = document.createElement('div');
        new_item.classList.add('color-show-big');
        new_item.style.backgroundColor = color_list1[i - 1];

        // 大图文字
        var rgbValue = document.createElement('p');
        rgbValue.classList.add('text');

        rgbValue.innerHTML =
            color_list1[i - 1] +
            '\n' +
            color_list1[i - 1] +
            '\n' +
            color_list1[i - 1];
        new_item.appendChild(rgbValue);
        big_boxes[j - 1].appendChild(new_item);

        // 绘制小图
        var new_item = document.createElement('div');
        new_item.classList.add('color-show-small');
        new_item.style.backgroundColor = color_list1[i - 1];

        small_boxes[j - 1].appendChild(new_item);
    }
}

$('.scheme-img-big').hide();

// 绑定鼠标事件
$('.scheme-img-small').on({
    mouseover: function () {
        $(this).stop().fadeOut('fast');
        $(this).siblings('.scheme-img-big').stop().fadeIn('fast');
        changeBk(cnum);
    },
    mouseleave: function () {
        $(this).stop().fadeIn('fast');
        $(this).siblings('.scheme-img-big').stop().fadeOut('fast');
    },
});
$('.scheme-img-big').on({
    mouseleave: function () {
        $(this).stop().fadeOut('fast');
        $(this).siblings('.scheme-img-small').stop().fadeIn('fast');
    },
});

// 改变背景
function changeBk(cnum) {
    switch (cnum) {
        case 2:
            $('#bk2').hide();
            $('#bk3').hide();
            $('#bk4').hide();
            $('#bk5').hide();
            $('#bk6').hide();
            // 背景色
            $('#svgs-box').css('background-color', color_list1[1]);
            // 背景svg更改颜色的方法
            $('#bk1').css('fill', color_list1[0]);

        case 3:
            $('#bk3').hide();
            $('#bk4').hide();
            $('#bk5').hide();
            $('#bk6').hide();
            // 背景色
            $('#svgs-box').css('background-color', color_list1[2]);
            // 背景svg更改颜色的方法
            $('#bk1').css('fill', color_list1[0]);
            $('#bk2').css('fill', color_list1[1]);
        case 4:
            $('#bk4').hide();
            $('#bk5').hide();
            $('#bk6').hide();
            // 背景色
            $('#svgs-box').css('background-color', color_list1[3]);
            // 背景svg更改颜色的方法
            $('#bk1').css('fill', color_list1[0]);
            $('#bk2').css('fill', color_list1[1]);
            $('#bk3').css('fill', color_list1[2]);
        case 5:
            $('#bk5').hide();
            $('#bk6').hide();
            // 背景色
            $('#svgs-box').css('background-color', color_list1[4]);
            // 背景svg更改颜色的方法
            $('#bk1').css('fill', color_list1[0]);
            $('#bk2').css('fill', color_list1[1]);
            $('#bk3').css('fill', color_list1[2]);
            $('#bk4').css('fill', color_list1[3]);
        case 6:
            $('#bk6').hide();
            // 背景色
            $('#svgs-box').css('background-color', color_list1[5]);
            // 背景svg更改颜色的方法
            $('#bk1').css('fill', color_list1[0]);
            $('#bk2').css('fill', color_list1[1]);
            $('#bk3').css('fill', color_list1[2]);
            $('#bk4').css('fill', color_list1[3]);
            $('#bk5').css('fill', color_list1[4]);
        case 7:
            // 背景色
            $('#svgs-box').css('background-color', color_list1[6]);
            // 背景svg更改颜色的方法
            $('#bk1').css('fill', color_list1[0]);
            $('#bk2').css('fill', color_list1[1]);
            $('#bk3').css('fill', color_list1[2]);
            $('#bk4').css('fill', color_list1[3]);
            $('#bk5').css('fill', color_list1[4]);
            $('#bk6').css('fill', color_list1[5]);
    }
}
