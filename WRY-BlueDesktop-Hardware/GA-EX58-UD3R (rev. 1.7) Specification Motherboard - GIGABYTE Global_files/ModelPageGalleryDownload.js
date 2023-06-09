﻿//此檔案部分程式與Enterprise Model page 相似，同步確認 Enterprise Model page Gallery
var errorDefaultImagePath = "/Images/Default/white_1200x630.png";
//LazyLoad 
var lazyLoadInstance = new LazyLoad({
	elements_selector: ".lazyLoad-ModelPage",
	threshold: 0,
	callback_loaded: function (el) {
	},
	callback_error: function (el) {
		//console.log($(el));
		if (typeof (el) !== "undefined") {
			var errorItem = $(el).parents(".ContentItem ");
			if (typeof (errorItem) !== "undefined") {
				errorItem.find(".ContentItemImage").attr("src", errorDefaultImagePath);
				errorItem.find(".lazyLoad-ModelPage").attr("srcset", errorDefaultImagePath);
			}
		}
	},
});

$(function () {
	window.isHave360Icon = $(".product-360-degree").length;
	setZipFileDownload();

    //產品圖片：預設 Default youtube player
    setDefaultYoutubeVideo();
	//LazyLoad
	lazyLoadInstance.update();
	//產品圖片：產品小圖列設定 OwlCarousel
	setOwlCarouselSlider($("#gallery-list-slider"));
	//產品圖片(360IconS) ：RWD 更新Slider - 更換圖片處理:手機板不需要360ICON
	set360IconSliderRwd();
});

//產品圖片(3DModel) ：RWD 更新Slider
var set360IconSliderRwd = function () {
	if (window.isHave360Icon) {
		window.owlItemFirstItem = $("#gallery-list-slider").find(".owl-item").eq(0).html();
		$(window).resize(function () {
			setModelPageSliderRwdActionRemoveFirst();
		});

		window.addEventListener("orientationchange", function () {
			setTimeout(function () {
				setModelPageSliderRwdActionRemoveFirst();
			}, 500);
		});
	}
};

//產品圖片(3DModel) ：RWD 更新Slider - 更換圖片處理
var setModelPageSliderRwdActionRemoveFirst = function () {
	var galleryItem = $("#gallery-list-slider");
	var isHaveRemoveItem = galleryItem.find(".owl-item").find(".product-360-degree").length;
	if (CheckWebsiteUnder960()) {
		if (isHaveRemoveItem) {
			$(".MobileImageCount").find(".totalCount").text(window.sliderTotalImgCount - 1);
			galleryItem.trigger('remove.owl.carousel', 0).trigger('refresh.owl.carousel');
		}
	} else {
		if (!isHaveRemoveItem) {
			galleryItem
				.trigger('add.owl.carousel', [window.owlItemFirstItem, 0])
				.trigger('refresh.owl.carousel');
			lazyLoadInstance.update();
		}
	}
};

//產品圖片：產品小圖列設定 OwlCarousel
var setOwlCarouselSlider = function (obj) {
	var limitShow = !CheckUseRWDsizeNow(1024) ? 5 : 3;
	obj.addClass("owl-carousel");
	var RazorIsRTL = false;
	if (window.gbtGlobal && window.gbtGlobal.Razor) {
		RazorIsRTL = window.gbtGlobal.Razor.IsRTL;
	}
	obj.owlCarousel({
		rtl: RazorIsRTL,
		//slideBy: 1,
		dotsEach: 1,
		onChanged: callbackDisableOwlCarouselSliderArrow,
		onInitialized: callbackDisableOwlCarouselSliderArrow,
		responsive: {
			0: {
				//stagePadding: 15,
				//margin: 10,
				items: 1
			},
			961: {
				//margin: 10,
				//stagePadding: 10,
				items: 3
			},
			1280: {
				items: 4
			},
			1680: {
				items: limitShow
			}
		}
	});

	$('.preItem').click(function () {
		obj.trigger('prev.owl.carousel');
	});
	$('.nextItem').click(function () {
		obj.trigger('next.owl.carousel');
	});
};

//產品圖片：產品小圖 Slider: 左右兩側箭頭反灰不能點判斷處理 
var callbackDisableOwlCarouselSliderArrow = function (event) {
	var item = event.page.index;
	setTimeout(function () {
		if ($(".owl-dots").hasClass("disabled")) {
			$(".owlButton").hide();
		} else {
			$(".owlButton").show();
		}
	},
		100);
	if (item === -1) {
		$('.preItem').addClass("disable");
		return false;
	}
	$(".MobileImageCount").find(".nowIndex").text(event.item.index + 1);
	if (event.page.count > 1) {
		$(".owlButton").show();
	}
	if (item === event.page.count - 1) {
		$('.nextItem').addClass("disable");
	} else {
		$('.nextItem').removeClass("disable");
	}

	if (item === 0) {
		$('.preItem').addClass("disable");
	} else {
		$('.preItem').removeClass("disable");
	}
}

var setDefaultYoutubeVideo = function () {
    var firstImageYoutubeUrl = $(".downloadImageItem").eq(0).attr("data-youtubeplayurl");
    if (typeof (firstImageYoutubeUrl) !== 'undefined' && firstImageYoutubeUrl !== '' && typeof (ConvertYoutubeCodeBy) !== 'undefined') {
        var selectedYoutubeVideoId = ConvertYoutubeCodeBy(firstImageYoutubeUrl);
		if (selectedYoutubeVideoId !== "") {
            $(".selectImageGallery").hide();
            var defaultImage = $(".GalleryPopOut-DefaultImage");
            var embedUrl = "https://www.youtube.com/embed/" + selectedYoutubeVideoId + "?autoplay=1&mute=1&rel=0";
            if (!defaultImage.find(".youtubeChild").length) {
                defaultImage.find(".youtubeParent").prepend("<iframe class='youtubeChild' src='" + embedUrl + "' frameborder='0' allowfullscreen></iframe>");
                defaultImage.find(".youtubeParent").show();
            }
        }
    }
}

var setZipFileDownload = function () {
	$(".downloadImageItem").each(function (index, value) {
		var youtubePlayUrl = $(this).attr("data-YoutubePlayUrl");
		if (youtubePlayUrl !== "") {
			var selectedYoutubeVideoId = ConvertYoutubeCodeBy(youtubePlayUrl);
			if (selectedYoutubeVideoId === "") {
				$(this).addClass("hide");
			}
		}
	});
	$(".downloadImageItem").off('click').click(function () {
		$(".downloadImageItem").removeClass("selected");
		$(this).addClass("selected");
		var youtubePlayUrl = $(this).attr("data-YoutubePlayUrl");
		if (youtubePlayUrl !== "") {
			var selectedYoutubeVideoId = ConvertYoutubeCodeBy(youtubePlayUrl);
			if (selectedYoutubeVideoId !== "") {
				$(".selectImageGallery").hide();
				$(".selectVideoGallery").show();
				var defaultImage = $(".GalleryPopOut-DefaultImage");
				//var nowYoutubeVideoId = defaultImage.find(".youtubeParent").attr("data-nowYoutubeVideoId");
				//if (typeof (nowYoutubeVideoId) === "undefined") {
				//	defaultImage.find(".youtubeParent").attr("data-nowYoutubeVideoId", selectedYoutubeVideoId);
				//}
				var embedUrl = "https://www.youtube.com/embed/" + selectedYoutubeVideoId + "?autoplay=1&mute=1&rel=0";
				if (!defaultImage.find(".youtubeChild").length) {
					defaultImage.find(".youtubeParent").prepend("<iframe class='youtubeChild' src='" + embedUrl + "' frameborder='0' allowfullscreen></iframe>");
					defaultImage.find(".youtubeParent").show();
				}
				else //if (nowYoutubeVideoId !== selectedYoutubeVideoId) 
				{
					defaultImage.find(".youtubeChild").attr("src", embedUrl);
					defaultImage.find(".youtubeParent").attr("data-nowYoutubeVideoId", selectedYoutubeVideoId);
				}
			}
		}
		else {
			$(".selectImageGallery").show();
			$(".selectVideoGallery").hide();
			var bigImagePath = $(this).attr("data-big");
			if (typeof (bigImagePath) !== "undefined") {
				setGalleryPopOutDefaultImage(bigImagePath);
			}
		}
	});
	$(".downloadImageCheckBox").off('click').click(function (e) {
		e.stopPropagation();
	});

    var setSelectAllOrCancelButton = function () {
        var totalCheckBox = $(".downloadImageCheckBoxItem").length;
        var selectItemCount = $(".downloadImageCheckBoxItem:checked").length;
        //已全選，顯示 Cancel All，隱藏 Select All
        if (selectItemCount === totalCheckBox) {
            $(".buttonDownloadSelect").fadeOut("fast", function () {
                $(".buttonDownloadCancel").fadeIn();
            });
            //全不選，顯示 Select All，隱藏 Cancel All
        } else if (selectItemCount === 0) {
            $(".buttonDownloadCancel").fadeOut("fast",
                function () {
                    $(".buttonDownloadSelect").fadeIn();
                });
            //部分選，顯示Cancel All/Select All
        } else if (selectItemCount > 0 && selectItemCount < totalCheckBox) {
            $(".buttonDownloadCancel").fadeIn();
            $(".buttonDownloadSelect").fadeIn();
        }
    };

    var countCheckItem = 0;
	//window.isClickSelectAll 避免 SelectAll trigger 多次  $('.downloadImageCheckBox').change 導致淡入淡出時間點異常
    $('.downloadImageCheckBox').change(function () {
		if (window.isClickSelectAll) {
			countCheckItem++;
			//目前的 CheckBox change = 多少個還未被勾選的 => 代表 SelectAll 的最後一個 CheckBox change
			if (countCheckItem === window.noCheckedCount) {
                setSelectAllOrCancelButton();
                window.isClickSelectAll = false;
				countCheckItem = window.noCheckedCount = 0;
            }
        } else {
            setSelectAllOrCancelButton();
        }
    });

	$(".buttonDownLoadSelectAll").off('click').click(function () {
		window.isClickSelectAll = true;
		var checkBoxItem = $(".downloadImageCheckBoxItem:not(:checked)"); 
		window.noCheckedCount = checkBoxItem.length;
		checkBoxItem.trigger("click");
		checkBoxItem.attr('checked', true);
		checkBoxItem.attr('checked', $(this).attr('checked'));
    });
	$(".buttonDownLoadCancelAll").off('click').click(function () {
        window.isClickSelectAll = true;
		var checkBoxItem = $(".downloadImageCheckBoxItem:checked");
        window.noCheckedCount = checkBoxItem.length;
		checkBoxItem.trigger("click");
		checkBoxItem.attr('checked', false);
		checkBoxItem.attr('checked', $(this).attr(''));
    });
	$(".buttonDownLoadZipFile").off('click').click(function () {
		var links = [];
		$(".downloadImageCheckBoxItem:checked").each(function () {
			var imageLink = $(this).parents(".downloadImageItem").attr("data-big");
			links.push(imageLink);
		});
		var zip = new JSZip();
		var count = 0;
		var zipFilename = window.productName + "-picture.zip";
		links.forEach(function (url, i) {
			//var filename = links[i];
			var nameIndex = i + 1;
			nameIndex = nameIndex > 9 ? nameIndex : "0" + nameIndex;
			var filename = window.productName + "-" + nameIndex + ".png";
			// loading a file and add it in a zip file
			window.JSZipUtils.getBinaryContent(url, function (err, data) {
				if (err) {
					throw err; // or handle the error
				}
				zip.file(filename, data, {
					binary: true
				});
				count++;
				if (count == links.length) {
					zip.generateAsync({
						type: 'blob'
					}).then(function (content) {
						window.saveAs(content, zipFilename);
						var gaAction = "[" + "@galleryDownloadGaEventAction" + "]Gallery Download";
						SendGaEvent("ModelPage", gaAction, location.pathname + location.search);
					});
				}
			});
		});
	});
};

var setGalleryPopOutDefaultImage = function (bigImagePath) {
	var picture = $(".GalleryPopOut-DefaultImage").find("picture");
	picture.find("source").attr("data-srcset", bigImagePath.replace("/png/", "/webp/"));
	picture.find("source").attr("srcset", bigImagePath.replace("/png/", "/webp/"));
	picture.find("img").attr("data-src", bigImagePath);
	picture.find("img").attr("src", bigImagePath);
};