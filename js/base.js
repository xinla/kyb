$(function(){
    $('#fullpage').fullpage({
        verticalCentered:false,
        anchors:['page1','page2','page3','page4','page5','page6'],
        navigation:true,
        navigationColor:'#f00',
    });

});

certifySwiper = new Swiper('#certify .swiper-container', {
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    loopedSlides: 5,
    autoplay: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        //clickable :true,
    },
    on: {
        progress: function(progress) {
            for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i);
                var slideProgress = this.slides[i].progress;
                var modify = 1;
                if (Math.abs(slideProgress) > 1) {
                    modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                }
                var translate = slideProgress * modify * 260 + 'px';
                var scale = 1 - Math.abs(slideProgress) / 5;
                var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                slide.css('zIndex', zIndex);
                slide.css('opacity', 1);
                if (Math.abs(slideProgress) > 3) {
                    slide.css('opacity', 0);
                }
            }
        },
        setTransition: function(transition) {
            for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i)
                slide.transition(transition);
            }

        }
    }

})
