(function($) {
    $.widget('frontend.tryFreeButtonWidget', {
        options: {
            tryFreeId: 'tryFreeId'
        },

        _setOption: function(key, value) {
            this._super('_setOption', key, value);
        },

        _create: function() {
            this._on(this.element, {
                'click': function (event) {
                    $('#' + this.options['tryFreeId']).fadeIn(300);
                    $('html, body').animate({scrollTop: 0}, 500);
                }
            });
        },

        destroy: function() {
        }
    });
}(jQuery));
