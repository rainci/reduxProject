/**
 * 
 * @author rainci(刘雨熙)
 * @time 2019.5.23
 */
import React from 'react';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import CarouselSlide from './index';

Enzyme.configure({ adapter: new Adapter() })   //在使用Enzyme 前需要先适配React对应的版本

const setup = () => {
    const CarouselWrapper = mount(<CarouselSlide />);
    return {
        CarouselWrapper,
    }
}
describe('test CarouselSlide component', () => { 
    
    it('test CarouselSlide props', () => {
        const { CarouselWrapper } = setup();
        expect(CarouselWrapper.find('div').at(0).hasClass('carouselBox')).toBe(true)
    }) 
})