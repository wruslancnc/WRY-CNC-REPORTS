﻿//產品圖片效果BY NEAL
//新舊共用 By Cody
function zoom_img(popOutYoutubeVideoUrl) {
	if (CheckWebsiteUnder960()) {
		return false;
	}
	if (typeof (popOutYoutubeVideoUrl) !== "undefined" && popOutYoutubeVideoUrl !== "") {
		PopOutVideo(popOutYoutubeVideoUrl);
		return false;
	}
	var picBigArray = [];
	var picSmallArray = [];
	var picItem = $(".gallery-list-item");
	for (var i = 0; i < picItem.length; i++) {
		picBigArray.push(picItem.eq(i).attr("data-big"));
		picSmallArray.push(picItem.children("img").eq(i).attr("src"));
	}
	var mainContent = $("<div></div>");
	mainContent.addClass("BlockArea");
	var div = $("<div></div>");
	var img = $("<img/>");
	img.attr("src", $("#nowPicName").val());
	var href = $("<a></a>");
	var srcImg = $("#nowPicName").val();
	var picture = $("<picture></picture>");
	var source = $("<source></source>").attr("type", "image/webp");
	if ($("li[data-srcimg='" + $("#nowPicName").val().replace("big", "src") + "']").length > 0) {
		srcImg = $("#nowPicName").val().replace("big", "src");
		href.attr("href", srcImg);
		//大圖的title alt
		var alt = $("li[data-srcimg='" + $("#nowPicName").val().replace("big", "src") + "']").find("img").attr("title");
		img.attr("alt", alt);
		img.attr("title", alt);
	} else {
		href.attr("href", srcImg);
	}
	href.attr("target", "_blank");
	div.attr("id", "NowShowPic");
	img.attr("id", "NowShowBigPic");
	source.attr("srcset", img.attr("src").replace("/png/", "/webp/"));
	picture.append(source);
	picture.append(img);
	href.append(picture);
	div.append(href);
	mainContent.append(div);
	div = $("<div></div>");
	img = $("<img/>");
	img.attr("src", "/Images/Model/x_large.png");
	div.addClass("CancelBlock");
	div.attr("onclick", "closeBlock()");
	div.append(img);
	mainContent.append(div);
	div = $("<div></div>");
	div.addClass("DownloadArea");
	div.html(GetDownloadImg(srcImg));
	mainContent.append(div);
	var popoutbg = typeof(window.popOutBgBlockUi) !== "undefined" ? window.popOutBgBlockUi : "rgb(255,255,255)";
	$.blockUI({
		message: mainContent,
		css: {
			top: "5%",
			left: '27%',
			width: '46%',
			cursor: 'auto',
			border: '1px solid #888888',
			color: 'rgb(255,255,255)',
			backgroundColor: popoutbg
		}
	});

	$('.blockOverlay').attr('title', 'Click to unblock').click($.unblockUI);
	//目前 RWD 自動縮放該圖片，不會產生 Scroll bar
	//$(".blockMsg").mCustomScrollbar();
	$(".blockMsg").css("z-index", "9999");
	$('.blockOverlay').css("z-index", "9998");

	 //若抵達最大寬度left重設定
	if ($(window).width() * 0.6 >= 850) {
		$(".blockMsg").css("left", ($(window).width() - 850) / 2 + "px");
	}
	return false;
}

function SetPicAreaHeight() {
	var width = $("#NowShowPic").width();
	$("#NowShowPic").css("height", width + "px");
}

function GetDownloadImg(nowPic) {
	var Main = $("<div></div>");
	var table = $("<div></div>");
	table.addClass("div-table");
	var tr = $("<div></div>");
	tr.addClass("div-tr");
	var td = $("<div></div>");
	td.addClass("div-td");
	var div = $("<div></div>");
	var href = $("<a></a>");
	href.attr("href", nowPic);
	href.attr("target", "_blank");
	var img = $("<img>");
	img.attr("src", "/Images/Model/dwn_2.png");
	href.append(img);
	td.append(href);
	tr.append(td);
	td = $("<div></div>");
	td.addClass("div-td");
	href = $("<a></a>");
	href.append(window.popOutModelImgTextDownloadHere);
	href.attr("href", nowPic);
	href.attr("target", "_blank");
	td.append(href);
	tr.append(td);
	table.append(tr);
	Main.append(table);
	div = $("<div></div>");
	div.addClass("img_memo");
	var span = $("<span></span>");
	span.append(window.popOutModelImgTextImgMemo);
	div.append(span);
	Main.append(div);
	return Main;
}

function closeBlock() {
	$.unblockUI();
}
