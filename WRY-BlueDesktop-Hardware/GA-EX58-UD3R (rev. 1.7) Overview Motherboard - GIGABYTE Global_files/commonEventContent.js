﻿var checkContentFlowType = function() {
	var size = Math.round($(window).width() / 100);
	if (size <= 12) {
		size = 12;
	}
	$("#PageMainContent").children(".body-content").css("font-size", size);
}

//AddThis 2023/5/31 終止服務
//Top Banner 區塊: 設定 SNS Button Hover
//var setSnsButtonHoverClick = function() {
//	$('.SnsShare').bind({
//		mouseenter: function(e) {
//			// Hover event handler
//			$(this).find(".SnsAddThisArea").stop(true, false).fadeIn("slow");
//		},
//		mouseleave: function(e) {
//			// Hover event handler
//			$(this).find(".SnsAddThisArea").stop(true, false).fadeOut("slow");
//		},
//		click: function(e) {
//			// Click event handler
//			if ($(this).find(".SnsAddThisArea").css("display") === "none") {
//				$(this).find(".SnsAddThisArea").stop(true, false).fadeIn("slow");
//			} else {
//				$(this).find(".SnsAddThisArea").stop(true, false).fadeOut("slow");
//			}
//		}
//	});
//};

//Background 
var setBackgroundHigh = function() {
	if ($('.Content-TopArea')) {
		if ($('#PageMainContent')) {
			$('#PageMainContent').before($('.Content-TopArea'));
		}
		//$('.Content-TopArea') height 值於 LayoutScript.js SettingMenuBarHeight()設定
		//先後順序問題須先確認header 高度
	}
};

var setBackgroundCenterRwd = function (backgroundMedia) {
	if (backgroundMedia) {
		if (backgroundMedia.is("img")) {
			//改用CSS判斷圖片置中與撐滿，修正手機實機圖片沒撐滿問題
			if (!CheckUseRWDsizeNow(960) && backgroundMedia.width()) {
				backgroundMedia.css("width", "auto");
				backgroundMedia.css("height", "auto");
				backgroundMedia.css("margin-left", 0);
				const realWidth = backgroundMedia.width() * ($(window).height() / backgroundMedia.height());
				const realHeight = backgroundMedia.height() * ($(window).width() / backgroundMedia.width());
				//console.log("realHeight:" + realHeight);
				//console.log("$(window).height():" + $(window).height());
				if (realHeight && realHeight < $(window).height() - 1) {
					backgroundMedia.css("width", "auto");
					backgroundMedia.css("height", "100vh");
					const marginLeft = 0 - ((backgroundMedia.width() * ($(window).height() / backgroundMedia.height()) - $(window).width()) / 2);
					backgroundMedia.css("margin-left", marginLeft);
				} else {
					backgroundMedia.css("width", "100vw");
					backgroundMedia.css("height", "auto");
					backgroundMedia.css("margin-left", 0);
				}
			}
		}
	}
};

var ResetBackgroundCenterRwd = function (backgroundMedia) {
	if (backgroundMedia) {
		//改用CSS判斷圖片置中與撐滿，修正手機實機圖片沒撐滿問題
		if (!CheckUseRWDsizeNow(960) && backgroundMedia.is("img")) {
			if (backgroundMedia.width()) {
				backgroundMedia.css("width", "auto");
				backgroundMedia.css("height", "auto");
				backgroundMedia.css("margin-left", 0);
			}
		}
	}
};

//Section 區塊: 設定Speaker Info 圖片連結
var setSpeakerImgOnclick = function () {
	var speakerImgHaveLink = $(".SpeakerInfo-Img.haveLink");
	speakerImgHaveLink.off('click').click(function () {
		var link = $(this).parent('.SpeakerInfo-ImgTitle').find(".SpeakerInfo-Link").attr("href");
		window.open(link);
	});
};