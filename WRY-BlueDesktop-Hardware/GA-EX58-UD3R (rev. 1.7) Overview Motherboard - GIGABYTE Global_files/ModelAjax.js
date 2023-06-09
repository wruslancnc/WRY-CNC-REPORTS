﻿//左側產品圖片滑動
var RwdWidth = 960;
$(function () {
	//一進畫面無Driver
	var showDropdownNoDriver = function () {
		var bios = $('.system-selector-div-BIOS');
		var utility = $('.system-selector-div-Utility');
		var audioLog = $('.system-selector-div-AudioLog');

		var driverCount = $('#driver-count').val();
		var utilityCount = $('#utility-count').val();
		var biosCount = $('#bios-count').val();
		var audioLogCount = $('#AudioLog-count').val();

		var getHash = location.hash;

		if (typeof (driverCount) === "undefined") {
			bios.show();
			setTimeout(function () {
				$('#bios-count').trigger('click');
			},
				200);
			if (bios.attr('class') === "undefined") {
				setShowWithOs("BIOS");
			}
		}
		if (typeof (driverCount) === "undefined" && typeof (biosCount) === "undefined" && getHash.indexOf("dl") > -1) {
			utility.css("display", "block");
			setTimeout(function () {
				$('#utility-count').trigger('click');
			},
				200);
		}
		if (typeof (biosCount) !== "undefined" && typeof (utilityCount) !== "undefined") {
			utility.hide();
			bios.hide();
			audioLog.hide();
		}
	}

	setflexslider($("#gallery-list-ul"));
	setflexslider($("#award-list-ul"));

	setFlexViewportMargin();
	showDropdownNoDriver();

	//flexslider action
    $(".section-top ").find('.prev').hover(function () {
		$(this).find('img').attr('src', "/Images/Model/pre888.png");
	}, function () {
		$(this).find('img').attr('src', "/Images/Model/pre888.png");
	}).on('click', function () {
		var taht = $(this).parent().parent().children(".flex-viewport");
		var li = taht.children("ul").children("li");
		var singleWid = li.eq(1).offset().left - li.eq(0).offset().left;
		var totalWid = taht.width();
		var item = Math.round(totalWid / (singleWid));
		if (item > 4) {
			item = 5;
		}
		var margin = taht.children("ul").css("margin-left").replace("px", "") / 1;
		if (margin == 0) {
			margin = li.eq(0).offset().left - li.eq(li.length - item).offset().left;
		} else {
			margin = margin + singleWid;
			if (margin + singleWid > 0) {
				margin = 0;
			}
		}
		taht.children("ul").animate({
			"margin-left": margin + "px"
		});

		//return false;
	});
    $(".section-top ").find('.next').hover(function () {
		$(this).find('img').attr('src', "/Images/Model/next888.png");
	}, function () {
		$(this).find('img').attr('src', "/Images/Model/next888.png");
	}).on('click', function () {
		var taht = $(this).parent().parent().children(".flex-viewport");
		var li = taht.children("ul").children("li");
		var singleWid = li.eq(1).offset().left - li.eq(0).offset().left;
		var width = li.width();
		var totalWid = taht.width();
		var item = Math.round(totalWid / (singleWid));
		if (item > 4) {
			item = 5;
		}
		var margin = taht.children("ul").css("margin-left").replace("px", "") / 1;
		if (Math.round(margin) == Math.round(li.eq(0).offset().left - li.eq(li.length - item).offset().left)) {
			margin = 0;
		} else {
			margin = margin - singleWid;
			if (-(margin - singleWid) > -(li.eq(0).offset().left - li.eq(li.length - item).offset().left)) {
				margin = li.eq(0).offset().left - li.eq(li.length - item).offset().left;

			}

		}
		taht.children("ul").animate({
			"margin-left": margin + "px"
		});
		//return false;
	});

	function setflexslider(obj) {
		if (obj.find("li").length >= 5) {
			var getRtl = $("#isRtl").val();
			obj.parent().flexslider(
				{
					animation: "slide",
					directionNav: false,
					controlNav: false,
					slideshow: false,
					animationLoop: true,
					itemWidth: 70,
					itemMargin: 25,
					rtl: (getRtl === "True") ? true : false
				}
			);


		} else if (obj.children("li").length > 0) {
			obj.parent().children('.div_b2_btn').addClass('hide');
		} else if ($('#gallery-list-ul li').length < 0) {
			obj.parent().hide();
		}
	};


	var domain = window.location.origin;
	if (!domain) {
		domain = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
	}
	var RazorUrlCountryCode = "";
	if (window.gbtGlobal && window.gbtGlobal.Razor) {
		RazorUrlCountryCode = window.gbtGlobal.Razor.UrlCountryCode;
	}
	var getSpecApiUrl = domain + RazorUrlCountryCode + "/api/ProductSpec/" + window.productId;
    //CheckPreviewId
	var useVue = window.useVue;

	if (window.location.hash) {
        if (window.location.hash === "#sp") {
            var postData = {
                IsCheckPreview: $("#IsCheckPreview").val() === "true"
            };
            $.getJSON(getSpecApiUrl, postData, function(data) {
				if (data != null) {
					if (useVue === "True") {
						callVueForSpecList(data);
					} else {
						callJqueryForIe8SpecList(data);
					}
					//只有一個沿用舊 CSS && HTML dom
					if (data.SubProductCount <= 1) {
						//return false;
						var count =  $(".all-Products").find('.specRow').length;
						var list = $(".sp-section").append('<ul class="display-table"></ul>').find('.display-table');
						if (count > 0) {
							var cssClassName = data.BackgroundType === 0
								? ""
								: " black";
							for (var i = 0; i < count; i++) {
								var specText = $(".all-Spec").find('.row_' + i).find(".specText");
								if (specText.text() !== '') {
									var title = $("<div></div>").addClass("display-table-cell item").append(specText);
									var productText = $(".all-Products").find('.row_' + i).find(".specText");
									var contect = $("<div></div>").addClass("display-table-cell").append(productText);
									var row = $("<li></li>").addClass("display-table-row" + cssClassName).append(title).append(contect);
									list.append(row);
								}
							}
							$(".all-Spec").remove();
							$(".all-Products").remove();
						}
						//有多子項使用使用Slider
					} else {
						$(".sp-section").addClass("useOwlCarousel");
						var getRtl = $("#isRtl").val();
						$( ".owl-area" ).addClass("owl-carousel owl-theme");
						$('.owl-carousel').owlCarousel({
							rtl: (getRtl === "True") ? true : false,
							margin: 2,
							nav: true,
							dotsEach: true,
							items: 1,
							navText: ['<img src="/Images/pre_btn_spec.png" >', '<img src="/Images/next_btn_spec.png" >'],
							responsive: {
								1000: {
									items: (data.ProductSpecList.length < 2) ? 1 : 2
								}
							},
							mouseDrag: false
						});
						fixeSpecRowHigh();
					}
							
				}
			});
		}
	}

	//呼叫faq vue by neal 2018/9/10
	if (window.useVue === "True")
	{
		callVueForFaqList(window.faqListJson);
	}
});

//BlockUI For Multimedia Wallpaper Download
$(function () {
	//Block UI 按鈕 for Wallpaper Download
	$("div[id='WDButton']").click(function () {
		var choictItem = $(this).attr('name');
		var width = "30%";
		var left = "35%";
		var top = '40%';
		if ($(window).width() <= RwdWidth) {
			width = "90%";
			left = "5%";
			top = "15%";
		}
		$.blockUI({
			message: $('#' + choictItem),
			css: {
				top: top,
				left: left,
				width: width,
				cursor: 'auto'
			}
		});
		// update the block message
		//$.blockUI({ message: "<h1>Remote call in progress...</h1>" });
	});
	//Open按鈕 for Wallpaper Download 選取畫素
	$(":button[id='WDOpen']").click(function () {
		var choictOpenItem = $(this).attr('name');
		var sel = $('.' + choictOpenItem).val();
		if (sel != "") {
			window.open(sel, "", "toolbar=0,location=0,directories=0,status=0,menubar=1,scrollbars=1,resizable=1");
		}
	});
});
//getScrollBar For Ajax 讀檔後
var getScrollBar = function () {
	var isScrollTo = $('#isScrollTo').val();

	if (isScrollTo === "2") {
		//$('#scrollBar').css("display", "block");
		var ovItemCount = $("li[class='ov-item  cancelPadding']").size();
		var ovItemButtomCount = $("li[name='ov-item-Button']").size();
		//避免連點重覆產生
		if (ovItemButtomCount < ovItemCount) {

			for (var i = 0; i < ovItemCount; i++) {

				var shortTitle = $("div[name='ov-item-short-title-" + i + "']").text();
				$("<li/>", {
					"id": "ov-item-Button-" + i,
					"name": "ov-item-Button",
					"class": "ov-item-Button",
					"checkScroll": "ov-item-" + i,
					"shortTitle": shortTitle
					//"text": "Scroll"
				}).appendTo("#scrollTo");
			}
			$("li[class='ov-item-Button']").click(function () {
				var scrollButton = $(this).attr('checkScroll');
				$('html,body').animate({ scrollTop: $("li[name='" + scrollButton + "']").offset().top }, 800);
			});

			$("li[name='ov-item-Button']").each(function () {
				var getTitle = $(this).attr('shorttitle');
				$("<h1/>", {
					"class": "ov-item-shortTitle"
				}).appendTo($(this));
				$("<span/>", {
					"class": "ov-item-shortTitle-span"
				}).appendTo($(this).find(".ov-item-shortTitle"));
				$(this).find(".ov-item-shortTitle-span").text(getTitle);
				$("<div/>", {
					"class": "ov-item-Box"
				}).appendTo($(this));
			});
			$("li[name='ov-item-Button']").hover(function () {
				$(this).find(".ov-item-shortTitle").fadeIn();
			});

			$("li[name='ov-item-Button']").mouseout(function () {
				$(this).find(".ov-item-shortTitle").fadeOut();
			});
		}

	}
}
//淡入淡出
var fixedHeaderForScroll = function () {

	$(window).scroll(function () {
		var getcontentType = $('#contentType').val();
		//alert(getcontentType);
		var s = $(window).scrollTop();

		var modelHeader = $('#model-header');
		var intHeight = modelHeader.next().offset().top - modelHeader.offset().top;
		if (s > 0 && s >= modelHeader.offset().top) {
			if ($("#header-bar").width() > 960 && !modelHeader.hasClass('model-header-fixed')) {
				modelHeader.next().css("margin-top", "120px");
				setFooterPosition(120);
			}

			modelHeader.addClass('model-header-fixed');
			setTimeout(function () {
				modelHeader.addClass('model-header-fixed-show');
				//console.log(getcontentType);
				if (getcontentType === "ov") {
					getScrollBar();
					$('#scrollBar').fadeIn();
				}
			}, 1);
		} else {
			modelHeader.next().css("margin-top", "");
			$('#scrollBar').fadeOut();
		}
	});

};

fixedHeaderForScroll();
		
var setGallerySetData = function(){
	if(window.location.hash === "#gallery"){
		if(CheckUseRWDsizeNow()){
			var itemsPics = $("#gallery-list-mobile").find("img.b-lazy:not([data-src=''])");						
			itemsPics.each(function(){						
				var thatPic = $(this);
				thatPic.attr("src",thatPic.attr("data-src"));
				thatPic.attr("data-src","");
			});
		}else{
			var galleryIframe = $("#PCGallery:not([data-src=''])");
			if(galleryIframe.length === 1){
				window.iframeLoadedFun = setInterval(iframeLoaded, 200);									
				galleryIframe.attr("src",galleryIframe.attr("data-src"));
				galleryIframe.attr("data-src","");
			}
		}	
	}
}

$(function () {
	var MemoList = $('.Memos');
	var counts = MemoList.length;
	for (var i = 0; i < counts; i++) {
		var $span = $($($('.Memos')[i]));
		var Str = $span.html() === null ? "" : $span.html();
		if (Str.length > 300) {
			$span.html(getSubString(Str, 295));
		}
	}
});

function getSubString(getDecodeString, maxNumber) {
	var split = getDecodeString.split(" ");
	var totalLong = 0;
	var subString = "";

	for (var i = 0; i < split.length; i++) {
		var getLong = split[i].length;

		totalLong = totalLong + getLong;

		if (totalLong > maxNumber) {
			return subString + "...";
		} else {
			subString = subString + split[i] + " ";
		}
	}
}