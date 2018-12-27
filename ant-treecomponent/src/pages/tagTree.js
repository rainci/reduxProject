import React, { Component } from 'react';
import { Tag } from 'antd';
import TaskTagTreeList from '../components/tree/index';
import { connect } from 'react-redux';
import { tagCheckedKeys, tagCheckedAction, tagCloseAction  } from '../redux/actions';
const treeDatas = [
  {
    name: '顶部',
    tagId: 1,
    parentId: 0,
    children: [
      {
        name: '人物',
        tagId: 11,
        parentId: 1,
        children: [
          {
            name: '奥巴马',
            tagId: 111,
            parentId: 11,
          },
          {
            name: '特朗普',
            tagId: 112,
            parentId: 11,
          }
        ]
      },
      {
        name: '动物',
        tagId: 12,
        parentId: 1,
        children: [
          {
            name: '老虎',
            tagId: 121,
            parentId: 12,
          },
          {
            name: '狮子',
            tagId: 122,
            parentId: 12,
          }
        ]
      },
      {
        name: '生物',
        tagId: 13,
        parentId: 1,
        children: [
          {
            name: '花',
            tagId: 131,
            parentId: 13,
          },
          {
            name: '草',
            tagId: 132,
            parentId: 13,
          }
        ]
      }
    ]
  }
];
/**
 * 
 * @param {Array[[]]} data
 * @return {Array} tagCheckedName
 * @author rainci(刘雨熙)
 */
const changeTagLeafToNames = (data = []) => {
  let tagCheckedData = [];
  if (!data.length) {
    return tagCheckedData;
  }
  for (var item of data) {
    let itemData = {},
      tagKey = [];
    var name = item.map(({ tagId, name }) => {
      tagKey.push(tagId)
      return name
    })
    itemData['id'] = tagKey.join(',');
    itemData['name'] = name.join('-');
    tagCheckedData.push(itemData)
  }
  return tagCheckedData
}
class TagTree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData: [],
      bfcheckedKeys: [],
      checkedKeys: [],
      expandedKeys: [],
      initKeys: false,
      transformTagData: ['老虎', '狮子']
    }
  }
  /***************************页面业务逻辑 begin ******************************/
  /***********选取tag begin *****************/
  treeCheckFn = ({ checkedKeys, relationLeaf, checkedTagList }) => { //每次checked tag Fn
    console.log('outercheckd:', checkedKeys, relationLeaf, checkedTagList)
    let tagCheckedData = changeTagLeafToNames(relationLeaf); //转换数据格式存储到redux中
    console.log('tagCheckedData:', tagCheckedData)
    this.props.onTagCheckedFn && this.props.onTagCheckedFn(tagCheckedData,checkedKeys)
    // this.props.onTagCheckedkeys(checkedKeys)
    this.setState({
      checkedKeys,
      initKeys: false
    })
  }
  tagCloseFn = (id) => {//每次close tag Fn
    this.setState({
      initKeys: true
    })
    this.props.onTagCloseFn && this.props.onTagCloseFn(id)
  }
  // deleteTag = () => { // delete tags
  //   this.setState({
  //     checkedKeys: ['1'],
  //     initKeys: true
  //   })
  // }
  // deleteTag2 = () => { // delete tags
  //   this.setState({
  //     checkedKeys: ['1'],
  //     initKeys: true
  //   })
  // }
  /***********选取tag end *****************/
  /***************************页面业务逻辑 end ******************************/
  /***********生命周期 begin **************/
  componentDidMount() {
    this.setState({
      treeData: treeDatas,
      expandedKeys: ['1', '11'],
      // checkedKeys: ['1', '11'],
    })
  }
  /***********生命周期 end **************/
  render() {
    let { expandedKeys, checkedKeys, treeData, initKeys } = this.state;
    return (
      <div >
        <TaskTagTreeList
          treeData={treeData}
          onTreeCheck={this.treeCheckFn}
          checkedKeys={this.props.tagCheckedReducer.tagCheckedKeys}
          expandedKeys={expandedKeys}
          initKeys={initKeys}
        />
        {
          this.props.tagCheckedReducer.tagCheckedData.map((item, key) => {
            const { name, id } = item;
            return <Tag closable key={id} id={id} onClose={() => this.tagCloseFn(id)}>{name}</Tag>
          })
        }
        {/* <Tag onClick={this.deleteTag}>delete</Tag>
        <Tag onClick={this.deleteTag2}>delete2</Tag> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    // tagCheckedKeys: state.tagCheckedKeys,
    tagCheckedReducer: state.tagCheckedReducer
  })
}
const mapDispatchToProps = dispatch => ({
  // onTagCheckedkeys: (selectedKeys) => dispatch(tagCheckedKeys(selectedKeys)),
  onTagCheckedFn: (tagCheckedData,tagCheckedKeys) => dispatch(tagCheckedAction(tagCheckedData,tagCheckedKeys)),
  onTagCloseFn: id => dispatch(tagCloseAction(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TagTree)
