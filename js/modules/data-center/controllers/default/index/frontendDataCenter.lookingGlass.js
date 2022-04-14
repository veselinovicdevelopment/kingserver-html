(function($) {
    $.widget('frontendDataCenter.lookingGlass', {
        options: {
            lookingGlassUrl: null,
            lookingGlassButtonClass: 'lookingGlassButton',
            routerInputClass: 'routerInput',
            modalNextClass: 'modalNext',
            modalDialogGlassClass: 'modalDialogGlass',
            modalBlockClass: 'modalBlock',
            modalSpinnerClass: 'modalSpinner',
            modalContentClass: 'modalContent'
        },

        _setOption: function(key, value) {
            this._super('_setOption', key, value);
        },

        _create: function() {
            var widget = this,
                lookingGlassEvent = {};
            lookingGlassEvent['click .' + widget.options['lookingGlassButtonClass']] = function (event) {
                $(widget.element)
                    .find('.' + widget.options['routerInputClass'])
                    .val($(event.currentTarget).data('routerId'));
                $(widget.element)
                    .find('.' + widget.options['modalSpinnerClass'])
                    .hide();
                $(widget.element)
                    .find('.' + widget.options['modalContentClass'])
                    .html('')
                    .show();
                $(widget.element)
                    .find('.' + widget.options['modalDialogGlassClass'])
                    .show();
            };
            lookingGlassEvent['click .' + widget.options['modalNextClass']] = function (event) {
                $(widget.element)
                    .find('.' + widget.options['modalContentClass'])
                    .html('')
                    .hide();
                $(widget.element)
                    .find('.' + widget.options['modalSpinnerClass'])
                    .show();
                $.ajax({
                    url: widget.options['lookingGlassUrl'],
                    type: 'GET',
                    data: $(widget.element)
                        .find('form')
                        .serialize(),
                    dataType: 'html',
                    success: function(data){
                        $(widget.element)
                            .find('.' + widget.options['modalSpinnerClass'])
                            .hide();
                        $(widget.element)
                            .find('.' + widget.options['modalContentClass'])
                            .html(data)
                            .show();
                    }
                });

                return false;
            };
            lookingGlassEvent['click .' + widget.options['modalBlockClass']] = function (event) {
                event.stopPropagation();
            };
            lookingGlassEvent['click .' + widget.options['modalDialogGlassClass']] = function (event) {
                $(widget.element)
                    .find('.' + widget.options['routerInputClass'])
                    .val('');
                $(event.currentTarget)
                    .hide();
            };
            widget._on(lookingGlassEvent);
        },

        destroy: function() {
        }
    });
}(jQuery));
