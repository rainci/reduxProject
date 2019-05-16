import React from 'react';
import ReactSwipe from 'react-swipe';
import { Icon } from 'antd'
const Carousel = () => {
  let reactSwipeEl;
  return (
    <div style={{'width': '300px'}}>
      <ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: false }}
        ref={el => (reactSwipeEl = el)}
        swipeOptions={{ continuous: true }}
      >
        <div style={{'height':'200px', 'background':'pink'}}>PANE 1</div>
        <div style={{'height':'200px', 'background':'blue'}}>PANE 2</div>
        <div style={{'height':'200px', 'background':'green'}}>PANE 3</div>
      </ReactSwipe>
      <Icon type="left" onClick={() => reactSwipeEl.prev()} />
      <Icon type="right" onClick={() => reactSwipeEl.next()} />
    </div>
  );
};
export default Carousel;