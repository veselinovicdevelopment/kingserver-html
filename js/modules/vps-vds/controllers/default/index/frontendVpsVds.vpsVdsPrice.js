(function($) {
    $.widget('frontendVpsVds.vpsVdsPrice', {
        options: {
            countryButtonClass: 'countryButton',
            countryInputClass: 'countryInput',
            vpsVdsTableClass: 'vpsVdsTable'
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
                    .find('.' + this.options['vpsVdsTableClass'])
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
