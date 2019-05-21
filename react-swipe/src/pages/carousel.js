import React, {PureComponent} from 'react';
import { Carousel, Icon } from 'antd';
import CarouselSlide from '../components/carousel'
const CarouselPage = () => {
    return(
        <div className='carouselPage' style={{'width':'420px', 'height':'300px', 'margin':'auto'}}>
            <CarouselSlide />
        </div>
        
    )
}
export default CarouselPage

