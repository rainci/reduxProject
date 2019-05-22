/**
 * 
 * @param {Array} liKeyData 左侧list菜单
 * @param {Array} specialKeys 当有specialKeys时，此字段是带a链接字段
 * @param {Array} tagKeys 当有tagKeys时，此字段渲染tagCustom组件 默认是不带displayFlag属性的
 * @param {Array} dealTagKeys 当有dealTagKeys时，此字段渲染带displayFlag属性的tagCustom组件
 * @param {Object} operateObj 当有operateObj时，此key字段对应相应的回调函数
 * @param {Object} resourceData 数据源
 * @param {Boolean} alertShow modal是否展示
 * @param {String} width 弹框宽度
 * @param {Function} alertCloseFn  //关闭弹框时回调
 * @param {Function} operateFn 操作回调
 * @return {component} ImgVideoAlert 
 * @author rainci(刘雨熙)
 * @time 2019.4.29
 */
import React from "react";
import { Modal, message } from 'antd'
import './style/index.less'
import TagCustom from '../tagCustom'
const  defaultOperateCss = {'color':'red'};
const ImgVideoAlert = ({ liKeyData = [], resourceData = {}, alertCloseFn, alertShow = false, width = '650px',specialKeys=[], operateObj={}, tagKeys=[], dealTagKeys, operateCss=defaultOperateCss }) => {
    const _detailAlertClose = () => {//关闭弹框时回调
        alertCloseFn && alertCloseFn(true)
    }
    const _operateDetailFn = key => {//有特殊操作的字段的回调函数
        typeof operateObj[key] === 'function' && operateObj[key]();
    }
    const _renderHtml = ({key,name}) => {//渲染table右边内容
        if(resourceData && !Object.keys(resourceData).length)return;
        //specialKeys的值增加a标签
        if( specialKeys && specialKeys.includes(key) ){
            return <a href={resourceData[key]} target='_blank' rel="noopener noreferrer">{resourceData[key]}</a>    
        }
        //operateKeys的值增加点击回调事件
        let operateKeys = Object.keys(operateObj);
        if( operateKeys && operateKeys.includes(key) ){
            return <span onClick = {()=>_operateDetailFn(key)} style={operateCss}>{resourceData[key]}</span>    
        } 
        //tagKeys的值渲染为TagCustom组件
        if(tagKeys && tagKeys.includes(key)){
            return (
                resourceData[key] && resourceData[key].map((item,index)=>{
                    return <TagCustom key={index} tagCustomData={item} displayFlag={dealTagKeys && dealTagKeys.includes(key) ? true : false} />   
                })
            )
        }
        //当resourceData的某个key的值为Object时，不渲染任何内容并提示信息
        if(typeof resourceData[key] === 'object'){
            return message.warn(`${name}的值不能为对象，请检查`)    
        }
        // 正常渲染resourceData的key的值
        return <span>{resourceData[key]}</span>   
    }
    return (
        <Modal
            // title="数据集列表"
            visible={alertShow}
            width={width}
            footer={null}
            onCancel={_detailAlertClose}
        >
            <div className='detailAlert'>
                <table>
                    <tbody>
                        {
                            liKeyData && liKeyData.length ? liKeyData.map((item, index) => {
                                const { name } = item;
                                return (
                                    <tr key={index}>
                                        <td className='alertLiKey'><span >{name}</span></td>
                                        <td>
                                            {
                                                _renderHtml(item)
                                            }
                                        </td>
                                    </tr>
                                )
                            }) :
                                <tr>
                                    <td width='100%'>暂无数据</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </Modal>

    )
}
export default ImgVideoAlert
