import React from 'react';
import Swiper from 'react-id-swiper';
// Need to add Pagination, Navigation modules
import { Pagination, Navigation } from 'swiper/dist/js/swiper.esm'
import 'swiper/dist/css/swiper.css'
const SimpleSwiperWithParams = () => {
  const params = {
    modules: [Pagination, Navigation],
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  }

  return(
    <Swiper {...params} style={{width:'200px'}}>
      <div style={{'height':'200px', 'background':'pink'}}>Slide 1</div>
      <div style={{'height':'200px', 'background':'pink'}}>Slide 2</div>
      <div style={{'height':'200px', 'background':'pink'}}>Slide 3</div>
      <div style={{'height':'200px', 'background':'pink'}}>Slide 4</div>
      <div style={{'height':'200px', 'background':'pink'}}>Slide 5</div>
    </Swiper>
  )
}

export default SimpleSwiperWithParams;