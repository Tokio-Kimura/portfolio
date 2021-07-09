$(function () {
    //テキストのカウントアップ+バーの設定
    var bar = new ProgressBar.Line(splash_text, {
        easing: 'easeInOut', //アニメーション効果
        duration: 1000, //時間指定(1000＝1秒)
        strokeWidth: 0.2, //進捗ゲージの太さ
        color: '#FFACDA', //進捗ゲージのカラー
        trailWidth: 0.2, //ゲージベースの線の太さ
        trailColor: 'white', //ゲージベースの線のカラー
        text: {
            style: {
                position: 'absolute',
                left: '50%',
                top: '50%',
                padding: '0',
                margin: '-30px 0 0 0',
                transform: 'translate(-50%,-50%)',
                'font-size': '1rem',
                color: '#FFACDA',
            },
            autoStyleContainer: false,
        },
        step: function (state, bar) {
            bar.setText(Math.round(bar.value() * 100) + ' %');
        }
    });

    //アニメーションスタート
    bar.animate(1.0, function () {
        $("#splash").delay(500).fadeOut(800);
    });
});
$(window).scroll(function () {
    $('.scroll_trigger').each(function () {
        var elemPos = $(this).offset().top - 50;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
            $(this).addClass('skill_bar');
        } else {
            $(this).removeClass('skill_bar');
        }
    });
});

//ヘッダーナビ
var beforePos = 0; //スクロールの値の比較用の設定

//スクロール途中でヘッダーが消え、上にスクロールすると復活する設定を関数にまとめる
function ScrollAnime() {
    var elemTop = $('#about').offset().top; //#area-2の位置まできたら
    var scroll = $(window).scrollTop();
    //ヘッダーの出し入れをする
    if (scroll == beforePos) {
        //IE11対策で処理を入れない
    } else if (elemTop > scroll || 0 > scroll - beforePos) {
        //ヘッダーが上から出現する
        $('#header').removeClass('UpMove'); //#headerにUpMoveというクラス名を除き
        $('#header').addClass('DownMove'); //#headerにDownMoveのクラス名を追加
    } else {
        //ヘッダーが上に消える
        $('#header').removeClass('DownMove'); //#headerにDownMoveというクラス名を除き
        $('#header').addClass('UpMove'); //#headerにUpMoveのクラス名を追加
    }

    beforePos = scroll; //現在のスクロール値を比較用のbeforePosに格納
}


// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
    ScrollAnime(); //スクロール途中でヘッダーが消え、上にスクロールすると復活する関数を呼ぶ
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
    ScrollAnime(); //スクロール途中でヘッダーが消え、上にスクロールすると復活する関数を呼ぶ
});




//リンク先のidまでスムーススクロール
var headerH = $("#header").outerHeight(true); //headerの高さを取得    
$('#g-navi li a').click(function () {
    var elmHash = $(this).attr('href');
    var pos = $(elmHash).offset().top - headerH; //header分の高さを引いた高さまでスクロール
    $('body,html').animate({
        scrollTop: pos
    }, 1000);
    return false;
});


//お問合せフォーム　バリデーション
$(function () {
    // validate
    $("#contact").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            subject: "required",
            message: "required",
        },
        // Specify the validation error messages
        messages: {
            email: "メールアドレスを入力してください。",
            subject: "件名が未記入です。",
            message: "メッセージが未記入です。",
        },
        // submit handler
        submitHandler: function (form) {
            //form.submit();
            $(".message").show();
            $(".message").fadeOut(4500);
        }
    });
});
