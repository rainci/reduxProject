const Mock = require ('mockjs')
// Mock.mock('/mockapi/menudata', {
//   'code': 200,
//   'data|1': [{
//     'username|1-3': 'yyy',
//     'phone': /^1[345789]\d{9,9}$/,
//     'email': /^\d{6,}(@qq\.com)$/,
//     'status|1': Boolean,
//     'id|+1': 0,

//   }],
//   'msg': '操作成功',
// })
Mock.mock('/mockapi/menudata', {
  'code': 200,
  'data|1-1': [{
    'tagId': 1,
    'name': '标注系统标签树',
    'children|1-10': [
      {
        'tagId|+10': 10,
        'name': '文本舆情中性',
        'children|1-10': [
          {
            'tagId|+1': 100,
            'name': '文本舆情中性',
            'children|1-10': [
              {
                'tagId|+1': 1000,
                'name': '文本舆情中性',
                
              }
            ]
          }
        ]
      }
    ]
		

  }],
  'msg': '操作成功',
})