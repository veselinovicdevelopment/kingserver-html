(function($) {
    $.widget('frontendOrder.orderRegistration', {
        options: {
            orderRegistrationButtonClass: 'orderRegistrationButton',
            orderRegistrationRowClass: 'orderRegistrationRow',
            orderSignupRowClass: 'orderSignupRow',
            orderSigninRowClass: 'orderSigninRow'
        },

        _setOption: function(key, value) {
            this._super('_setOption', key, value);
        },

        _create: function() {
            var widget = this;

            var buttonArrayEvent = {};
            buttonArrayEvent['click .' + widget.options['orderRegistrationButtonClass']] = function (event) {
                $(widget.element)
                    .find('.' + widget.options['orderRegistrationRowClass'])
                    .hide()
                    .filter('.' + ($(event.currentTarget).data('orderRegistrationAction') === 'signup' ? widget.options['orderSignupRowClass'] : widget.options['orderSigninRowClass']))
                    .show();
            };
            widget._on(buttonArrayEvent);
        },

        destroy: function() {
        }
    });
}(jQuery));
