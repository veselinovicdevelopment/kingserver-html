/**
 * Created by dev on 1/10/22.
 */
$(window).on("load", function () {
    if ($(".heroSwiper").length) {
        var heroSwiper = new Swiper(".heroSwiper", {
            effect: "fade",
            autoHeight: true,
            breakpoints: {
                1200: {
                    autoHeight: false,
                },
            },
            loop: true,
            autoplay: {
                delay: 8000,
            },
            speed: 800,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }
    $(".tabs-tables__link--cpu").click(function () {
        $(".tabs-tables__link--cpu").removeClass("active");
        $(this).addClass("active");
        $(".tabs-tables__table-wrap").hide();
        var cpu = $(this).attr("data-cpu1");
        $(".tabs-tables__tab-content")
            .find("[data-cpu='" + cpu + "']")
            .fadeIn();
    });
    if ($(".accordion-title-click").length) {
        $(".accordion-title-click").on("click", function () {
            $(this)
                .parents(".accordion-group")
                .find(".accordion-title-click")
                .not($(this))
                .removeClass("active");
            $(this)
                .parents(".accordion-group")
                .find(".accordion-content")
                .not($(this).next(".accordion-content"))
                .slideUp();
            $(this).toggleClass("active");
            $(this).next(".accordion-content").stop().slideToggle();
        });
    }

    $(".btn-copy-js").click(function () {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($("#IP-value").text()).select();
        document.execCommand("copy");
        $temp.remove();
        return false;
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

    $(".tabs-tables__link").click(function () {
        $(".tabs-tables__link").removeClass("prev");
        $(this)
            .parent(".nav-item")
            .prev(".nav-item")
            .find(".tabs-tables__link")
            .addClass("prev");
    });

    if ($(".gauge").length) {
        $(".btn-start-gauge--js").click(function () {
            gsap.set(".gauge__progress--path", { drawSVG: "0%" });

            $(".btn-start-gauge").addClass("active");

            $(".gauge__result").addClass("active");

            $(".gauge__progress").addClass("active");

            var number = Math.random() * 100 + 1,
                number2 = number / 100,
                number3 = number.toFixed(2);

            $(".gauge__result--js").text(number3);

            gsap.to(".gauge__progress--circle", {
                motionPath: {
                    path: "M-193.58099,24.24102 C-305.34199,-68.24798 -247.53899,-258.74498 -93.05799,-260.03198 47.78901,-261.20498 121.90701,-90.64398 22.72301,11.84402 ",
                    autoRotate: true,
                    start: 0,
                    end: number2,
                },
                duration: 1,
                ease: "none",
            });
            gsap.to(
                ".gauge__progress--path",
                1,
                { drawSVG: number + "%", ease: "none" },
                0
            );

            if (number >= 1) {
                $(".gauge__value--1").addClass("active");
            } else {
                $(".gauge__value--1").removeClass("active");
            }

            if (number >= 10) {
                $(".gauge__value--2").addClass("active");
            } else {
                $(".gauge__value--2").removeClass("active");
            }

            if (number >= 23) {
                $(".gauge__value--3").addClass("active");
            } else {
                $(".gauge__value--3").removeClass("active");
            }

            if (number >= 37) {
                $(".gauge__value--4").addClass("active");
            } else {
                $(".gauge__value--4").removeClass("active");
            }

            if (number >= 50) {
                $(".gauge__value--5").addClass("active");
            } else {
                $(".gauge__value--5").removeClass("active");
            }

            if (number >= 63) {
                $(".gauge__value--6").addClass("active");
            } else {
                $(".gauge__value--6").removeClass("active");
            }

            if (number >= 75) {
                $(".gauge__value--7").addClass("active");
            } else {
                $(".gauge__value--7").removeClass("active");
            }

            if (number >= 88) {
                $(".gauge__value--8").addClass("active");
            } else {
                $(".gauge__value--8").removeClass("active");
            }

            if (number >= 99) {
                $(".gauge__value--9").addClass("active");
            } else {
                $(".gauge__value--9").removeClass("active");
            }

            return false;
        });
    }
    $(".js-button-scroll").click(function () {
        event.preventDefault();
        var e = $(this).attr("data-scroll-to"),
            t = $(e).offset().top - 25;
        $("body,html").animate({ scrollTop: t }, 900);
    });

    $("#heroFaq .tabs-faq__header-link").on("show.bs.tab", function () {
        $(".tabs-faq__header-link")
            .removeClass("active")
            .attr("aria-selected", "false");
    });
});

$(window).on("load resize", function () {
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
