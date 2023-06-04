
( function( $ ) {

    /******** Navbar Scroll *********/
    $(window).scroll(function(){
        if($(window).scrollTop() > 30) {
            $('.navbar').addClass('navbar-bg').fadeIn(300);
        }
        else{
            $('.navbar').removeClass('navbar-bg').fadeIn(300);
        }
    });

    if($(window).scrollTop() > 30){
        $('.navbar').addClass('navbar-bg').fadeIn(300);
    }

    /******** Wow Carousel *********/
    $('.loop-3').owlCarousel({
        autoplay: true,
        items: 3,
        loop:true,
        margin: 0,
        nav: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        responsive:{
            0:{
                items: 1,
            },
            380:{
                items: 2,
            },
            768:{
                items: 3,
            }
        }
    });
    $('.loop-2').owlCarousel({
        autoplay: true,
        items: 1,
        loop:true,
        margin: 0,
        nav: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        responsive:{
            600:{
                items: 1
            }
        }
    });

    $('.loop').owlCarousel({
        autoplay: true,
        items: 2,
        loop:true,
        margin: 30,
        dots: false,
        nav: true,
        navText: ['<i class="ion ion-arrow-left-c"></i>', '<i class="ion ion-arrow-right-c"></i>'],
        responsive:{
            0:{
                items: 1
            },
            576:{
                items: 2
            }
        }
    });

    /******** video *********/
    $(document).ready(function() {
        // Gets the video src from the data-src on each button

        var $videoSrc;
        $('.video-btn').click(function() {
            $videoSrc = $(this).data( "src" );
        });
        console.log($videoSrc);

        // when the modal is opened autoplay it
        $('#call-video').on('shown.bs.modal', function (e) {

            // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
            $("#video").attr('src',$videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1" );
        })

        // stop playing the youtube video when I close the modal
        $('#call-video').on('hide.bs.modal', function (e) {
            // a poor man's stop video
            $("#video").attr('src',$videoSrc);
        })
    });

    /******** Scroll script *********/
    $('.scroll-to').click(function(){
        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top - 64
        }, 1000);
        return false;
    });

}( jQuery ) );