// app.js is used only for settings and initializing application

( function( $ ) {
    "use strict";

    $(document).ready(function(){

        /*==== Bootstrap action ====*/
        $('[data-toggle="popover"]').popover({
            html: true,
            content: function() {
                var id = $(this).attr('id')
                return $('#po' + id).html();
            }
        });

        /*==== Metarialize action ====*/
        $('.tabs').tabs();
        $('select').formSelect();
        $('.timepicker').timepicker();
        $('.datepicker').datepicker({ showDaysInNextAndPreviousMonths: true, showMonthAfterYear: true, showClearBtn: true, setDefaultDate: true });
        $('.dropdown-btn').dropdown();
        $('.drop-hover').dropdown({ hover: true, });
        $('.collapsible').collapsible();
        $('.tooltipped').tooltip();
        $('.modal').modal();
        // $(".word-last").lettering('words');

        $('.chips').chips();
        $('.chips-initial').chips({
            placeholder: 'Enter a tag',
            secondaryPlaceholder: '+Tag',
            data: [{
                tag: 'Apple',
            }, {
                tag: 'Microsoft',
            }, {
                tag: 'Google',
            }],
        });

        var elem = document.querySelector('.collapsible.expandable');
        var instance = M.Collapsible.init(elem, {
            accordion: false
        });


        /*=== video popup ===*/
        $(document).ready(function() {
            // Gets the video src from the data-src on each button

            var $videoSrc;
            $('.modal-trigger').click(function() {
                $videoSrc = $(this).data( "src" );
            });
            console.log($videoSrc);

            // when the modal is opened autoplay it
            $('#mod-video').on('shown.bs.modal', function (e) {

                // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
                $("#video").attr('src',$videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1" );
            })

            // stop playing the youtube video when I close the modal
            $('#mod-video').on('hide.bs.modal', function (e) {
                // a poor man's stop video
                $("#video").attr('src',$videoSrc);
            })
        });

        /*=== Wow Carousel ===*/
        $(".boot-slider").owlCarousel({
            autoPlay: true,
            loop: true,
            nav: true,
            margin: 0,
            navText: ['&#10094;', '&#10095;'],
            responsiveClass:true,
            responsive:{
                0:{
                    items:1
                }
            }
        });

    }); // End Document Ready

}( jQuery ) );