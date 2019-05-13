import React, {PureComponent} from 'react';
import Slider from 'react-slider-light';
import 'react-slider-light/lib/index.css';

export default class SliderDemo extends PureComponent {
    render(){
        return (
            <div>
                我我哦我
                <Slider>
                    <div>page1</div>
                    <div>page2</div>
                </Slider >
            </div>
            
        )
    }
}