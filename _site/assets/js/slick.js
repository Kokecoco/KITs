

// トップページスライドショー
$('.mainimg-slick-parts').slick({
	autoplay: true,
	dots: true,				//丸いページナビボタンを表示
	arrows: false,			//左右の矢印
	autoplaySpeed: 4000,	//切り替えのスピード
});


// 横スライドタイプのサムネイルスライドショー
$('.thumbnail-slide-parts').slick({
    autoplay: true,
    arrows: false,			//左右の矢印
    autoplaySpeed: 2000,	//切り替えのスピード
    slidesToShow: 4,		//画面内に表示させる枚数。
    slidesToScroll: 1,		//１回でスライド移動する枚数。

    //画面幅899px以下の設定
    responsive: [
    {
    breakpoint: 899,	//ブレイクポイント
    settings: {
    slidesToShow: 2,	//画面内に表示させる数。2枚。
    }
    }
    ]
});
