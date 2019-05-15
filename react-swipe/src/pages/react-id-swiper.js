import React from 'react';
import Swiper from 'react-id-swiper';
// Need to add Pagination, Navigation modules
import { Navigation } from 'swiper/dist/js/swiper.esm'
import 'swiper/dist/css/swiper.css'
const SimpleSwiperWithParams = () => {
  const params = {
    modules: [Navigation],
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    // renderPrevButton: () => <button className="swiper-button-prev">Prev</button>,
    // renderNextButton: () => <button className="swiper-button-next">Next</button>,
  }

  return (
      <div style={{width:'300px','margin':'0 auto'}}>
      <Swiper {...params}>
        <div style={{ 'height': '200px', 'background': 'pink' }}>Slide 1</div>
        <div style={{ 'height': '200px', 'background': 'pink' }}>Slide 2</div>
        <div style={{ 'height': '200px', 'background': 'pink' }}>Slide 3</div>
        <div style={{ 'height': '200px', 'background': 'pink' }}>Slide 4</div>
        <div style={{ 'height': '200px', 'background': 'pink' }}>Slide 5</div>
      </Swiper>
    </div>
  )
}

export default SimpleSwiperWithParams;