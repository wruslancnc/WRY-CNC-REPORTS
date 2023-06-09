﻿var setRwdMenuSlider = function (divOwlMenu, divParent, divChild) {
	setRwdMenuSliderAction(divOwlMenu, divParent, divChild);
	window.addEventListener("orientationchange", function () {
		setTimeout(function () {
			setRwdMenuSliderAction(divOwlMenu, divParent, divChild);
		}, 500);
	});
}
var setRwdMenuSliderAction = function (divOwlMenu, divParent, divChild) {
	if (typeof (divOwlMenu) === 'undefined') {
		divOwlMenu = 'owl-carousel-menu';
	}
	if (typeof (divParent) === 'undefined') {
		divParent = 'MenuHaveRWDSlider';
	}
	if (typeof (divChild) === 'undefined') {
		divChild = 'itemArea';
	}
	var owlCarouselArea = $("." + divParent).find("#" + divChild);
	if (!CheckWebsiteUnder960()) {
		destroyOwlCarousel(divOwlMenu, owlCarouselArea);
		$("." + divParent).removeClass("hidden");
		return false;
	}
	var menuItem = owlCarouselArea.find(".menu-Item");
	var index = 0;
	menuItem.each(function () {
		if ($(this).hasClass("isSelected")) {
			index = $(".menu-Item").index(this);
		}
		//if (isNeedBaseWidth) {
		//	var width = parseInt($(this).find(".menu-Text").width());
		//	if ($(this).find(".menu-Icon").length) {
		//		width = width + parseInt($(this).find(".menu-Icon").width());
		//	}
		//	$(this).width(width + 20);
		//}
	});
	owlCarouselArea.addClass('owl-carousel');
	owlCarouselArea.addClass(divOwlMenu);
	var owlMenu = $('.' + divOwlMenu);
	if (owlMenu.length && owlMenu.attr("class").indexOf(".owl-loaded") < 0) {
		var RazorIsRTL = false;
		if (window.gbtGlobal && window.gbtGlobal.Razor) {
			RazorIsRTL = window.gbtGlobal.Razor.IsRTL;
		}
		owlMenu.owlCarousel({
			rtl: RazorIsRTL,
			loop: false,
			responsiveClass: true,
			dots: false,
			autoWidth: true,
			responsive: {
				0: {
					slideBy: 4,
					items: 4
				},
			}
		});
		owlMenu.find(".owl-stage").addClass("owlCss");
		owlMenu.find(".owl-stage").css("min-width", owlMenu.find(".owl-stage").outerWidth(true) + 10); //避免 SliderMenu 寬度不夠折行
		//owlMenu.find(".owl-stage").css("min-width", 1000);
		//owlMenu.find(".owl-stage").css("padding-top", "3.5%");
		//owlMenu.find(".owl-stage").css("padding-bottom", "3.5%");

		if (index > 0) {
			owlMenu.trigger('to.owl.carousel', index - 1);
		}
		//取消手機版一開始消失，往上滑才出現功能，避免誤以為是Bug
		//setRwdMenuScrollHide();
	}
}

var setRwdMenuScrollHide = function () {
	var postition = 0, lastTimnePostition = 0;
	var changeToScrollUp = 0, changeToScrollDown = 0;
	var action = '';
	var scrollValueToHide = 100;

	$(window).scroll(function () {
		if (CheckWebsiteUnder960()) {
			postition = $(this).scrollTop();
			if (lastTimnePostition < postition) {//下滚  
				if (action === "scrollUp") {
					changeToScrollDown = postition;
				}
				action = "scrollDown";
				var scrollDownValue = postition - changeToScrollDown;
				if (scrollDownValue > scrollValueToHide) {
					//$(".unfoldSearchInput") Solution/Industry 新版手機板搜尋功能，展開後避免 iphone 鍵盤往上推改變高度導致搜尋輸入框消失
					if (parseInt($('.MenuHaveRWDSlider').css("opacity")) === 1 && !$(".unfoldSearchInput").length) {
						$(".MenuHaveRWDSlider").removeClass("visible");
						$(".MenuHaveRWDSlider").addClass("hidden");
					}
					//$(".test").text('down, scroll: ' + postition + ', toDown: ' + scrollDownValue);
				}
			}
			else {//上滚  
				if (action === "scrollDown") {
					changeToScrollUp = postition;
				}
				action = "scrollUp";
				var scrollUpValue = changeToScrollUp - postition;
				if (scrollUpValue > scrollValueToHide) {
					if (parseInt($('.MenuHaveRWDSlider').css("opacity")) === 0) {
						$(".MenuHaveRWDSlider").removeClass('hidden');
						$(".MenuHaveRWDSlider").addClass('visible');
					}
					//$(".test").text('up, scroll: ' + postition + ', toUp: ' + scrollUpValue);
				}
			}
			lastTimnePostition = postition;
		}
	});
}

var destroyOwlCarousel = function (divOwlMenu, owlCarouselArea) {
	var owl = $('.' + divOwlMenu);
	if (owlCarouselArea && owl.length) {
		owl.trigger('destroy.owl.carousel');
		owlCarouselArea.removeClass('owl-carousel');
		owlCarouselArea.removeClass(divOwlMenu);;
	}
}

var getListDivMaxHigh = function (parentDiv, childDiv) {
	var maxImgHeight = Math.max.apply(null, $("." + parentDiv).find("." + childDiv).map(function () {
		return $(this).height();
    }).get());
	return maxImgHeight;
}

var getListDivMaxWidth = function (parentDiv, childDiv) {
	var maxAreaWidth = Math.max.apply(null, $("." + parentDiv).find("." + childDiv).map(function () {
		return $(this).width();
	}).get());
	return maxAreaWidth;
}

var TriggerGoTopAndHide = function (header, isUseOpacity) {

	$('#divGoTop').on('click', function () {
		goTop();
	});

	$(window).scroll(function () {
		var s = $(window).scrollTop();
		var goTopBtn = $('#divGoTop');
		var modelHeader = typeof (header) === 'undefined'
			? $('.Content-TopArea')
			: header;

		var useOpacity = typeof (isUseOpacity) === 'undefined'
			? false
			: isUseOpacity;

		if (s > 0 && s >= modelHeader.offset().top) {
			setTimeout(function () {
				if (useOpacity) {
					goTopBtn.addClass("fadeInOpacity");
				} else {
					//console.log("fadeIN");
					goTopBtn.fadeIn();
				}
			}, 1);
		} else {
			if (useOpacity) {
				goTopBtn.removeClass("fadeInOpacity");
			} else {
				//console.log("fadeOut");
				goTopBtn.fadeOut();
			}
		}
	});
};

var setHighByParentChildDiv = function (parent, child, isUseOnMobile) {
	var childDiv = $("." + parent).find("." + child);
	if (childDiv.length) {
		childDiv.each(function () {
			$(this).css("height", "auto");
		});
		var isSetHigh = true;
		//Glossary 手機板不算高度
		if (!isUseOnMobile && CheckWebsiteUnder960()) {
			isSetHigh = false;
		}
		if (isSetHigh) {
			var maxHigh = getListDivMaxHigh(parent, child);
			if (parent === "childItem-Product" && child ==="sectionChild-img") {
				//console.log(maxHigh);
			}
			childDiv.each(function () {
				$(this).height(maxHigh);
			});
		}
	}
}

var setListPagingHideDesktop = function () {
	var className = "PagingArea";
	var childDiv = $("." + className).find(".PagingItem");
	var thisPage = $("." + className).find(".thisPage").attr("data-index");
	const currentPageNum = parseInt(thisPage);
	const showPageWithin = CheckWebsiteUnder960() ? 1 : 2;
    if (typeof (thisPage) !== "undefined") {
		childDiv.each(function () {
            $(this).removeClass("hidePage");
        });
        childDiv.each(function () {
            var itemIndex = $(this).attr("data-index");
            if (typeof (itemIndex) !== "undefined") {
                itemIndex = parseInt(itemIndex);
				if (shouldShowPage(showPageWithin, itemIndex)) {
                    const linkObj = $(this).find("a");
					linkObj.text(itemIndex);
                    linkObj.removeClass("noClick");
                    return;
                }
				if (shouldShowDot(showPageWithin, itemIndex)) {
                    const linkObj = $(this).find("a");
                    linkObj.text("...");
                    linkObj.addClass("noClick");
                    return;
                }
                $(this).addClass("hidePage");
            }
        });
	}
	/**
	 * 判斷該按鈕為以下條件則顯示數字
	 * 1. 在與設定需顯示分頁數字範圍內
	 * 2. 最後一頁
	 * 3. 第一頁
	 * @param {number} within 需顯示分頁數字的範圍
	 * @param {number} itemIndex 分頁按鈕 index
	 */
	function shouldShowPage(within, itemIndex) {
		return Math.abs(currentPageNum - itemIndex) <= within || itemIndex === childDiv.length || itemIndex === 1;
	}

	/**
	 * 	判斷超過顯示分頁數字範圍的前/後一個按鈕需顯示為 '...'
	 * @param {number} within 需顯示分頁數字的範圍
	 * @param {number} itemIndex 分頁按鈕 index
	 */
	function shouldShowDot(within, itemIndex) {
		return Math.abs(currentPageNum - itemIndex) === within + 1;
	}
}

var setQueryStringByName = function (url, qs) {
	var result = "";
	if (typeof (url) !== "undefined") {
		var urls = url.split("?");
		if (urls.length > 1) {
			var arrQuery = urls[1].split('&');
			for (var i = 0; i < arrQuery.length; i++) {
				var query = arrQuery[i].split('=');
				if (query[0] === qs) {
					result = query[1];
				}

			}
		}
	}
	return result;
}

var ReplaceLinkTag = {
	isSetGaCode : false,
	set: function (obj, url, gaCodeCategory, gaCodeEvent, thisIndex) {
		obj.attr("href", url);
		if (this.isSetGaCode) {
			var gaCode = "SendGaEvent('" + gaCodeCategory + "', '" + gaCodeEvent + "', location.pathname + location.search);";
			obj.attr('onclick', gaCode);
		}
		if (thisIndex) {
			obj.attr("title", thisIndex);
		}
	},
	clean: function (obj, isCleanTitle) {
		obj.attr("href", "javascript:void(0);");
		if (this.isSetGaCode) {
			obj.removeAttr("onclick");
		}
		if (typeof (isCleanTitle) === 'undefined') {
			isCleanTitle = false;
		}
		if (isCleanTitle) {
			obj.removeAttr("title");
		}
	},
}

var setUrlRemovePageQueryString = function (url, qs) {
	var result = url;
	if (typeof (url) !== "undefined") {
		var urls = url.split("?");
		if (urls.length > 1) {
			var arrQuery = urls[1].split('&');
			var arrQueryRemove = [];
			for (var i = 0; i < arrQuery.length; i++) {
				var query = arrQuery[i].split('=');
				if (query[0] !== qs) {
					arrQueryRemove.push(arrQuery[i]);
				}
			}
			if (arrQueryRemove.length > 0) {
				result = urls[0] + "?";
				result = result + arrQueryRemove.join("&");
			} else {
				result = urls[0];
			}
		}
	}
	return result;
}