(function($) {
    $.widget('frontendFastDeliveryServer.fastDeliveryServerPrice', {
        options: {
            countryButtonClass: 'countryButton',
            countryInputClass: 'countryInput',
            fastDeliveryServerTableClass: 'fastDeliveryServerTable'
        },

        _setOption: function(key, value) {
            this._super('_setOption', key, value);
        },

        _create: function() {
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
                $(this.element)
                    .find('.' + this.options['fastDeliveryServerTableClass'])
                    .hide()
                    .filter('.countryId' + $(event.currentTarget).data('countryId'))
                    .show();
            };
            this._on(countryButtonEvent);
        },

        destroy: function() {
        }
    });
}(jQuery));
