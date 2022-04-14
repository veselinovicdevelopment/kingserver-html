(function($) {
    $.widget('frontendVirtualHosting.virtualHostingPrice', {
        options: {
            languageValue: 'ru',
            countryButtonClass: 'countryButton',
            countryInputClass: 'countryInput',
            orderPeriodOneMonthId: 1,
            orderPeriodButtonClass: 'orderPeriodButton'
        },

        _setOption: function(key, value) {
            this._super('_setOption', key, value);
        },

        _create: function() {
            // countryButtonEvent
            var countryButtonEvent = {};
            countryButtonEvent['click .' + this.options['countryButtonClass']] = function (event) {
                $(this.element)
                    .find('.' + this.options['countryButtonClass'])
                    .removeClass('open')
                    .filter('.countryId' + $(event.currentTarget).data('countryId'))
                    .addClass('open');
                $(this.element)
                    .find('.' + this.options['countryInputClass'])
                    .prop('checked', false)
                    .filter('.countryId' + $(event.currentTarget).data('countryId'))
                    .prop('checked', true);
            };
            this._on(countryButtonEvent);

            // orderPeriodButtonEvent
            var orderPeriodButtonEvent = {};
            orderPeriodButtonEvent['click .' + this.options['orderPeriodButtonClass']] = function (event) {
                var widget = this,
                    csrfParam = yii.getCsrfParam(),
                    csrfToken = yii.getCsrfToken(),
                    orderPeriodId,
                    postData;
                orderPeriodId = $(event.currentTarget).data('orderPeriodId');
                postData = {
                    'orderPeriodId' : orderPeriodId
                };
                postData[csrfParam] = csrfToken;
                $(widget.element)
                    .find('.' + widget.options['orderPeriodButtonClass'])
                    .removeClass('open')
                    .filter('.orderPeriodId' + orderPeriodId)
                    .addClass('open');
                $.post((widget.options['languageValue'] !== 'ru' ? ("/" + widget.options['languageValue']) : "") + "/hosting/", postData, function( r ) {
                    var data,
                        price;
                    if (r.error === false) {
                        data = r.data;
                        if (orderPeriodId === widget.options['orderPeriodOneMonthId']) {
                            $(widget.element).find('.old-price').hide();
                        }
                        else {
                            $(widget.element).find('.old-price').show();
                        }
                        $(widget.element).find('.priceVirtual').each(function (i, v) {
                            if ($(v).find('.old-price')) {
                                price = parseFloat(($(v).find('.old-price').text()));
                                $(v).find('.currentPrice').html(Math.round(price * data.discountRatio).toFixed(0));
                            }
                        });
                    }
                });
            };
            this._on(orderPeriodButtonEvent);
        },

        destroy: function() {
        }
    });
}(jQuery));
