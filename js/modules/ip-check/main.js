/**
 * Created by dev on 1/10/22.
 */
$(window).on('load', function () {
    if ($('.accordion-title-click').length) {

        $('.accordion-title-click').on('click', function () {
            $(this).parents('.accordion-group').find('.accordion-title-click').not($(this)).removeClass('active');
            $(this).parents('.accordion-group').find('.accordion-content').not($(this).next('.accordion-content')).slideUp();
            $(this).toggleClass('active');
            $(this).next('.accordion-content').stop().slideToggle();
        });
    }
    ;

    $('.btn-copy-js').click(function () {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($('#IP-value').text()).select();
        document.execCommand("copy");
        $temp.remove();
        return false
    });

    $('body').on('click', '#dig-check', function () {
        $('.js-dig-result').html('');
        if ($('#dig-domain').val() != '') {
            let $trace = $('#dig-trace').prop('checked') ? 1 : 0;
            let $text = $('#dig-text').prop('checked') ? 1 : 0;
            let $server = $('#dig-server').val() == '' ? '8.8.8.8' : $('#dig-server').val();
            $.get("/tools/apidig/?domain=" + $('#dig-domain').val() + "&type=" + $('#dig-type').val() + "&server=" + $server + "&trace=" + $trace + "&text=" + $text, function (data) {
                $('.js-dig-result').html(data);
                $('.js-dig-result-wrapp').show();
            });
        }
    });
});