!function($) {
    window.bLazy = new Blazy({
        offset: 350,
        loadInvisible: !0,
        breakpoints: [ {
            width: 767,
            src: "data-src-small"
        } ]
    }), $(window).scroll(function(e) {
        var scrollY = $(window).scrollTop();
        100 < scrollY ? $(".fl-social").addClass("fl-scrolled") : $(".fl-social").removeClass("fl-scrolled"), 
        5 < scrollY ? $("body").addClass("scrolled") : $("body").removeClass("scrolled");
    }), $(document).ready(function() {
        pgs_.hash_scroll(), pgs_.menuscrollToDiv(), pgs_.scroll_menu_active(), pgs_.burgger_menu(), 
        pgs_.custom_cursor(), pgs_.cus_tabs(), console.log("%c Developed by PGS (http://pgsuae.com/)", "background: #45d98e; color: #fff;");
    });
}(jQuery);

var viewport = window.innerWidth, pgs_ = {
    hash_scroll: function() {
        $("[data-scroll]").on("click", function(e) {
            var target_ = $(this).data("scroll");
            $(target_).length && ($("html, body").stop().animate({
                scrollTop: $(target_).offset().top - 100
            }, 500), e.preventDefault());
        });
    },
    burgger_menu: function() {
        $("body").on("click", ".menu_trigger", function(e) {
            var this_ = $(this), target_ = this_.data("traget");
            this_.toggleClass("active_"), $("body").toggleClass("menu_open"), $("#" + target_).toggleClass("show");
        });
    },
    menuscrollToDiv: function() {
        var offset = 100;
        1024 < viewport ? offset = 80 : viewport < 1024 && (offset = $("header").outerHeight()), 
        $("body").on("click", ".nav-link.scroll", function(e) {
            e.preventDefault(), $(document).off("scroll"), $(this).closest(".navbar-nav").length && ($(".navbar-nav a.scroll").each(function() {
                $(this).parent().removeClass("active");
            }), $(this).parent().addClass("active"));
            var target = $(this).attr("data-href"), $target = $(target);
            $(target).length ? ($("body").hasClass("menu_open") && $(".menu_trigger").trigger("click"), 
            $("html, body").stop().animate({
                scrollTop: $target.offset().top - offset
            }, 500, "swing", function() {
                $(document).on("scroll");
            })) : window.location.href = $(this).attr("href");
        });
    },
    scrollInner: function() {
        var offset = 100;
        1024 < viewport ? offset = 80 : viewport < 1024 && (offset = $("header").outerHeight()), 
        $("body").on("click", "[data-scroll]", function(e) {
            e.preventDefault(), $(document).off("scroll");
            var target = $(this).attr("href"), $target = $(target);
            $(target).length ? ($("body").hasClass("menu_open") && $(".menu_trigger").trigger("click"), 
            $("html, body").stop().animate({
                scrollTop: $target.offset().top - offset
            }, 500, "swing", function() {
                $(document).on("scroll");
            })) : window.location.href = $(this).attr("href");
        });
    },
    scroll_menu_active: function() {
        var lastId, menuItems = $(".navbar-nav").find("a"), scrollItems = menuItems.map(function() {
            var item = $($(this).attr("data-href"));
            if (item.length) return item;
        }), offset = 100;
        1024 < viewport ? offset = 100 : viewport < 1024 && (offset = $("header").outerHeight()), 
        $(window).scroll(function() {
            var fromTop = $(this).scrollTop() + offset, cur = scrollItems.map(function() {
                if ($(this).offset().top < fromTop) return this;
            }), id = (cur = cur[cur.length - 1]) && cur.length ? cur[0].id : "";
            lastId !== id && (lastId = id, menuItems.parent().removeClass("active").end().filter("[data-href='#" + id + "']").parent().addClass("active"));
        });
    },
    progress_circle: function() {
        $(".footer_box").find("[data-percentage]").each(function() {
            var this_ = $(this), val = parseFloat(this_.attr("data-percentage")), number_place = this_.find(".number_ span"), calc_per = (185 - 185 * val / 100).toFixed(2);
            this_.hasClass("anim_done") || (this_.find(".progress_").removeAttr("style"), setTimeout(function() {
                this_.find(".progress_").css("stroke-dashoffset", calc_per);
            }, 800), number_place.empty(), $({
                percentage: 0
            }).stop(!0).animate({
                percentage: val
            }, {
                duration: 2e3,
                step: function() {
                    var percentageVal = Math.round(10 * this.percentage) / 10;
                    number_place.text(percentageVal);
                }
            }).promise().done(function() {
                number_place.text(val), this_.addClass("anim_done");
            }));
        });
    },
    window_hash_smooth_scroll: function() {
        var hash = window.location.hash, this_ = $(hash);
        this_.length && $("html, body").stop().animate({
            scrollTop: this_.offset().top - 100
        }, 500);
    },
    custom_cursor: function() {
        $(window).mousemove(function(e) {
            $(".cursor").css({
                left: e.pageX,
                top: e.pageY
            });
        }), $("h1").on("mouseenter", function() {
            $(".cursor").addClass("focus");
        }).on("mouseleave", function() {
            $(".cursor").removeClass("focus");
        });
    },
    cus_tabs: function() {
        var url = $(location).attr("hash");
        null != url && $("[data-tab-nav]").each(function() {
            $(this).attr("data-tab-nav") == url && ($("[data-tab-nav]").removeAttr("data-init-active"), 
            $(this).attr("data-init-active", "true"));
        });
        $("[data-tab-nav]").each(function() {
            var this_ = $(this), init_active = this_.attr("data-init-active");
            this_.on("click", function(e) {
                var btn_ = $(this), target_ = this_.attr("data-tab-nav");
                $(target_).length && (e.preventDefault(), $("[data-tab-nav]").parent().removeClass("active_"), 
                btn_.parent().addClass("active_"), $("[data-tab-content]").hide(0, function() {
                    $("[data-tab-content]").removeClass("active_"), $(target_).show(0, function() {
                        $(target_).addClass("active_"), window.bLazy.revalidate();
                        $(target_).height();
                    });
                }));
            }), void 0 !== init_active && this_.trigger("click");
        });
    }
};

!function($) {
    $(document).ready(function() {
        767 < $(window).width() ? $(".home-section").viewportChecker({
            classToAdd: "inView",
            offset: "50%"
        }) : $(".home-section").viewportChecker({
            classToAdd: "inView",
            offset: "30%"
        }), $("[data-inner-view]").viewportChecker({
            classToAdd: "innerView"
        }), $("body").addClass("is-loaded"), $("[data-model-box]").fancybox({
            modal: !0
        });
    });
}(jQuery);