/* eslint-disable */
// 级联暂时不用，所以暂时 disbale eslint
/*
** 级联下拉框
** create by whr
** time: 2017.10.27
*/
import React from 'react'
import { Select } from 'antd'
// import lodash from 'lodash'

const cloneDeep = (o) => {
  return o;
}

let _config = [
  {
    title: 'shiyebu',
    name: '事业部',
  },
  {
    title: 'juntuan',
    name: '军团',
  },
  {
    title: 'jingli',
    name: '项目经理',
  },
  {
    title: 'fuzeren',
    name: '负责人',
  },
]

function getAllList(parentTree, deptTree){
  let i = 0;
  let parentNum = 0;
  let list = [];
  function p(_parentTree){
    if(_parentTree && _parentTree.length){
      for(let v of _parentTree){
        v.code = `${i}-${v.deptId}`; //方便渲染select
        list[i++] = [v];
        p(v.childDepts);
      }
    }
  }
  function d(_deptTree, _i){
    if(_deptTree && _deptTree.length){
      for(let v of _deptTree){
        v.code = `${_i}-${v.deptId}`; //方便渲染select
        if(list[_i]){
          list[_i].push(v);
        }else{
          list[_i] = [v];
        }
        d(v.childDepts, _i + 1)
      }
    }
  }
  if(parentTree){
    p(parentTree)
  }
  parentNum = i;
  d(deptTree, i)
  return {
    parentNum,
    list
  }
}

class CascadeSelect extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      _list: [],
      list: [],
      parentNum: 0, //父级菜单数
      active: {}
    }
  }
  onChange(index, title, e){
    function getNewActive(pre, next){
      for(let p in next){
        if(!next[p] && typeof pre[p] !== 'string'){
          delete next[p]
        }
      }
      return next;
    }
    let _active = {};
    const { active } = this.state;
    let list = cloneDeep(this.state.list);
    let _list = cloneDeep(this.state._list);
    let [sign, key] = e.split('-');
    sign = Number(sign);

    if(key.indexOf('all') > -1){
      switch(sign){
        case 0:
          list = _list;
          break;
        case 1:
          list[1] = active.s0 ? _list[1].filter(({ parentId }) => parentId == active.s0) : getlist(list[0], _list[1])
          list[2] = getlist(list[1], _list[2])
          list[3] = getlist(list[2], _list[3])
          break;
        case 2:
          list[2] = active.s1 ? _list[2].filter(({ parentId }) => parentId == active.s1) : getlist(list[1], _list[2])
          list[3] = getlist(list[2], _list[3])
          break;
        case 3:
          list[3] = _list[3]
          break;
      }
      let o = {}
      for(let i = 3; i > (sign - 1); i--){
        o[`s${i}`] = ''
      }
      _active = getNewActive(active, o);
    }else{
      switch(sign){
        case 0:
          list = _list;
          list[1] = _list[1].filter(({ parentId }) => parentId == key);
          list[2] = getlist(list[1], _list[2])
          list[3] = getlist(list[2], _list[3])
          break;
        case 1:
          list[1] = active.s0 ? _list[1].filter(({ parentId }) => parentId == active.s0) : getlist(list[0], _list[1])
          list[2] = _list[2].filter(({ parentId }) => parentId == key);
          list[3] = getlist(list[2], _list[3])
          break;
        case 2:
          list[1] = active.s0 ? _list[1].filter(({ parentId }) => parentId == active.s0) : getlist(list[0], _list[1])
          list[2] = active.s1 ? _list[2].filter(({ parentId }) => parentId == active.s1) : getlist(list[1], _list[2])
          list[3] = _list[3].filter(({ parentId }) => parentId == key);
          break;
        default:
          break;
      }
      let o = {}
      for(let i = 3; i > (sign - 1); i--){
        if(sign === i){
          o[`s${i}`] = key
        }else{
          o[`s${i}`] = '';
        }
      }
      _active = getNewActive(active, o);
    }

    function getlist(list, nextList){
      let l = [];
      if(list && list.length){
        for(let v of list){
          let key = v.deptId
          l.push(...nextList.filter(({ parentId }) => parentId == key))
        }
      }
      return l;
    }
    this.setState({
      list,
      active: {
        ...active,
        ..._active,
      }
    })
    const { onChange } = this.props;
    onChange.call(null, index, 'rank', e)
  }

  componentWillReceiveProps(nextProps){
    const { list: data, reset } = nextProps;
    const { _list } = this.state;
    if(!reset && _list && _list.length)return;
    // if(!data || lodash.isEmpty(data))return;
    let parentTree = data.parentTree.childDepts;
    let deptTree = data.deptTree.childDepts;
    let { list, parentNum } = getAllList(parentTree, deptTree);
    let o = {
      _list: list,
      list,
      parentNum
    }
    if(reset)o.active = {};
    this.setState(o)
  }

  render() {
    const { parentNum, list, active } = this.state;
    const { index, reset } = this.props;
    return (
      <div style={{display: 'inline-block'}} >
      {
        list.map((item, i) => {
          let o = {
            place: `请选择${_config[i].name}`,
            list: item,
            index,
            valAll: `${i}-all`,
            reset
          }
          let activeVal = active[`s${i}`];
          if(!reset && typeof activeVal === 'string'){
            o.initValue = activeVal ? `${i}-${activeVal}` : `${i}-all`
          }
          let isParent = i < parentNum;
          if(isParent){
            o.initValue = item[0].name;
            o.disabled = true;
          }
          return <Select key={ i } onChange={ this.onChange.bind(this) } className="ml-15" { ...o } title="rank" />
        })
      }
      </div>
    );
  }
}

export default CascadeSelect