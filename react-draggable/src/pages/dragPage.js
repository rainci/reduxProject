import React from "react";
import DragImg from '../components/drag'
import test from './test.jpeg'
class DragPage extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <DragImg dragImgUrl={test}>
                </DragImg>    
            </div>
        )
    }
}
export default DragPage;