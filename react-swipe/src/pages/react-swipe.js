import React from 'react';
import ReactSwipe from 'react-swipe';

const Carousel = () => {
  let reactSwipeEl;
  return (
    <div style={{'width': '300px'}}>
      <ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: false }}
        ref={el => (reactSwipeEl = el)}
      >
        <div style={{'height':'200px', 'background':'pink'}}>PANE 1</div>
        <div style={{'height':'200px', 'background':'blue'}}>PANE 2</div>
        <div style={{'height':'200px', 'background':'green'}}>PANE 3</div>
      </ReactSwipe>
      <button onClick={() => reactSwipeEl.next()}>Next</button>
      <button onClick={() => reactSwipeEl.prev()}>Previous</button>
    </div>
  );
};
export default Carousel;