(function($) {
    $.widget('frontendOrder.orderPrice', {
        options: {
            serviceId: null,
            serviceName: null,
            lang: 'ru',
            paymentTypeImages: [],
            countryButtonClass: 'countryButton',
            countryInputClass: 'countryInput',
            orderRowClass: 'orderRow'
        },

        _setOption: function(key, value) {
            this._super('_setOption', key, value);
        },

        _create: function() {
            var widget = this;
            widget._sendRequest();
            widget._setSelectedData();

            this._on(this.element.find('.x-disc'), {
                click: "_xDisc"
            });

            var buttonArrayEvent = {};
            var timeoutID;
            buttonArrayEvent['input select, input[type="checkbox"], input[type="radio"], input[type="text"]'] = function (event) {
                clearTimeout(timeoutID);
                timeoutID = widget._delay(function() {
                    widget._sendRequest();
                    widget._setSelectedData();
                }, 400);
            };
            buttonArrayEvent['input .payment-method'] = function (event) {
                var widgetElement = $(widget.element);
                widgetElement.find('.payment-method .card-img img').attr('src', widget.options['paymentTypeImages'][widgetElement.find('#category_9').val()]);
            };
            widget._on(buttonArrayEvent);
        },

        destroy: function() {
        },
        _xDisc:function( event ){
            var select  = $(event.target).parents(".card-item-disc").find('select');
            $(select).find("option[selected]").prop('selected',false);
            $(select).find("option[value='']").prop('selected',true);
            this._sendRequest();
        },
        _sendRequest: function() {
            var widget = this;
            var widgetElement = $(widget.element);
            var $url = widget.options['lang'] == 'ru' ? '/tariff/' : '/en/tariff/';
            $.post($url + widget.options['serviceName'] + "/", widgetElement.find("form").serialize(), function( r ) {
                var data,
                    price;
                if (r.error === false) {
                    data = r.data;

                    // orderPrice
                    price = widget._splitPrice(data.orderPrice);
                    widgetElement.find('.config-server').find('.old-price span + span').html(price[0] + '.<span>' + price[1] + '</span>');

                    // orderPriceDiscount
                    price = data.orderPriceDiscount.toFixed(2);
                    widgetElement.find('#summMonth').text(price);
                    price = price.toString().split('.');
                    widgetElement.find('.config-server').find('.order-period .price').html(price[0] + '.<span>' + price[1] + '</span>');
                    widgetElement.find('.config-server').find('#summ').html(price[0] + '<span id="subsumm">.' + price[1] + '</span>');
                    widgetElement.find('.list-item-small').find('#selected-items-summ').html(price[0] + '.' + price[1]);
                    widgetElement.find('.list-item-small').find('#selected-config-quantity').find('span.quantity').html(data.orderQuantity);

                    // discount
                    if(data.orderPriceDiscount < data.orderPrice) {
                        widgetElement.find('.old-price span, .old-price img').show();
                    }
                    else {
                        widgetElement.find('.old-price span, .old-price img').hide();
                    }

                    // serviceParamTypePriceArray
                    var serviceParamTypePriceArray = widgetElement.find('.list-item.dop').find('.price');
                    serviceParamTypePriceArray.each(function(i, serviceParamTypePrice) {
                        price = widget._splitPrice(data.serviceParamTypePriceArray[$(serviceParamTypePrice).data('serviceParamTypeId')]);
                        $(serviceParamTypePrice).html(price[0] + '.<span>' + price[1] + '</span>');
                    });

                    // paymentType
                    price = data.orderPriceDiscount.toFixed(2);
                    if (price <= 10) {
                        widgetElement.find('#category_9').find('option[value="1"]').hide();
                        if (widgetElement.find('#category_9').val() === '1') {
                            widgetElement.find('#category_9').val(
                                widgetElement.find('#category_9').find('option:not([style="display: none;"])').eq(0).val()
                            );
                            widgetElement.find('.payment-method .card-img img').attr('src', widget.options['paymentTypeImages'][widgetElement.find('#category_9').val()]);
                        }
                    }
                    else {
                        widgetElement.find('#category_9').find('option[value="1"]').show();
                    }

                    /*
                    if(data.hddPrice) {
                        var disks = $(document).find('.list-price-disc');
                        if(disks){
                            $(disks).html('');
                            $(data.hddPice).each(function(i,v){
                                var summ = widget._splitPrice(v);
                                $(disks).append('<span>' + (i+1) + ' - <b>$' + summ[0] + '</b><span class="smoll">.' + summ[1]+ '</span></span>');
                            });
                        }
                    }

                    if(data.hddPriceSummary) {
                        price = widget._splitPrice(data.hddPriceSummary);
                        $(document).find('.list-item.list-item-disc.dop .price').html(price[0] + '.<span>' + price[1] + '</span>');
                    }
                    if(data.servicePrice) {
                        price = widget._splitPrice(data.servicePrice);
                        $(document).find('.list-item.service .price').html(price[0] + '.<span>' + price[1] + '</span>');
                    }
                    if(data.period) {
                        $(document).find('#MonthPeriod').text(data.period);
                    }
                    */
                }
            });
        },

        _setSelectedData: function() {
            var widget = this;
            var widgetElement = $(widget.element);
            var txt = '';
            var glList = widgetElement.find('.list-item.dop');
            var ul = widgetElement.find('#selected-config-dop');
            glList = glList.sort(function(lhs, rhs) {
                return parseInt($(lhs).data('ordinalIndex'), 10) - parseInt($(rhs).data('ordinalIndex'), 10);
            });
            ul.html('');
            glList.each(function(i, glSection){
                var elList = $(glSection).find('select option:selected, input[type="checkbox"]:checked, input[type="radio"]:checked');
                var icon = $(glSection).find('.card-icon').get(0).outerHTML;
                var txtArray = [];
                elList = elList.sort(function(lhs, rhs) {
                    return parseInt($(lhs).data('ordinalIndex'), 10) - parseInt($(rhs).data('ordinalIndex'), 10);
                });
                elList.each(function(i2, formElement){
                    if (($(formElement).val()) === '') {
                        return true;
                    }
                    if ( $(formElement).is(':selected') ) {
                        txt = $(formElement).text();
                    }
                    if ( $(formElement).is(':checkbox') ) {
                        var cln = $(formElement).next('label').clone();
                        $(cln).find('span').remove();
                        txt = $(cln).text();
                    }
                    if ( $(formElement).is(':radio') ) {
                        txt = $(formElement).next('label').text();
                    }
                    txtArray[i2] = txt;
                });
                if (txtArray.length > 0) {
                    ul.append('<li><div class="card-content">' + icon + '<span>' + txtArray.join(', ') + '</span></div></li>');
                }
            });

            ul = widgetElement.find('#selected-config-period');
            var periodText = $('div.list-item.order-period input[type=radio]:checked').next('label').text();
            $(ul).find('span').text(periodText);
            widgetElement.find('.payment-method .card-img img').attr('src', widget.options['paymentTypeImages'][widgetElement.find('#category_9').val()]);
            /*
            ul = widgetElement.find('#selected-config-service');
            var service = $('div.list-item.service select option:selected').text();
            $(ul).find('.card-content .service').text(service);
            */
        },

        _splitPrice: function(price) {
            var arrPrice = [];
            var resPrice = parseFloat(price);
            if(!resPrice){
                resPrice = 0;
            }
            arrPrice = resPrice.toFixed(2).toString().split('.');

            return arrPrice;
        }
    });
}(jQuery));
