import React from "react";
import Draggable from 'react-draggable';
import './drag.less';

var deltaX=1,deltaY=1,translate={x:0,y:0};

class BigImg extends React.Component{
    constructor(props){
        super(props)
        this.state={
            imgBoxWidth:{width:"100%",height:"100%"},
            imgScale:{transform:`scale(1,1)`,transformOrigin:"0 0 0"}
        }
    }
    imgOnLoad(e){
        //console.log(e)
        let width=e.target.width;
        let height=e.target.height;
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let marginLeft = (windowWidth-width)/2;
        let marginTop = (windowHeight-height)/2;
        if(width>height){
            deltaY = windowWidth/width;
        }else{
            deltaY = windowHeight/height;
        }
        this.setState({
            imgBoxWidth:{width,height,marginLeft,marginTop},
            imgScale:{transform:`scale(${deltaY},${deltaY})`,transformOrigin:`${width/2}px ${height/2}px 0`}
        })
    }
    onMouseWheel(e){
        e.preventDefault();
        e.stopPropagation()
        let width=e.target.offsetWidth;
        let height=e.target.offsetHeight;
        let delta = e.deltaY > 0 ? -1 : 1;
        deltaX += delta*0.02;
        deltaY += delta*0.02;
        if(deltaY < 0.1){
            deltaY = 0.1
        }else if(deltaY > 5){
            deltaY = 5
        }
        this.setState({
            imgScale:{transform:`scale(${deltaY},${deltaY})`}
        })
        
    }
    render(){
        return (
            <div className="bigImg">
                <i className="close">x</i>
                <Draggable
                    handle="#imgBox"
                    scale={2}
                >
                    <div id="imgBox" className="imgBox" ref="imgBox" style={this.state.imgBoxWidth}
                        onWheel={this.onMouseWheel.bind(this)}
                    >
                        <div className="imgCover" ref="imgCover" style={{...this.state.imgScale}}></div>
                        <img id="bigImg" ref="bigImg" onLoad={this.imgOnLoad.bind(this)}  src={bigImgUrl}
                            style={{...this.state.imgScale}}
                        />
                    </div>
                </Draggable>
                
            </div>
        )
    }
}
export default BigImg;