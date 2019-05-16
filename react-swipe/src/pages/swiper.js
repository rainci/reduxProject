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
        new Swiper('.swiper-container', {
            slidesPerView: 1,
            centeredSlides: true,
            // virtual: {
            //     slides: this.state.newlist,
            // },
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })
    }
    render() {
        return (
            <div className='new' style={{ 'width': '300px', 'height': '300px', 'background': 'pink' }}>
                <div className="swiper-container" style={{ 'width': '300px', 'height': '300px', 'background': 'pink' }}>
                    <div className="swiper-wrapper" >
                        <div class="swiper-slide">Slide 1</div>
                        <div class="swiper-slide">Slide 2</div>
                        <div class="swiper-slide">Slide 3</div>
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>
        )
    }
}

export default New;