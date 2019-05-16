import React, { Component } from 'react';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'

class New extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     newlist: [0, 1, 2]
        // }
    }
    componentDidMount() {
        var mySwiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            // centeredSlides: true,
            loop: true,
            autoplay:3000,
            // autoplay: {
            //     delay:2000,
            //     disableOnInteraction: false
            // },
            // virtual: {
            //     slides: this.state.newlist,
            // },
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })
        // mySwiper.el.mouseover = function(){ //鼠标放上暂停轮播
        //     mySwiper.autoplay.stop();
        // }
        // mySwiper.el.mouseleave = function(){
        //     mySwiper.autoplay.start();
        // }
        // var slide = document.getElementsByClassName('swiper-slide');
        // for(var i=0; i< slide.length; i++){
        //     slide[i].onmouseenter = function(){
        //         mySwiper.autoplay.stop();
        //     }
        // }
        // console.log(slide)
        // document.getElementsByClassName('swiper-slide').mouseenter(function () {
            // mySwiper.autoplay.stop();
        //  })
        //  document.getElementsByClassName('swiper-slide')[0].mouseleave(function () {
        //     mySwiper.autoplay.start();
        //  })
    }
    render() {
        return (
            <div className='new' style={{ 'width': '300px', 'height': '300px', 'background': 'pink' }}>
                <div className="swiper-container" style={{ 'width': '300px', 'height': '300px', 'background': 'pink' }}>
                    <div className="swiper-wrapper" >
                        <div className="swiper-slide">Slide 1</div>
                        <div className="swiper-slide">Slide 2</div>
                        <div className="swiper-slide">Slide 3</div>
                    </div>
                    {/* <div className="swiper-pagination"></div> */}
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
            </div>
        )
    }
}

export default New;