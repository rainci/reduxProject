import { Icon, Button } from 'antd';
import React, { Component } from 'react';
let Buttons = ()=>{
    return(
        <div>
            <Button icon='down' type='primary' disabled >primary</Button>
            <Button shape='circle' size='large' loading>circle</Button>
            <Button  icon='user' size='large'>user</Button>
            <Button  size='large' ><Icon type="question" style={{ fontSize: 16, color: '#08c' }} spin/>questions</Button>       
        </div>
    )
}
export default Buttons;