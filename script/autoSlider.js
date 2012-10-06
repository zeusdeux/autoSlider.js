/******************************************************************************************************

Author : Mudit Ameta
Link   : http://experiments.muditameta.com/autoslider/
Version: v1.0 | 2012Aug03

License: MIT License
Copyright (c) 2010 Edwin Martin

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

******************************************************************************************************/
(function ($) {
    $.fn.autoSlider = function (options) {

        $this = this;

        options = $.extend({
            'interval': 4000,
            'animation': 'pingPong'
        }, options);

        if (options.slidesContainerId[0] != '#') {
            options.slidesContainerId = '#' + options.slidesContainerId;
        }

        $this.css('overflow', 'hidden');

        $(options.slidesContainerId).css({
            'overflow': 'hidden',
            'position': 'relative'
        });

        $(options.slidesContainerId).children().each(function () {
            $(this).css('float', 'left');
        });

        //setting properties---------------------------------------------------------------------------  
        var slideWidth = $(options.slidesContainerId).children().filter(":first").outerWidth(true); //true because we want margin to be included in width too
        var slideCount = $(options.slidesContainerId).children().length;
        var sliderTimeout = 0;
        var stopPosition = Math.ceil(slideWidth * (slideCount - 1));
        var initialLeftPosition = Math.floor($this.offset().left);
        var reverseFlag = 0
        $(options.slidesContainerId).css({
            'width': (Math.ceil(slideWidth * slideCount)) + 'px'
        });


        //Animation functions----------------------------------------------------------------------------
        var AnimationTypes = function () {

        }

        //Prototype for animation types supported
        AnimationTypes.prototype = {

            //pingPong
            pingPong: function () {
                var currPos = Math.floor($(options.slidesContainerId).position().left - initialLeftPosition);
                if (currPos == 0) {
                    reverseFlag = 0;
                }
                if ((currPos <= 0) && (Math.abs(currPos) < stopPosition) && (reverseFlag != 1)) {
                    reverseFlag = 0;
                    $(options.slidesContainerId).stop(true).animate({
                        left: "-=" + slideWidth + "px"
                    });
                }
                if (Math.abs(currPos) == stopPosition || reverseFlag == 1) {
                    reverseFlag = 1;
                    $(options.slidesContainerId).stop(true).animate({
                        left: "+=" + slideWidth + "px"
                    });
                }
            },

            //scrollFromFirst
            scrollFromFirst: function () {
                var currPos = Math.floor($(options.slidesContainerId).position().left - initialLeftPosition);

                if ((currPos <= 0) && (Math.abs(currPos) < stopPosition)) {
                    $(options.slidesContainerId).stop(true).animate({
                        left: "-=" + slideWidth + "px"
                    });
                }
                if (Math.abs(currPos) == stopPosition) {
                    $(options.slidesContainerId).stop(true).animate({
                        left: "0px"
                    });
                }
            }

        }

        //local object containing AnimationTypes prototype
        var AnimationType = new AnimationTypes();

        //Decides animation function based on options (need to redo this part to streamline stuff and make stuff more idiomatic)
        var decider = function () {
            if (options.animation == 'pingPong') {
                AnimationType.pingPong();
            }
            if (options.animation == 'scrollFromFirst') {
                AnimationType.scrollFromFirst();
            }
        }

        //handlers for window resize, focus and blur-----------------------------------------------------
        $(window).resize(function () {
            initialLeftPosition = Math.floor($this.offset().left);
            window.clearInterval(sliderTimeout);
            sliderTimeout = 0;
            sliderTimeout = window.setInterval(function () {
                decider();
            }, options.interval);
        });

        sliderTimeout = window.setInterval(function () {
            decider();
        }, options.interval);

        $(window).focus(function () {
            if (!sliderTimeout) sliderTimeout = window.setInterval(function () {
                decider();
            }, options.interval);
        });

        $(window).blur(function () {
            window.clearInterval(sliderTimeout);
            sliderTimeout = 0;
        });

        //returning parent div object so other jquery functions can be chained---------------------------
        return $this;

    };
})(jQuery);