import React, { PureComponent } from "react";
import cookie from 'react-cookies';
import * as TOOLS from '../../static/js/tools';
import server ,{T}from '../../api/server';
import { message } from 'antd';
export default function getPermission(propss,fn){
    return function wrapWithPermission(WrappedComponent){
        class getPermission extends PureComponent{
            constructor(props){
                super(props)
            }
            /***********公共方法 begin **************/
            permissionData = () => {//获取总权限data
                return server.getPermissData().then( db => {
                    const { code, data = {}, msg } = db;
                    if (code === '200' || code === 200) {
                        console.log('aaaa:',data)
                        return data
                    }else{
                        message.error(msg)
                    }
                        
                })
                .catch( err=> {
                    
                })
            }
            /***********公共方法 end **************/
            /***********业务方法 begin **************/
            getPermissionFn = () => {//获取总权限fn
                this.permissionData()
            }
            /***********业务方法 end **************/
            /***********生命周期 begin **************/
            componentDidMount(){
                let {accessToken:cookieToken, code:cookieCode} = cookie.load("jwtToken");//get token
                let { accessToken,code } = TOOLS.getList('jwtToken');
                let funcVoList = TOOLS.getList('funcVoList');//总权限集
                if(!cookieToken){//如果不存在，跳登录页面
                    return this.props.history.push('/login')
                }
                if(cookieToken==accessToken || !funcVoList){//当cookie中的token和sessionStorge中的token不一致时
                    this.getPermissionFn()
                }

            }
            /***********生命周期 end **************/
            render(){
                return  <WrappedComponent {...propss} />
            }
        } 
        return getPermission;   
    }
}

