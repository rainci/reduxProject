import React from 'react';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css'
// import Select from './aaa'

// class Date extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             date: ''
//         }
//         this.handleClick = this.handleClick.bind(this)
//     }
//     handleClick(date){
//         message.info('您选择的日期是: ' + (date ? date.toString() : ''));
//         this.setState({ date })
//     }
//     render(){
//         return(
//             <LocaleProvider locale={zhCN}>
//                 <div style={{ width: 400, margin: '100px auto' }}>
//                     <DatePicker onChange={value => this.handleClick(value)} />
//                     <div style={{ marginTop: 20 }}>当前日期：{this.state.date && this.state.date.toString()}</div>
//                 </div>
//             </LocaleProvider>
//         )
//     }
// }
// export default Date;
import { Form, Icon, Input, Button, Checkbox, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing2', 'Suzhou', 'Zhenjiang'],
};


class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cities: cityData[provinceData[0]],
            secondCity: cityData[provinceData[0]][0],
        }
    }
    handleSubmit = (e) => {
        const { form: { validateFields } } = this.props;
        e.preventDefault();
        // validateFields(['userName', 'password'], { firstFields: ['userName'] }, (err, values) => {
        validateFields((err, values) => {

            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleProvinceChange = (e) => {
        this.setState({
            cities: cityData[e],
            secondCity: cityData[e][0],
        });
    }
    onSecondCityChange = value => {
        this.setState({
            secondCity: value,
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { cities, secondCity } = this.state;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form" style={{ width: '300px' }}>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password2', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <div style={{'clear':'both','height':'40px'}}>
                    <FormItem style={{'float':'left'}}>
                        {getFieldDecorator('province', {
                            initialValue:provinceData[0]
                        })(
                            <Select
                                style={{ width: 120 }}
                                onChange={this.handleProvinceChange}
                            >
                                {provinceData.map(province => <Option key={province}>{province}</Option>)}
                            </Select>


                        )}
                    </FormItem>
                    
                    <FormItem style={{'float':'left'}}>
                        {getFieldDecorator('city', {
                            initialValue:secondCity
                        })(
                            <Select
                                style={{ width: 120 }}
                               
                                onChange={this.onSecondCityChange}
                            >
                                {cities.map(city => <Option key={city}>{city}</Option>)}
                            </Select>

                        )}

                    </FormItem>
                    </div>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;