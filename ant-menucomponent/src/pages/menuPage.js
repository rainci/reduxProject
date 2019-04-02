import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, message, Row, Col, Tag } from 'antd';
import server from '../api/server';
import MenuComponent from '../components/menuComponent';
import { generateList, changeArrayToString } from '../utils';
import { menuCheckedAction, menuCloseAction } from '../redux/actions';

class MenuReset extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuData: [],
            sampleMenuData: new Map(),
        }
    }
    /***********公共方法 begin *****************/
    getMenuListData = () => {//获取menu data
        return server.getMenuData({ 'belong': 'sort' }).then((db) => {
            const { code, data = [], msg } = db;
            if (code === 200 || code === '200') {
                return data
            } else {
                message.error(msg)
            }
        })
    }
    /***********公共方法 end *****************/
    /***********业务方法 begin *****************/
    getMenuDataFn = () => {//获取menuData
        this.getMenuListData()
            .then(db => {
                if (db.length) {
                    this.setState({
                        menuData: db[0].children,
                        sampleMenuData: generateList(db[0].children, true)
                    })
                }
            })
    }
    aaaFn = ({ checkedKeys, leaf, relationLeaf }) => {
        console.log('wawo,the end data:', checkedKeys, leaf, relationLeaf)
        let menuCheckedData = changeArrayToString({ data: relationLeaf, matchParam: ['tagId', 'name'] });
        this.props.onMenuCheckedFn({ menuCheckedData, menuCheckedKeys: checkedKeys })
    }
    /***********业务方法 end *****************/
    /***********生命周期 begin **************/
    componentDidMount() {
        this.getMenuDataFn()//talelist get data
    }
    /***********生命周期 end **************/
    render() {
        let { menuData, sampleMenuData,} = this.state;
        return (
            <Row>
                <Col span={5}>
                    {
                      menuData && menuData.length ?
                      <MenuComponent
                        menuData={menuData}
                        sampleMenuData={sampleMenuData}
                        menuCheckedKeys={this.props.menuPageReducer.menuCheckedKeys}
                        // menuSideLine={8}
                        menuDataCheckedFn={this.aaaFn}
                    // menuSideStyle = {{'height':'800px'}}
                    // menuAlertStyle = {{'height':'800px'}}
                    /> 
                    :null
                    }
                </Col>
                <Col span={15} style={{ 'textAlign': 'left' }}>
                    aaaaaaaaaa
                    <div>
                        {
                            this.props.menuPageReducer.menuCheckedData.map((item, key) => {
                                const { name, tagId } = item;
                                return <Tag closable key={tagId} id={tagId} onClose={() => this.props.onMenuCloseFn(tagId)}>{name}</Tag>
                            })
                        }
                    </div>
                </Col>
            </Row>
        )
    }
}
const mapStateToProps = state => ({
    menuPageReducer: state.menuPageReducer
})
const mapDispatchToProps = dispatch => ({
    onMenuCheckedFn: ({ menuCheckedData, menuCheckedKeys }) => dispatch(menuCheckedAction({ menuCheckedData, menuCheckedKeys })),//menu click
    onMenuCloseFn: tagId => dispatch(menuCloseAction(tagId))// 页面tag close
})
export default connect(mapStateToProps, mapDispatchToProps)(MenuReset);