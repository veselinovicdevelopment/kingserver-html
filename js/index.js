function processFormCookie(e) {
    var t = JSON.parse(e);
    $.each(t, function (o, e) {
        "object" == typeof e
            ? $.each(e, function (i, e) {
                  "object" == typeof e
                      ? $.each(e, function (n, e) {
                            "object" == typeof e
                                ? $.each(e, function (e, t) {
                                      "_" == e[0] && "_" == e[1]
                                          ? setFieldValue(
                                                o + "[" + i + "][" + n + "][]",
                                                t
                                            )
                                          : setFieldValue(
                                                o +
                                                    "[" +
                                                    i +
                                                    "][" +
                                                    n +
                                                    "][" +
                                                    e +
                                                    "]",
                                                t
                                            );
                                  })
                                : setFieldValue(
                                      o + "[" + i + "][" + n + "]",
                                      e
                                  );
                        })
                      : setFieldValue(o + "[" + i + "]", e);
              })
            : setFieldValue(o, e);
    });
}

function setFieldValue(e, t) {
    var n = $("body").find('[name="' + e + '"]');
    1 == n.length
        ? n.val(t).trigger("change")
        : $.each(n, function () {
              $(this).is("select")
                  ? $(this).val(t).trigger("change")
                  : $(this).val() == t && $(this).prop("checked", !0);
          });
}

function choiceButtonCounter() {
    $(".line-button-banner .button-item").on("click", function () {
        var e = $(this);
        e.siblings().removeClass("open"), e.addClass("open");
    });
}

function choiceButtonSwitch() {
    $(".line-button-period .button-item").on("click", function () {
        var e = $(this);
        e.siblings().removeClass("open"), e.addClass("open");
    });
}

function choiceButtonRam() {
    $(".line-button-ram .button-item").on("click", function () {
        var e = $(this);
        e.siblings().removeClass("open"), e.addClass("open");
    });
}

function labelIt() {
    $(".button-vps-vds").on("click", function () {
        $(this);
        var e = $(this).parents(".price-about").find("#id1"),
            t = $(this).parents(".price-about").find("#id2");
        e.hasClass("show")
            ? e.removeClass("show")
            : (e.addClass("show"), t.removeClass("show"));
    }),
        $(".button-hosting").on("click", function () {
            $(this);
            var e = $(this).parents(".price-about").find("#id1"),
                t = $(this).parents(".price-about").find("#id2");
            t.hasClass("show")
                ? t.removeClass("show")
                : (t.addClass("show"), e.removeClass("show"));
        });
}

function PanelNav() {
    $(".button-registr").on("click", function () {
        $(this);
        var e = $(this).parents(".card-middle").find("#col1"),
            t = $(this).parents(".card-middle").find("#col2");
        e.hasClass("show")
            ? e.removeClass("show")
            : (e.addClass("show"), t.removeClass("show"));
    }),
        $(".button-login").on("click", function () {
            $(this);
            var e = $(this).parents(".card-middle").find("#col1"),
                t = $(this).parents(".card-middle").find("#col2");
            t.hasClass("show")
                ? t.removeClass("show")
                : (t.addClass("show"), e.removeClass("show"));
        });
}

function tabs() {
    $("[data-tab]").on("click", function (e) {
        var t = $(this),
            n = t.parents(".card-price").find(".list-advantage"),
            i = t.parents(".card-price").find(".price-marker");
        t.parent().siblings().removeClass("active"),
            t.parent().addClass("active"),
            n
                .siblings("[data-content=" + t.data("tab") + "]")
                .addClass("active")
                .siblings("[data-content]")
                .removeClass("active"),
            i
                .siblings("[data-content=" + t.data("tab") + "]")
                .addClass("active")
                .siblings("[data-content]")
                .removeClass("active"),
            e.preventDefault();
    });
}

$(document).ready(function () {
    new Swiper(".swiper-container", {
        effect: "coverflow",
        grabCursor: !0,
        centeredSlides: !0,
        slidesPerView: "auto",
        autoHeight: !0,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: !0,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    $(".auth_buttons").click(function () {
        $(this).next().slideToggle();
    }),
        $(".button-list").click(function () {
            $(".dropdown-list").slideToggle("slow"),
                $(".button-list").toggleClass("visible");
        }),
        $(".js-button-scroll").click(function () {
            event.preventDefault();
            var e = $(this).attr("data-scroll-to"),
                t = $(e).offset().top - 25;
            $("body,html").animate({ scrollTop: t }, 900);
        }),
        choiceButtonCounter(),
        choiceButtonSwitch(),
        choiceButtonRam(),
        labelIt(),
        PanelNav(),
        tabs(),
        $("body").on("click", ".country-list", function () {
            $(".country-list .list").show();
        }),
        $(document).click(function (e) {
            $(e.target).closest(".country-list").length ||
                ($(".country-list .list").hide(), e.stopPropagation());
        }),
        $("body").on("click", ".js-change-location", function (e) {
            e.preventDefault();
            var t = $(this);
            $.removeCookie("serializedOrderForm");
            var n = JSON.stringify($("#login-form").serializeArray());
            $.cookie("serializedOrderForm", n, { expires: 1, path: "/" }),
                (location.href = t.attr("href"));
        }),
        $("body").on("change", ".js-select-os", function () {
            var e = $(this).find("option:selected").text();
            new RegExp("(windows)", "i").test(e)
                ? ($(".js-win-params")
                      .find(".button-list")
                      .removeClass("hidden-block"),
                  $(".js-win-params")
                      .find("input:checkbox")
                      .removeAttr("disabled"),
                  $(".js-not-available").hide())
                : ($(".js-win-params")
                      .find(".button-list")
                      .addClass("hidden-block"),
                  $(".js-win-params").find(".dropdown-list").slideUp(),
                  $.each(
                      $(".js-win-params").find("input:checked"),
                      function () {
                          $(this).prop("checked", !1);
                      }
                  ),
                  $(".js-win-params")
                      .find("input:checkbox")
                      .attr("disabled", "disabled"),
                  $(".js-not-available").show());
        }),
        $("body").on("click", ".js-trial-submit", function () {
            $(".form-offer-control .loader").show();
            $('[name="trial-referer"]').val();
            var e = $('[name="trial-lang"]').val(),
                t = $('[name="trial-name"]').val(),
                n = $('[name="trial-company"]').val(),
                i = $('[name="trial-site"]').val(),
                o = $('[name="trial-phone"]').val(),
                a = $('[name="trial-email"]').val(),
                s = $('[name="trial-note"]').val(),
                r = [];
            $.each($(".optionWrapper input:checked"), function () {
                r.push($(this).val());
            });
            var c = [];
            $.each(r, function (e, t) {
                var n = "";
                switch (t) {
                    case "33":
                        n = "Dedicated server";
                        break;
                    case "34":
                        n = "Virtual server";
                        break;
                    case "35":
                        n = "Virtual hosting";
                        break;
                    case "36":
                        n = "Storage";
                        break;
                    case "37":
                        n = "VDI";
                        break;
                    case "38":
                        n = "CDN";
                        break;
                    case "39":
                        n = "Anti-DDoS protection";
                }
                var i = new Object({ serviceWrapper: n });
                c.push(i);
            }),
                "undefined" != typeof xhr && xhr.abort(),
                (xhr = $.ajax({
                    url: "/pipedrive/",
                    type: "POST",
                    data: {
                        lang: e,
                        name: t,
                        company: n,
                        site: i,
                        phone: o,
                        email: a,
                        note: s,
                        ch: r,
                    },
                    success: function (e) {
                        e.valid &&
                            ((window.dataLayer = window.dataLayer || []),
                            dataLayer.push({
                                event: "formSubmit",
                                formType: "Start_free_trial",
                                id_person: e.person,
                                service: c,
                            })),
                            $(".form-offer-control .loader").hide(),
                            $(".formWrap, .formButtonWrap").hide(),
                            $(".form-offer-control").append(e.result);
                    },
                }));
        }),
        $("body").on("click", ".js-go-back", function () {
            $(".form-offer-control")
                .find(".error-msg, br, .js-go-back")
                .remove(),
                $(".formWrap, .formButtonWrap").show();
        });
}),
    $(function () {
        $(".js-open").on("click", function () {
            var e = $(this).parents("li");
            e.siblings().removeClass("open"), e.addClass("open");
        });
    }),
    $(".click-panel").click(function () {
        $("#openModalPanel").fadeIn(300);
        var e = $(this).attr("iddiv");
        return (
            $("#" + e).fadeIn(300), $("#openModalPanel").attr("opendiv", e), !1
        );
    }),
    $(document).ready(function () {
        $(".click-panel").click(function () {
            $("#openModalPanel").fadeIn(300);
            $(this).attr("iddiv");
        });
    }),
    $(".looking").click(function () {
        $("#openModalGlass").fadeIn(300);
        var e = $(this).attr("iddiv");
        return (
            $("#" + e).fadeIn(300), $("#openModalGlass").attr("opendiv", e), !1
        );
    }),
    $(document).ready(function () {
        $(".looking").click(function () {
            $("#openModalGlass").fadeIn(300);
            $(this).attr("iddiv");
        });
    }),
    $(document).ready(function () {
        // Contact Us button JS
        $("#contact_us_button").hover(function () {
            $(".contact_popup").show();
        });
        $(".contact_popup").mouseleave(function () {
            $(".contact_popup").hide();
            setTimeout(function () {
                $(".contact_popup").hide();
            }, 100);
        });
    });
$(document).ready(function () {
    $(".single-item").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        appendArrows: !1,
        prevArrow: !1,
        nextArrow: !1,
        autoplay: !0,
        autoplaySpeed: 2e3,
    });
    var e = $(".section.section-breadcrumb");
    e
        .eq(0)
        .insertBefore(".promo-about, .promo-initial-about, .js-promo-about")
        .show(),
        $(".js-promo-temp").remove(),
        $(window).width() <= 767 &&
            e.eq(0).appendTo(".section-promo-initial .container");
}),
    $(document).ready(function () {
        $(".accordionButton").click(function () {
            $(".accordionButton").removeClass("on"),
                $(".accordionContent").slideUp("normal"),
                1 == $(this).next().is(":hidden") &&
                    ($(this).addClass("on"),
                    $(this).next().slideDown("normal"));
        }),
            $(".accordionButton")
                .mouseover(function () {
                    $(this).addClass("over");
                })
                .mouseout(function () {
                    $(this).removeClass("over");
                }),
            $(".accordionContent").hide();
    }),
    $(document).ready(function () {
        if (
            ($(".accordionButtonData").click(function () {
                $(".accordionButtonData").removeClass("on"),
                    $(".accordionContent").slideUp("normal"),
                    1 == $(this).next().is(":hidden") &&
                        ($(this).addClass("on"),
                        $(this).next().slideDown("normal"));
            }),
            $(".accordionButtonData").click(function () {
                $(this).toggleClass("active");
            }),
            $(".accordionButtonData")
                .mouseover(function () {
                    $(this).addClass("over");
                })
                .mouseout(function () {
                    $(this).removeClass("over");
                }),
            $(".accordionContent").hide(),
            $(".set > a").on("click", function () {
                return (
                    $(this).parent().hasClass("active")
                        ? ($(this).parent().removeClass("active"),
                          $(this).siblings(".content").slideUp(300),
                          $(".set > a i")
                              .removeClass("fa-minus")
                              .addClass("fa-plus"))
                        : ($(".set > a i")
                              .removeClass("fa-minus")
                              .addClass("fa-plus"),
                          $(this)
                              .find("i")
                              .removeClass("fa-plus")
                              .addClass("fa-minus"),
                          $(".set > a").parent().removeClass("active"),
                          $(this).parent().addClass("active"),
                          $(".content").slideUp(300),
                          $(this).siblings(".content").slideDown(300)),
                    !1
                );
            }),
            $(".tab_content").hide(),
            $(".tab_content:first").show(),
            $(".tabs li:first").addClass("active"),
            $(".tabs li").click(function () {
                $(".tabs li").removeClass("active"),
                    $(this).addClass("active"),
                    $(".tab_content").hide();
                var e = $(this).find("a").attr("href");
                return $(e).fadeIn(), !1;
            }),
            $(".playpause").click(function () {
                $(this).toggleClass("visible-poster"),
                    $(this).prev(".video").get(0).play(),
                    $(".playpause-icon").fadeOut(),
                    $(this).find(".playpause-icon").is(":hidden") &&
                        ($(this).prev(".video").get(0).pause(),
                        $(this).find(".playpause-icon").fadeIn(),
                        $(this).parent().find(".name-slide").fadeIn());
            }),
            $("video").mediaelementplayer({
                alwaysShowControls: !1,
                videoVolume: "horizontal",
                features: ["playpause", "progress", "volume", "fullscreen"],
            }),
            $(".mejs-container").is(":visible")
                ? $(".mejs-poster")
                      .empty()
                      .css({
                          "background-image": 'url("/video/preview.jpg")',
                          width: "100%",
                          height: "100%",
                      })
                      .show()
                : setTimeout(function () {
                      $(".mejs-poster")
                          .empty()
                          .css({
                              "background-image": 'url("/video/preview.jpg")',
                              width: "100%",
                              height: "100%",
                          })
                          .show();
                  }, 6e3),
            $("#vpsVdsPrice").vpsVdsPrice(),
            $("#tryFreeButton").tryFreeButtonWidget({ tryFreeId: "openModal" }),
            $("#openModal").tryFreeWidget(),
            null == $.cookie("hidePrivacy"))
        ) {
            var e, t, n, i;
            n =
                "en" != document.location.pathname.split("/")[1]
                    ? ((e = "Мы заботимся о вашей конфиденциальности"),
                      (t =
                          "В свете недавних скандалов с неприкосновенностью частной жизни пользователей и более активного участия местных органов власти в регулировании Интернета, это было всего лишь вопросом времени, когда должен появиться Общий регламент о защите данных (GDPR). Реформа защиты данных проводится уже более четырех лет, и GDPR является одним из основных компонентов этой новой структуры."),
                      "ПРИНЯТЬ")
                    : ((e = "We Take Care About Your Privacy"),
                      (t =
                          "In light of recent user privacy scandals and the increased involvement of local governments in web regulation, it was just a matter of time before the General Data Protection Regulation (GDPR) arrived. Data protection reform has been in the works for over four years, and GDPR is one of the main components of this new framework."),
                      "ACCEPT");

            if ("en" == document.location.pathname.split("/")[1]) {
                i =
                    '<div class="gdpr-bar yellow--bg">\n        <span class="close--btn"><span class="icon-im65"></span></span>\n        <div class="container">\n            <div class="row ai-center">\n                <img src="' +
                    document.location.origin +
                    '/img/images/gdpr-icon.svg" alt="">\n                <div class="texts-wrap-gdpr">\n                    <div class="title-gdpr">' +
                    e +
                    "</div>\n                    <p>" +
                    t +
                    '</p>\n                </div>\n                <div class="btn--wrap">\n                    <button type="button" class="button-free js-button-accept">' +
                    n +
                    "</button>\n                </div>\n            </div>\n        </div>\n    </div>";
            } else {
                i =
                    '<div class="gdpr-bar yellow--bg" style="display: none">\n        <span class="close--btn"><span class="icon-im65"></span></span>\n        <div class="container">\n            <div class="row ai-center">\n                <img src="' +
                    document.location.origin +
                    '/img/images/gdpr-icon.svg" alt="">\n                <div class="texts-wrap-gdpr">\n                    <div class="title-gdpr">' +
                    e +
                    "</div>\n                    <p>" +
                    t +
                    '</p>\n                </div>\n                <div class="btn--wrap">\n                    <button type="button" class="button-free js-button-accept">' +
                    n +
                    "</button>\n                </div>\n            </div>\n        </div>\n    </div>";
            }

            $(".header").before(i);
        }
        var o;
        if ("en" == document.location.pathname.split("/")[1]) {
            o = $(".gdpr-bar").innerHeight();
        } else {
            o = 0;
        }

        $(".header").css("margin-top", o),
            $(".close--btn").click(function () {
                $(".gdpr-bar").slideUp(),
                    $(".header").animate({ "margin-top": 0 });
            }),
            $(".js-button-accept").click(function () {
                $(".gdpr-bar").slideUp(),
                    $(".header").animate({ "margin-top": 0 }),
                    $.cookie("hidePrivacy", "1");
            });
    }),
    jQuery.widget("frontend.tryFreeWidget", {
        options: {},
        _setOption: function (e, t) {
            this._super("_setOption", e, t);
        },
        _create: function () {
            this._on({
                "click .close-modal": function (e) {
                    this.element.hide();
                },
            });
        },
        destroy: function () {},
    }),
    (function (t) {
        t.widget("frontend.tryFreeButtonWidget", {
            options: { tryFreeId: "tryFreeId" },
            _setOption: function (e, t) {
                this._super("_setOption", e, t);
            },
            _create: function () {
                this._on(this.element, {
                    click: function (e) {
                        t("#" + this.options.tryFreeId).fadeIn(300),
                            t("html, body").animate({ scrollTop: 0 }, 500);
                    },
                });
            },
            destroy: function () {},
        });
    })(jQuery);

//MORE/LESS
$(document).ready(function () {
    $(".dop--hidden").hide();
    $(".show--more-dops")
        .find("a")
        .click(function () {
            $(this).toggleClass("swich--text");
            $(".dop--hidden").slideToggle();
            return false;
        });

    $(".select-block-quantity input").on("input", function (e) {
        let filtred = numberReg($(this).val());
        $(this).val(filtred);
    });

    $(".btn-mobile").click(function () {
        $(this).toggleClass("active");
        $(".header__down-wrap").stop().slideToggle(200);
        return false;
    });

    $(".header__nav-item-link--accordion").click(function () {
        $(this).toggleClass("active");
        $(this).siblings(".header__nav-dropdown").stop().slideToggle(300);
        return false;
    });

    if ($(window).width() > 992) {
        $(".header__down-wrap").attr("style", "");
        $("#headerContactContent")
            .appendTo("#headerContactWrap")
            .css("display", "block");
    } else if ($(window).width() < 992) {
        $("#headerContactContent")
            .appendTo("#headerContactWrapMobile")
            .css("display", "none");
    }
});

$(window).on("resize", function () {
    if ($(window).width() > 992) {
        $(".header__down-wrap").attr("style", "");
        $("#headerContactContent")
            .appendTo("#headerContactWrap")
            .css("display", "block");
    } else if ($(window).width() < 992) {
        $("#headerContactContent")
            .appendTo("#headerContactWrapMobile")
            .css("display", "none");
    }
});

function numberReg(filtered) {
    var reg = new RegExp("^[1-9]$");
    if (filtered.length <= 1 && !reg.test(filtered[0])) {
        filtered = filtered.slice(1, 0);
    }
    let lastChar = filtered.substr(filtered.length - 1);
    reg = new RegExp("^[0-9]$");
    if (!reg.test(lastChar)) {
        filtered = filtered.substring(0, filtered.length - 1);
    }
    return filtered;
}
