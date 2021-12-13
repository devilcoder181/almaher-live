(function ($) {
  window.bLazy = new Blazy({
    offset: 350,
    loadInvisible: true,
    breakpoints: [
      {
        width: 767,
        src: "data-src-small",
      },
    ],
  });
  $(window).scroll(function (e) {
    var scrollY = $(window).scrollTop();
    scrollY > 100
      ? $(".fl-social").addClass("fl-scrolled")
      : $(".fl-social").removeClass("fl-scrolled");
    scrollY > 5
      ? $("body").addClass("scrolled")
      : $("body").removeClass("scrolled");
  });
 
  $(document).ready(function () {
    //Link click
    pgs_.hash_scroll();

    // Menu link smooth scroll click
    pgs_.menuscrollToDiv();

    // Scroll Menu active
    pgs_.scroll_menu_active();

    // Burger menu click
    pgs_.burgger_menu();

    // Input word counter
    //pgs_.word_lenght();

    // Custom Cursor
    pgs_.custom_cursor();

    // Custom Tab
    pgs_.cus_tabs();

   
    //Signature
    console.log(
      "%c Developed by PGS (http://pgsuae.com/)",
      "background: #45d98e; color: #fff;"
    );
  });
})(jQuery);

var viewport = window.innerWidth;
var pgs_ = {
  hash_scroll: function () {
    $("[data-scroll]").on("click", function (e) {
      var this_ = $(this),
        target_ = this_.data("scroll");

      if ($(target_).length) {
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $(target_).offset().top - 100,
            },
            500
          );
        e.preventDefault();
      }
    });
  },
  burgger_menu: function () {
    // Bugger Menu click
    $("body").on("click", ".menu_trigger", function (e) {
      var this_ = $(this),
        target_ = this_.data("traget");

      this_.toggleClass("active_");
      $("body").toggleClass("menu_open");
      $("#" + target_).toggleClass("show");
    });
  },
  menuscrollToDiv: function () {
    var offset = 100;
    if (viewport > 1024) {
      offset = 80;
    } else if (viewport < 1024) {
      offset = $("header").outerHeight();
    }

    $("body").on("click", ".nav-link.scroll", function (e) {
      e.preventDefault();
      $(document).off("scroll");
      if ($(this).closest(".navbar-nav").length) {
        $(".navbar-nav a.scroll").each(function () {
          $(this).parent().removeClass("active");
        });
        $(this).parent().addClass("active");
      }

      //  new scripts
      var target = $(this).attr("data-href");
      var $target = $(target);

      if (!$(target).length) {
        window.location.href = $(this).attr("href");
      } else {
        // remove the menu active
        if ($("body").hasClass("menu_open")) {
          $(".menu_trigger").trigger("click");
        }

        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $target.offset().top - offset,
            },
            500,
            "swing",
            function () {
              $(document).on("scroll");
            }
          );
      }
    });
  },
  scrollInner: function () {
    var offset = 100;
    if (viewport > 1024) {
      offset = 80;
    } else if (viewport < 1024) {
      offset = $("header").outerHeight();
    }

    $("body").on("click", "[data-scroll]", function (e) {
      e.preventDefault();
      $(document).off("scroll");

      //  new scripts
      var target = $(this).attr("href");
      var $target = $(target);

      if (!$(target).length) {
        window.location.href = $(this).attr("href");
      } else {
        // remove the menu active
        if ($("body").hasClass("menu_open")) {
          $(".menu_trigger").trigger("click");
        }

        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $target.offset().top - offset,
            },
            500,
            "swing",
            function () {
              $(document).on("scroll");
            }
          );
      }
    });
  },
  scroll_menu_active: function () {
    var lastId,
      topMenu = $(".navbar-nav"),
      menuItems = topMenu.find("a"),
      scrollItems = menuItems.map(function () {
        var item = $($(this).attr("data-href"));
        if (item.length) {
          return item;
        }
      });
    var offset = 100;
    if (viewport > 1024) {
      offset = 100;
    } else if (viewport < 1024) {
      offset = $("header").outerHeight();
    }

    $(window).scroll(function () {
      var fromTop = $(this).scrollTop() + offset;
      var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop) return this;
      });
      cur = cur[cur.length - 1];
      var id = cur && cur.length ? cur[0].id : "";
      if (lastId !== id) {
        lastId = id;
        menuItems
          .parent()
          .removeClass("active")
          .end()
          .filter("[data-href='#" + id + "']")
          .parent()
          .addClass("active");
      }
    });
  },
  progress_circle: function () {
    $(".footer_box")
      .find("[data-percentage]")
      .each(function () {
        var this_ = $(this),
          circle_limit = 185,
          val = parseFloat(this_.attr("data-percentage")),
          number_place = this_.find(".number_ span"),
          calc_per = (circle_limit - (circle_limit * val) / 100).toFixed(2);

        if (this_.hasClass("anim_done")) return;

        this_.find(".progress_").removeAttr("style");
        setTimeout(function () {
          this_.find(".progress_").css("stroke-dashoffset", calc_per);
        }, 800);

        // Number animation
        number_place.empty();

        $({ percentage: 0 })
          .stop(true)
          .animate(
            { percentage: val },
            {
              duration: 2000,
              step: function () {
                // percentage with 1 decimal;
                var percentageVal = Math.round(this.percentage * 10) / 10;
                number_place.text(percentageVal);
              },
            }
          )
          .promise()
          .done(function () {
            // hard set the value after animation is done to be
            // sure the value is correct
            number_place.text(val);
            this_.addClass("anim_done");
          });
      });
  },
  window_hash_smooth_scroll: function () {
    var hash = window.location.hash,
      this_ = $(hash);

    if (this_.length) {
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: this_.offset().top - 100,
          },
          500
        );
    }
  },
  custom_cursor: function() {
    $(window).mousemove(function(e) { 
      $('.cursor').css({
        left: e.pageX,
         top: e.pageY
      })
    })
    
    $('h1')
    .on('mouseenter', function() {
      $('.cursor').addClass('focus')
    })
    .on('mouseleave', function() {
      $('.cursor').removeClass('focus')
    })
  },
  cus_tabs:function () {

    var url = $(location).attr('hash');

    if(url != undefined){

    $('[data-tab-nav]').each(function(){

      var thisId = $(this).attr('data-tab-nav');

      if(thisId == url){
        $('[data-tab-nav]').removeAttr('data-init-active')
        $(this).attr('data-init-active', 'true')

      }

    });
    }



    var temp_h = 0;
    $('[data-tab-nav]').each(function() {
      var this_ = $(this),
          init_active = this_.attr('data-init-active');

        // nav click
        this_.on('click', function(e) {
          var btn_ = $(this),
              target_ = this_.attr('data-tab-nav');

            // check the length
            if($(target_).length) {
              e.preventDefault();

              // nav activating
              $('[data-tab-nav]').parent().removeClass('active_');
              
              btn_.parent().addClass('active_');

              $('[data-tab-content]').hide(0,function() {
                // hide all other tab content
                  $('[data-tab-content]').removeClass('active_');

                // enable current target
                $(target_).show(0,function() {
                  $(target_).addClass('active_');

                  window.bLazy.revalidate();


                  //height checking
                  var content_h = $(target_).height();

                  if(temp_h < content_h) {
                   // $('[data-tab-wrapper]').css('min-height', content_h);
                   // temp_h = content_h;
                  }

                });
              });

            }
        });

        // init tab activing

        if(typeof init_active != 'undefined') {
          this_.trigger('click');
        }



    });



    // init tab activating

  },

};
