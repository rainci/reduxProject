/**
 * 
 * @param {Array} tableListData 数据源 
 * @param {Array} columnsTable 表头 
 * @param {Array} selectedRowKeys 选中的key
 * @param {Function} onTableListCheck 回调  
 * @return {component} TableListCheck 
 * @author rainci(刘雨熙)
 */

/* eslint-disable  */
import React from "react";
import { DatePicker, Radio } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
const { Group: RadioGroup } = Radio;
const dateFormat = 'YYYY/MM/DD';
class DateChoose extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectDate: {
                startDate: '',
                endDate: '',
            }
        }
    }
    /***********DatePicker 日期公共方法 begin *****************/
    last7Days = () => { //默认选择时间为最近7天
        return {
            startDate: moment().startOf('day').subtract(6, 'days'),
            endDate: moment().endOf('day')
        };
    }
    lastWeek = () => {//上周
        // 获取今天是周几
        var day = new Date().getDay();
        return {
            startDate: moment().startOf('day').subtract(day + 7, 'days'),
            endDate: moment().startOf('day').subtract(day + 1, 'days')
        };
    }
    last30Days = () => { //近30天
        return {
            startDate: moment().startOf('day').subtract(1, 'months'),
            endDate: moment().endOf('day')
        };
    }
    lastMonth = () => { //上个月
        //获取年月日
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        const moreday = [1, 3, 5, 7, 8, 10, 12];
        const littleday = [4, 6, 9, 11];
        const selectDate = {
            startDate: '',
            endDate: ''
        };
        if (moreday.indexOf(month) > -1) {
            selectDate.startDate = moment().startOf('day').subtract(31 + strDate, 'days');
            selectDate.endDate = moment().startOf('day').subtract(strDate + 1, 'days');
        } else if (littleday.indexOf(month) > -1) {
            selectDate.startDate = moment().startOf('day').subtract(30 + strDate, 'days');
            selectDate.endDate = moment().startOf('day').subtract(strDate + 1, 'days');
        } else if (month == '3') {
            if ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) {
                selectDate.startDate = moment().startOf('day').subtract(29 + strDate, 'days');
                selectDate.endDate = moment().startOf('day').subtract(strDate + 1, 'days');
            } else {
                selectDate.startDate = moment().startOf('day').subtract(28 + strDate, 'days');
                selectDate.endDate = moment().startOf('day').subtract(strDate + 1, 'days');
            }
        }
        return selectDate;
    }
    /***********DatePicker 日期公共方法 end *****************/
    /***************************页面业务逻辑 begin ******************************/
    /***********DatePicker 业务逻辑 begin *****************/
    defaultDate = () => { //日历默认时间
        const selectDate = this.last7Days();
        this.setState({
            selectDate
        })
        // this.setState({
        //     selectDate: {
        //         startDate: moment('2015/01/01', dateFormat),
        //         endDate:moment('2015/01/01', dateFormat)
        //     }
        // })
    }
    changeDateFn = (e) => {//更换日期
        // debugger
        console.log(this.state.selectDate)
        if (e.target.value == '1') {
            this.setState({
                selectDate: { ...this.last30Days() }
            })
        } else if (e.target.value == '2') {
            this.setState({
                selectDate: { ...this.last7Days() }
            })
        } else if (e.target.value == '3') {
            this.setState({
                selectDate: { ...this.lastWeek() }
            })
        } else if (e.target.value == '4') {
            this.setState({
                selectDate: { ...this.lastMonth() }
            })
        }
        console.log(this.state.selectDate)
    }
    dateChange = e => {//当日历组件更换日期时
        const selectDate = {
            startDate: e[0] || '',
            endDate: e[1] || ''
        }
        this.setState({
            selectDate: {
                ...selectDate
            }
        })
    }
    /***********DatePicker 业务逻辑 end *****************/
    /***************************页面业务逻辑 end ******************************/
    /***********生命周期 begin **************/
    componentDidMount() {
        this.defaultDate()//默认日期
    }
    /***********生命周期 end **************/
    render() {
        const { selectDate: { startDate, endDate } } = this.state;
        return (
            <div>
                <RangePicker
                    showTime
                    format='YYYY-MM-DD'
                    onChange={this.dateChange}
                    placeholder={['开始时间', '结束时间']}
                    // disabledTime={this.disabledStartDate}
                    style={{ marginRight: '20px' }}
                    value={[startDate, endDate ]}
                />
                <Radio.Group onChange={this.changeDateFn} defaultValue={'2'}>
                    <Radio.Button value='1'>近30天</Radio.Button>
                    <Radio.Button value='2'>近7天</Radio.Button>
                    <Radio.Button value='3'>上周</Radio.Button>
                    <Radio.Button value='4'>上月</Radio.Button>
                </Radio.Group>
            </div>
        )
    }
}

export default DateChoose;