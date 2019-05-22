/**
 * 
 * @param {Array} tagCustomData tag数据
 * @param {Boolen} displayFlag 是否让最后一个小图标消失
 * @return {component} TagCustom 
 * @author rainci(刘雨熙)
 * @time 2019.4.29
 */
import React from 'react'
import './style/index.less'
const TagCustom = ({tagCustomData=[],displayFlag}) => {
    let classNames = displayFlag ? "tagWrap tagDisplayWrap" : "tagWrap";
    return (
        <div className={classNames}>
            {
                tagCustomData && tagCustomData.length ? tagCustomData.map(item => {
                    let {name, tagId} = item;
                    return (
                        <span key={tagId}>{name}</span>
                    )
                })
                :null
            }
        </div>
    )
}
export default TagCustom