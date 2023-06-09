﻿var BaseDropdownInit = function() {
	/*
	 * 下拉選單
	 *
	 * 1. 點擊需與藏起來的　Selector 連動
	 * 2. RWD 需重算展開高度
	 */
	window.defaultHeight = [];
	//window.defaultWidth = [];
	//display none 將沒有起始高度，須先把高度記錄下來
	var getDefaultHeight = function (thisObj) {
		//先歸零，避免時間差給錯
		window.defaultHeight = [];
		window.defaultWidth = [];
		$(".defaultDropdown").each(function (index) {
			var element = $(this).clone();
			//console.log("set first window.defaultWidth:" + $(this).find(".default-SelectItem").outerWidth(true));
			element.css({ visibility: 'hidden' });
			$('body').append(element);
			//console.log("set window.defaultHeight:" + element.find(".default-SelectItem").outerHeight(true));
			//console.log("set window.defaultWidth:" + element.find(".default-SelectItem").outerWidth(true));
			window.defaultHeight.push(element.find(".default-SelectItem").outerHeight(true));
			//window.defaultWidth.push(element.find(".default-SelectItem").outerWidth(true));
			element.remove();
		});
	};
	getDefaultHeight();

    // 算出展開的高度
	var getFadeOutHeight = function(thisObj) {
		var height = thisObj.find(".default-Option").outerHeight(true);
		thisObj.find(".default-Option").each(function(index) {
            if (!$(this).hasClass("hide-option")) {
                height = height + $(this).outerHeight(true);
            } else {
                $(this).addClass("only-width");
            }
        });

		height = height < $(".default-Option").outerHeight(true)
			? $(".default-Option").outerHeight(true)
			: height;

		return height;
	};

	// RWD 的時候重算展開高度
	var setDefaultCustomizeDropdownWidthRwd = function (thisObj, index) {
		var selectItem = thisObj.find(".default-SelectItem");
		const height = thisObj.hasClass("fadeOut")
			? getFadeOutHeight(thisObj)
			: window.defaultHeight[index];
		//console.log("window.defaultHeight[index]:" + window.defaultHeight[index]);
		//console.log(height);
		thisObj.height(height);
		var hideSelectDom = thisObj.parents(".defaultDropdown").find(".default-HideSelectDom");
		hideSelectDom.height(thisObj.outerHeight(true));
		//大小版不算避免給錯寬度，小版用CSS 100%去對
		if (CheckWebsiteUnder960()) {
			//var width = selectItem.width() === 0 ? window.defaultWidth[index] : selectItem.width();
			//hideSelectDom.width(window.defaultWidth[index]);
		}
		//$(".default-HideSelectDom").width($(".default-SelectItem").width());
	};

	// 點擊下拉狀態後再收回處理
	var backToFadeInd = function (thisObj, index) {
		var height = thisObj.find(".default-Option").outerHeight(true) === 0
			? window.defaultHeight[index]
			: thisObj.find(".default-Option").outerHeight(true);

		thisObj.height(height);
		thisObj.removeClass("fadeOut");
		thisObj.find(".defaultDropdownArrowIcon").removeClass("rotate180");
	}

	// Promise避免時間差還沒算完就set 高度
	var setDefaultWidthHeightUsingPromise = function (thisObj, index) {
		try {
			Promise.all([getDefaultHeight()]).then(function () {
				$(".default-ShowSelector").each(function (index) {
					if ($(this).hasClass("fadeOut")) {
						backToFadeInd($(this), index);
					}
					setDefaultCustomizeDropdownWidthRwd($(this), index);
					$(".default-ShowSelector").css("opacity", "1");
				});
			}).catch(function (err) {

			});
		} catch (ex) {
		}
	}

	//客製下拉選單 Init 
	//因為要先算高度，避免畫面一開始展開在收折，預設先藏起來
	setTimeout(function () {
			setDefaultWidthHeightUsingPromise();
		},
	300);

	//假的下拉選單項目點選後，藏起來的 Selector trigger 點選的項目
	$(".default-Option").off("click").click(function () {
        var parents = $(this).parents(".defaultDropdown");
		parents.find(".default-SelectItem").find(".default-SelectedShowText").text($(this).text());
		const selectOptionDataId = $(this).attr("data-value");
		const selectCheckName = parents.find(".default-ShowSelector").attr("data-SelectName");
		const selectHideSelectDom = parents.find(".default-HideSelectDom[data-selectName='" + selectCheckName+"']");
		selectHideSelectDom.val(selectOptionDataId).change();

		$(this).closest('.defaultDropdown').find(".default-Option").removeClass("hide-option");
        $(this).addClass("hide-option");
    });
	$(".defaultDropdown").each(function () {
		const firstOption = $(this).find(".default-Option").eq(0);
		$(this).find(".default-SelectItem").find(".default-SelectedShowText").text(firstOption.text());
		firstOption.addClass("hide-option");
    })

	// 小版selector 選擇後連動假的下拉選單項目
	$(".default-HideSelectDom").change(function() {
		const selectCheckName = $(this).attr("data-selectName");
		const selectShowSelector = $(this).parents(".defaultDropdown").find(".default-ShowSelector[data-selectName='" + selectCheckName+"']");
		selectShowSelector.find(".default-SelectedShowText")
			.text($(this).find("option:selected").text());
	});

    // click 假的Selector 點擊展開後動作並且箭頭轉向
	$(".default-ShowSelector").off("click").click(function () {
		if (CheckWebsiteUnder960()) {
			return false;
		}
        $(this).find(".default-Option").removeClass("only-width");
		const height = getFadeOutHeight($(this));

		if ($(this).hasClass("fadeOut")) {
			backToFadeInd($(this), $(this).index());
		} else {
			$(this).height(height);
			$(this).addClass("fadeOut");
			$(this).find(".defaultDropdownArrowIcon").addClass("rotate180");
		}
	});

    // RWD 的時候重算展開高度，Promise避免時間差還沒算完就set 高度
	$(window).resize(function () {
		setDefaultWidthHeightUsingPromise();
	});
};