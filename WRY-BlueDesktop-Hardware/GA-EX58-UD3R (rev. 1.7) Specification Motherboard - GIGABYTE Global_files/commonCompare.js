﻿var Setcompare = function (pid, name, img, url, check, classKey) {
	if (check) {
		setNewCompareItem(pid, name, img, url, classKey);

	} else {
		CancelNewCompareItem(pid, classKey);
	}
};

var CancelNewCompareItem = function (pid, classKey) {
	return;
	var tempPid = window.comparePids;
	window.comparePids = [];
	for (var j = 0; j < tempPid.length; j++) {
		if (parseInt(tempPid[j]) !== parseInt(pid)) {
			window.comparePids.push(parseInt(tempPid[j]));
		}
		if (j === tempPid.length - 1) {
			var tempModelListCompare = ModelListCompare;
			ModelListCompare = [];
			if (tempModelListCompare.length > 0) {
				for (var i = 0; i <= tempModelListCompare.length; i++) {


					if (tempModelListCompare[i] != undefined) {
						//console.log(parseInt(pid));
						if (parseInt(tempModelListCompare[i].modelId) !== parseInt(pid)) {
							ModelListCompare.push(tempModelListCompare[i]);
						}
					}

					if (i === tempModelListCompare.length - 1) {
						var cookieModelKeyName = "compareModelInfo" + classKey;

						CookieWithCountryCode.set(cookieModelKeyName, encodeURI(JSON.stringify(ModelListCompare)));

						var cookieKeyName = "compare" + classKey;
						CookieWithCountryCode.set(cookieKeyName, encodeURI(JSON.stringify(window.comparePids)));

						var comparemodel = $(".compare-model-item-" + pid);
						//remove item
						comparemodel.remove();
						var compareDivClick = $('.compare-model');
						var compareDivClickPushOutPosition = $(window).width() - compareDivClick.width();
						if (window.gbtGlobal && window.gbtGlobal.Razor) {
							if (window.gbtGlobal.Razor.IsRTL) {
								compareDivClick.css('right', compareDivClickPushOutPosition);
							}
							else {
								compareDivClick.css('left', compareDivClickPushOutPosition);
							}
						}

						//console.log(window.comparePids.length);
						if (window.comparePids.length == 0) {
							CookieWithCountryCode.set(cookieModelKeyName, encodeURI("[]"), 'undefined', -1);
							CookieWithCountryCode.set(cookieKeyName, encodeURI("[]"), 'undefined', -1);
							$(".compare-model").attr("id", "hideCompare");
							$("#hideCompare-model").css("display", "none");

							var compareArea = $(".compare-region");
							compareArea.hide();
							compareArea.find(".compare-model-list").html("");
							//change
							//$("#comparebox").prop("checked", false);
							$(".compare" + pid).prop("checked", false);
						}
					}
				}
			}
		}
	}


};

var setItemFunction = function (pid, name, img, url) {
	var comparemodel = $(".compare-model-list");
	//add item
	var div = $(".compare-model-temp").clone();
	div.find(".ImgItem").find("img").attr("src", img);
	//Neal 暫時取消破圖
	//div.find(".ImgItem").find("img").attr("onerror", "this.src = this.src.replace(/\.png/, '.jpg');");
	div.find(".clear-all").attr("onclick", "cancelItem(" + pid + ")");
	div.find(".model-name").append(name);
	div.find('.ModelUrl').attr('href', url);
	comparemodel.append(div.removeClass("hide").removeClass("compare-model-temp").addClass("compare-model-item-" + pid));
	if (window.comparePids.length == 1) {
		$(".compare-region").show();
		$(".compare-model").css("display", "");
		$(".compare-model").attr("id", "");
	}
	var compareDivClick = $('.compare-model');
	var compareDivClickPushOutPosition = $(window).width() - compareDivClick.width();
	if (window.gbtGlobal && window.gbtGlobal.Razor) {
		if (window.gbtGlobal.Razor.IsRTL) {
			compareDivClick.css('right', compareDivClickPushOutPosition);
		}
		else {
			compareDivClick.css('left', compareDivClickPushOutPosition);
		}
	}
}

var setNewCompareItem = function (pid, name, img, url, classKey) {
	return;
	if (window.comparePids.length < 5) {
		window.comparePids.push(parseInt(pid));
		var temp = {
			modelId: parseInt(pid),
			imgSrc: img,
			modelName: name,
			modelUrl: url
		};

		ModelListCompare.push(temp);

		var cookieName = "compareModelInfo" + classKey;
		CookieWithCountryCode.set(cookieName, encodeURI(JSON.stringify(ModelListCompare)));

		cookieName = "compare" + classKey;
		CookieWithCountryCode.set(cookieName, encodeURI(JSON.stringify(window.comparePids)));

		setItemFunction(pid, name, img, url);

	} else {
		//@* 判斷是否為IE *@
		//	var isBrower = {};
		//var ua = navigator.userAgent.toLowerCase();
		//var s;
		//(s = ua.match(/rv:([\d.]+)\) like gecko/))
		//	? isBrower.ie = s[1]
		//	: (s = ua.match(/msie ([\d.]+)/))
		//		? isBrower.ie = s[1]
		//		: (s = ua.match(/firefox\/([\d.]+)/))
		//			? isBrower.firefox = s[1]
		//			: (s = ua.match(/chrome\/([\d.]+)/))
		//				? isBrower.chrome = s[1]
		//				: (s = ua.match(/opera.([\d.]+)/))
		//					? isBrower.opera = s[1]
		//					: (s = ua.match(/version\/([\d.]+).*safari/)) ? isBrower.safari = s[1] : 0;


		var alertString = "You may only add up to 5 items for comparison at one time.";
		var d = document.createElement('div');
		d.innerHTML = alertString;

		function isIePushOut() {
			alert(d.innerHTML);
		}

		//change
		//if (typeof (isBrower.ie) !== "undefined") {
		if (typeof (window.isIE) !== "undefined") {
			isIePushOut();
			return true;
		}

		//change
		//var comparebox = $("#comparebox");
		var comparebox = $(".compare" + pid);
		comparebox.prop('checked', false);

		$('#basic-modal-content').modal();
		if ($(window).width() <= 960 && $("body").children(".Rwd").length != 0) {
			$(".simplemodal-container").css("width", "300px").css("left", ($(window).width() - 300) / 2 + "px")
				.css("height", "auto");
			$(".simplemodal-wrap").css("overflow", "visible");
		}

		$('#btn_msg_close').click(function () { $.modal.close(); });
		$('#simplemodal-overlay').click(function () { $.modal.close(); });
	}

}
var ModelListCompare = [];

var setDefaultCompare = function (classKey) {
	return;
	var cookieName = "compare" + classKey;
	var modelInfoCookieKey = 'compareModelInfo' + classKey;

	ModelListCompare = CookieWithCountryCode.get(modelInfoCookieKey) || "[]";
	ModelListCompare = JSON.parse(ModelListCompare);

	window.comparePids = CookieWithCountryCode.get(cookieName) || "[]";
	window.comparePids = JSON.parse(window.comparePids);
	if (window.comparePids.length > 0) {
		$(".compare-region").attr("id", "");
	}
	for (var i = 0; i < window.comparePids.length; i++) {
		//change
		//if (parseInt(window.comparePids[i]) === parseInt('@productInfo.ProductModelMainInfo.seq_product')) {
		//	$("#comparebox").prop("checked", true);
		//}
		$(".compare" + window.comparePids[i]).prop("checked", true);
		$(".compare" + window.comparePids[i]).parent().find(".checkboxSquare").addClass("checked");

		for (var j = 0; j < ModelListCompare.length; j++) {
			if (parseInt(window.comparePids[i]) === parseInt(ModelListCompare[j].modelId)) {
				setItemFunction(parseInt(ModelListCompare[j].modelId),
					ModelListCompare[j].modelName,
					ModelListCompare[j].imgSrc,
					ModelListCompare[j].modelUrl);
			}
		}
	}

	//@* Remove all cookie *@
	$("#clearallfunction").on('click',
		function () {
			window.comparePids = [];
			CookieWithCountryCode.set(cookieName, encodeURI("[]"), 'undefined', -1);
			CookieWithCountryCode.set(modelInfoCookieKey, encodeURI("[]"), 'undefined', -1);

			ModelListCompare = [];
			var compareArea = $(".compare-region");
			compareArea.hide();
			compareArea.find(".compare-model-list").html("");
			//change
			//$("#comparebox").prop("checked", false);
			$(".compareCheckBox").prop("checked", false);
			//for b2b List 取消客製打勾樣式
			$(".compareCheckBox").parents('label').find(".checkboxSquare").removeClass("checked");
		});

}