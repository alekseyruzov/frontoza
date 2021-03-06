/* cacheid:0d42127dac3d91704eb4f0d67b9cb5fc0 */
/* media/zoo/applications/jbuniversal/assets/js/widget/goto.js */
/**
 * JBZoo App is universal Joomla CCK, application for YooTheme Zoo component
 *
 * @package     jbzoo
 * @version     2.x Pro
 * @author      JBZoo App http://jbzoo.com
 * @copyright   Copyright (C) JBZoo.com,  All rights reserved.
 * @license     http://jbzoo.com/license-pro.php JBZoo Licence
 */

;
(function ($, window, document, undefined) {


    JBZoo.widget('JBZoo.Goto', {}, {

        'click {element}': function (e, $this) {

            var url = $(this).attr('href');

            if (!url) {
                url = $(this).data('href');
            }

            if (url) {
                parent.location.href = url;
                return false;
            }
        }
    });


})(jQuery, window, document);
/* media/zoo/applications/jbuniversal/assets/js/widget/select.js */
/**
 * JBZoo App is universal Joomla CCK, application for YooTheme Zoo component
 *
 * @package     jbzoo
 * @version     2.x Pro
 * @author      JBZoo App http://jbzoo.com
 * @copyright   Copyright (C) JBZoo.com,  All rights reserved.
 * @license     http://jbzoo.com/license-pro.php JBZoo Licence
 * @coder       Denis Smetannikov <denis@jbzoo.com>
 */

;
(function ($, window, document, undefined) {

    /**
     * Wrapper for any selects
     */
    JBZoo.widget('JBZoo.Select', {}, {

        /**
         * Enable or disable select
         * @param isEnabled
         */
        toggle: function (isEnabled) {

            if (isEnabled) {
                this.el.removeAttr('disabled');
            } else {
                this.el.attr('disabled', 'disabled');
            }

            this._update();
        },

        disable: function () {
            this.toggle(false);
        },

        enable: function () {
            this.toggle(true);
        },

        /**
         * Remove all options
         * @param notFirst
         * @param isUpdate
         */
        removeOptions: function (notFirst, isUpdate) {

            if (this._def(notFirst, false)) {
                this.$('option').not(':first').remove();
            } else {
                this.$('option').remove();
            }

            if (this._def(isUpdate, true)) {
                this._update();
            }
        },

        /**
         * Remove & add new options in select
         * @param newOptions
         */
        replaceOptions: function (newOptions) {
            var $this = this;

            $this.removeOptions();
            $this.newOptions(newOptions);

        },

        /**
         * Update option list
         * @param list
         * @param notFirst
         */
        newOptions: function (list, notFirst) {

            this.removeOptions(notFirst, false);
            this.addOptions(list, false);

            this._update();
        },

        /**
         * Add several options to select
         * @param list
         * @param isUpdate
         */
        addOptions: function (list, isUpdate) {
            var $this = this;
            isUpdate = $this._def(isUpdate, true);

            $.each(list, function (key, value) {
                $this.addOption(key, value, isUpdate);
            });

            if (isUpdate) {
                this._update();
            }
        },

        /**
         * Append one option to select
         * @param key
         * @param value
         * @param isUpdate
         */
        addOption: function (key, value, isUpdate) {

            var decoded = $("<div/>").html(value).text();
            this.el.append($("<option/>", {value: key, text: decoded}));

            if (this._def(isUpdate, true)) {
                this._update();
            }
        },

        /**
         * @param newVal
         * @returns {*}
         */
        val: function (newVal) {
            if (typeof newVal == 'undefined') {
                return this.el.val();

            } else {
                this.el.val(newVal);
                this._update();
            }
        },

        /**
         * Reset select value(s)
         */
        reset: function () {
            this.val('');
            return this;
        },

        /**
         * Add chosen widget
         * @returns {jQuery}
         */
        addChosen: function (options) {
            $.isFunction($.fn.chosen) && this.el.chosen(options);
        },

        /**
         * Remove chosen widget
         * @returns {jQuery}
         */
        removeChosen: function () {
            $.isFunction($.fn.chosen) && this.el.chosen('destroy');
        },

        /**
         * Check is chosen plugin exists
         * @returns {boolean}
         * @private
         */
        _isChosen: function () {
            return ($.isFunction($.fn.chosen) && this.el.data('chosen'));
        },

        /**
         * Update select state
         * @private
         */
        _update: function () {
            if (this._isChosen()) {
                this.el
                    .trigger("chosen:updated")
                    .trigger('liszt:updated');
            }
        }

    });

})(jQuery, window, document);
/* media/zoo/applications/jbuniversal/assets/js/widget/money.js */
/**
 * JBZoo App is universal Joomla CCK, application for YooTheme Zoo component
 *
 * @package     jbzoo
 * @version     2.x Pro
 * @author      JBZoo App http://jbzoo.com
 * @copyright   Copyright (C) JBZoo.com,  All rights reserved.
 * @license     http://jbzoo.com/license-pro.php JBZoo Licence
 * @coder       Denis Smetannikov <denis@jbzoo.com>
 */

;
(function ($, window, document, undefined) {

    /**
     * Currency toggle (widget with flags)
     */
    JBZoo.widget('JBZoo.Money',
        {
            duration      : 400,
            easing        : 'swing',
            onAfterUpdate : $.noop,
            onBeforeUpdate: function (value) {
                return value;
            }
        },
        {
            // default data
            '_defaultRound': 9,
            '_defaultCur'  : 'default_cur',

            // currenct money data
            'currency'     : 'eur',
            'value'        : .0,
            'showplus'     : 0,

            init: function ($this) {
                $this.currency = this._cleanCur(this.data('currency'));
                $this.value = JBZoo.toFloat(this.data('value'));
                $this.showplus = this.data('showplus');
            },

            /**
             * Convert money to another format
             * @param currency
             * @param isAnimate
             */
            convert: function (currency, isAnimate) {
                var $this = this,
                    isAnimate = $this._def(isAnimate, true),
                    currency = $this._cleanCur(currency),
                    from = $this._getCurInfo($this.currency),
                    to = $this._getCurInfo(currency);

                if (currency == '%' || $this.currency == '%') {
                    return;
                }

                !from && $this.error('Currency from "' + $this.currency + '" is undefined');
                !to && $this.error('Currency to "' + currency + '" is undefined');

                var newValue = ($this.value / from.value) * to.value;
                if (isAnimate) {
                    $this.setValue(newValue, currency);
                } else {
                    $this._update(newValue, currency);
                }
                $this.currency = currency;
                $this.value = newValue;
            },

            /**
             * Set new value
             * @param value
             * @param currency
             */
            setValue: function (value, currency) {

                var $this = this,
                    value = JBZoo.toFloat(value),
                    currency = $this._cleanCur((currency || $this.currency));

                $this.currency = currency;

                if (currency == $this.currency) {

                    if ($this.value != value) {

                        $({value: $this.value})
                            .stop()
                            .animate({value: value}, {
                                duration: $this.options.duration,
                                easing  : $this.options.easing,
                                step    : function () {
                                    $this._update(this.value, $this.currency);
                                },
                                complete: function () {
                                    $this._update(value, $this.currency);
                                    $this.value = value;
                                }
                            });
                    }
                }

            },

            /**
             * Update view
             * @param value
             * @param currency
             * @private
             */
            _update: function (value, currency) {

                var $this = this,
                    format = $this._getCurInfo(currency).format,
                    isPositive = (value >= 0);

                value = $this._round(currency, value);

                if ($.isFunction($this.options.onBeforeUpdate)) {
                    value = $this.options.onBeforeUpdate.apply($this, [value]);
                }

                var formated = JBZoo.numberFormat(Math.abs(value), format.num_decimals, format.decimal_sep, format.thousands_sep),
                    template = isPositive ? format.format_positive : format.format_negative;

                formated = template
                    .replace('%v', '<span class="jbcurrency-value">' + formated + '</span>')
                    .replace('%s', '<span class="jbcurrency-symbol">' + format.symbol + '</span>');

                if ($this.showplus) {
                    formated = '+' + formated;
                }

                //$this.currency = currency;
                if ($this.el.is('input')) {
                    $this.el.val(JBZoo.stripTags(formated));
                } else {
                    $this.el.html(formated);
                }

                if ($.isFunction($this.options.onAfterUpdate)) {
                    $this.options.onAfterUpdate.apply($this, [value]);
                }
            },

            /**
             * @param currency
             * @param value
             * @returns {string}
             * @private
             */
            _round: function (currency, value) {

                // TODO smart rounding
                var $this = this,
                    format = $this._getCurInfo(currency).format,
                    roundType = format.round_type,
                    roundValue = format.round_value;

                if (roundType == 'ceil') {
                    var base = Math.pow(10, roundValue);
                    value = Math.ceil(value * base) / base;

                } else if (roundType == 'classic') {
                    value = $this.jbzoo.round(value, roundValue);

                } else if (roundType == 'floor') {
                    var base = Math.pow(10, roundValue);
                    value = Math.floor(value * base) / base;

                } else {
                    value = $this.jbzoo.round(value, $this._defaultRound);
                }

                return value;
            },

            /**
             * @param currecny
             * @returns {string}
             * @private
             */
            _cleanCur: function (currency) {

                var $this = this,
                    rates = JBZoo.getVar('currencyList');

                currency = $.trim(currency).toLowerCase();

                if (currency == '%') {
                    return currency;
                }

                if (currency == this._defaultCur) {
                    return $.trim($this.data('currency')).toLowerCase();
                }

                if (!rates[currency]) {
                    $this.error('Undefined currency - ' + currency);
                }

                return currency;
            },

            /**
             * @param currency
             * @returns {*}
             * @private
             */
            _getCurInfo: function (currency) {
                var $this = this,
                    rates = JBZoo.getVar('currencyList');

                return rates[$this._cleanCur(currency)];
            },

            'change {element}': function (e, $this) {
                $this.setInputValue($(this).val());
            },

            'keypress {element}': function (e, $this) {
                if ($this._key(e, 'enter')) {
                    $this.setInputValue($(this).val());
                    return false;
                }
            },

            setInputValue: function (newValue) {
                newValue = JBZoo.toFloat(newValue);
                this._update(newValue, this.currency);
            }
        }
    );

})(jQuery, window, document);
/* media/zoo/applications/jbuniversal/assets/js/widget/heightfix.js */
/**
 * JBZoo App is universal Joomla CCK, application for YooTheme Zoo component
 *
 * @package     jbzoo
 * @version     2.x Pro
 * @author      JBZoo App http://jbzoo.com
 * @copyright   Copyright (C) JBZoo.com,  All rights reserved.
 * @license     http://jbzoo.com/license-pro.php JBZoo Licence
 */

;
(function ($, window, document, undefined) {

    /**
     * Height fix plugin
     */
    JBZoo.widget('JBZoo.HeightFix', {
        timeout: 500,
        element: '.column'
    }, {

        init: function ($this) {

            $this.updateSizes();

            // lisen document changes
            if ($this.options.timeout > 0) {
                setInterval(function () {
                    $this.updateSizes();
                }, $this.options.timeout);
            }
        },

        /**
         * Recalc all heights
         */
        updateSizes: function () {
            var $this = this;

            if ($this.$('.jsHeightFixRow').length > 0) {
                $this.$('.jsHeightFixRow').each(function (n, row) {
                    $this._updateColumnCollect($(row));
                });
            } else {
                $this._updateColumnCollect($this.el);
            }

        },

        /**
         * Fix block height
         * @param $row
         * @private
         */
        _updateColumnCollect: function ($row) {
            var $this = this,
                maxHeight = 0;

            $row.find($this.options.element)
                .css('height', 'auto')
                .each(function (n, obj) {
                    var tmpHeight = JBZoo.toInt($(obj).height());
                    if (maxHeight < tmpHeight) {
                        maxHeight = tmpHeight;
                    }
                })
                .css({height: maxHeight});
        }


    });

})(jQuery, window, document);
/* media/zoo/applications/jbuniversal/assets/js/widget/colors.js */
/**
 * JBZoo App is universal Joomla CCK, application for YooTheme Zoo component
 *
 * @package     jbzoo
 * @version     2.x Pro
 * @author      JBZoo App http://jbzoo.com
 * @copyright   Copyright (C) JBZoo.com,  All rights reserved.
 * @license     http://jbzoo.com/license-pro.php JBZoo Licence
 * @coder       Alexander Oganov <t_tapak@yahoo.com>
 */

;
(function ($, window, document, undefined) {

    JBZoo.widget('JBZoo.Colors',
        {
            'multiple': true,
            'type'    : 'radio'
        },
        {
            init: function () {
                this.el.find('input[type=' + this.options.type + ']:checked').next().addClass('checked');
            },

            reset: function () {

                var $this = this;

                $this.$('.jbcolor-input')
                    .removeAttr('checked')
                    .addClass('unchecked')
                    .removeClass('checked')
                    .next()
                    .removeClass('checked');
            },

            'click .jbcolor-input': function (e, $this) {

                var $field = $(this);

                if (!$this.options.multiple) {
                    if ($field.hasClass('checked')) {
                        $field
                            .removeAttr('checked')
                            .addClass('unchecked')
                            .removeClass('checked')
                            .next()
                            .removeClass('checked');

                        $field.trigger('change');
                    } else {
                        $this.$('.jbcolor-input').removeClass('checked');
                        $this.$('.jbcolor-label').removeClass('checked');

                        $field
                            .attr('checked', true)
                            .addClass('checked')
                            .removeClass('unchecked')
                            .next()
                            .addClass('checked');
                    }
                } else {

                    if ($field.hasClass('checked')) {
                        $field
                            .removeClass('checked')
                            .next()
                            .removeClass('checked');

                        $field.trigger('change');
                    } else {
                        $field
                            .addClass('checked')
                            .next()
                            .addClass('checked');
                    }

                }
            }
        }
    );

})(jQuery, window, document);
