/**
 * 
 * @param {Array} resourceListData 数据源
 * @param {Function} onInformationFn  点击tag标签回调函数
 * @return {component} ImgVideoList 
 * @author rainci(刘雨熙)
 * @time 2019.4.29
 */
import React from 'react';
import { Tag, List } from 'antd';
import './style/index.less'
import btnplay from '../../static/img/btnplay.svg'
export const imgOnLoadFn = e => {//图片download时
    let style = {};
    if (e.target.width < e.target.height) {
        style.width = 'auto';
        style.height = '222px';
        style.position = 'relative'
    } else {
        style.width = '222px';
        style.height = 'auto';
        style.marginTop = (222 - 222 * e.target.height / e.target.width) / 2 + 'px';
    }
    Object.assign(e.target.style, { ...style });
}
const ImgVideoList = ({ resourceListData,comFlag=true, onInformationFn }) => {
    const infomationFn = (item) => { //tag点击展示详情页callback
        onInformationFn && onInformationFn(item)
    }
    return ( 
        <ul className='imgVideoUl'>
            {
                resourceListData && resourceListData.length ? resourceListData.map((item, index) => {
                    let { title, createTime, origin,author, id, description, videoTime='2:10:23', itemStatus='等待人审', placeList=[{name:'women'},{name:'man'},{name:'women'},{name:'man'},{name:'women'},{name:'man'},{name:'women'},{name:'man'},{name:'women'},{name:'man'},{name:'women'},{name:'man'},{name:'women'},{name:'man'},{name:'women'},{name:'man'},{name:'women'},{name:'man'},{name:'women'},{name:'man'},{name:'women'},{name:'man'},{name:'women'},{name:'man'},{name:'women'},{name:'man'},{name:'women'},{name:'man'},{name:'women'},{name:'man'},{name:'women'},{name:'man'},] } = item;
                    return (
                        <li className='imgVideoLi' key={index}>
                            <div className='imgVideoLiBox'>
                                <div className='liExtra'>
                                    <a href={'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'} target='_blank' rel='noopener noreferrer'>
                                        <img
                                            key={'img' + id + index}
                                            onLoad={imgOnLoadFn}
                                            src={'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'}
                                            alt=''
                                        />
                                        {
                                            comFlag ? <img className='liPlayBtn' src={btnplay} alt=""/>
                                            :null
                                        }
                                    </a>
                                    {
                                        comFlag ? <p className='liTime'>{videoTime}</p>
                                        :null
                                    }                                    
                                {/* <a className='imgVideoThumb' href={'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'} target='_blank'><img width={222} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" /></a> */}
                                </div>
                                <div className='liMain'>
                                    <div className='liMainMeta'>
                                        <h2>
                                            <span>{title}</span>
                                            <Tag className='imgVideoStatusTag'>{itemStatus}</Tag>
                                            <Tag className='imgVideoInfoTag' color='#108ee9' onClick={()=>infomationFn(item)}>详情</Tag>

                                        </h2>
                                        <div className='liMetaDes'>
                                            <span>{createTime}</span> · <span style={{ color: '#4780FF' }}>{origin}</span> · <span style={{ color: '#4780FF' }}>{author}</span>
                                        </div>
                                    </div>
                                    <div className='liMainContent'>
                                        <h4>{description}</h4>
                                        <div className='liTagBoxOne'>
                                            {
                                                placeList.map((item,index)=>{
                                                    return <Tag key={index}>{item.name}</Tag>    
                                                })  
                                            }  
                                        </div>
                                        <div className='liTagBoxTwo'>
                                            {
                                                placeList.map((item,index)=>{
                                                    return <Tag key={index}>{item.name}</Tag>    
                                                })  
                                            }  
                                        </div>
                                        <div className='liTagBoxThree'>
                                            {
                                                placeList.map((item,index)=>{
                                                    return <Tag key={index}>{item.name}</Tag>    
                                                })  
                                            }  
                                        </div>
                                    </div>
                                    
                                </div> 
                            </div>
                            {/* < List
                    itemLayout="vertical"
                    renderItem={
                        item => (
                            <List.Item
                                key={item.title}
                            >
                                <List.Item.Meta
                                    title={<div><span style={{ fontWeight: 'bold' }}>{item.title}</span><Tag className='resourceTag' color='#108ee9' onClick={() => infomationFn(item)}>详情</Tag></div>}
                                    description={<div><span>{item.createTime}</span> · <span style={{ color: '#4780FF' }}>{item.origin}</span></div>}
                                />
                                {item.description}
                            </List.Item>

                        )
                    }
                /> */}
                        </li>
                    )


                })
                    : <li style={{ 'width': '100%',  'lineHeight': '280px', 'textAlign': 'center' }}>暂无数据</li>
            }
        </ul>
    )
}
export default ImgVideoList