/**
 * 
 * @param {Array} searchNames 
 * @param {Function} onSearchFn  
 * @return {component} UserSearch 
 * @author rainci(刘雨熙)
 */
import React from "react";
import { Form, Input, Row, Col, Button, } from 'antd';

const FormItem = Form.Item;

class UserSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userListFilter: {}
        }
    }
    searchFn = (e,fnName) => {
        e.preventDefault();  
        this.props.form.validateFields((err, filter) => {
            this.setState({
                userListFilter: {...filter}
            })
            // const { fnName } = this.props;
            this.props[fnName] && this.props[fnName](filter)
        })  
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { searchNames } = this.props;
        return (
            <div>
                <Form onSubmit={ (e) => { this.searchFn(e,'onSearchFn') } } className="ant-advanced-search-form">
                    <Row gutter={15}>
                        <Col span={24}>
                            {
                                searchNames.map(item => {
                                    const { name, value, num } = item;
                                    return (
                                        <Col key={name} span={num}>
                                            <FormItem>
                                                {getFieldDecorator(value)(
                                                    <Input placeholder={name} onBlur={ (e) => { this.searchFn(e,'onInputBlurFn') } } />
                                                )}
                                            </FormItem>
                                        </Col>
                                    )
                                })

                            }
                            <Col span={4}>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">
                                        搜索
                                    </Button>
                                </FormItem>
                            </Col>
                        </Col>

                    </Row>
                </Form>
            </div>
        )
    }
}

export default Form.create()(UserSearch)
