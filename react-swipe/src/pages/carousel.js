import React, {PureComponent} from 'react';
import { Carousel, Icon } from 'antd';
import CarouselSlide from '../components/carousel'
const CarouselPage = () => {
    return(
        <div style={{'width':'300px', 'height':'300px'}}>
            <CarouselSlide />
        </div>
        
    )
}
export default CarouselPage

