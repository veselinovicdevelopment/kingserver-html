(function($) {
    $.widget('frontend.tryFreeWidget', {
        options: {},

        _setOption: function(key, value) {
            this._super('_setOption', key, value);
        },

        _create: function() {
            this._on({
                'click .close-modal': function (event) {
                    this.element.hide();
                }
            });
        },

        destroy: function() {
        }
    });
}(jQuery));
