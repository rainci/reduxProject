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
Mock.mock('/mockapi/service/tag/tag/list?belong=tag', {
  'code': 200,
  'data|1-1': [{
    'tagId': 1,
    'name': '标注系统标签树',
    'children|1-10': [
      {
        'tagId|+10': 10,
        'name': /[A-Z][a-z]{1,5}/,
        'children|0-10': [
          {
            'tagId|+1': 100,
            'name': /[A-Z][a-z]{1,5}/,
            'children|0-10': [
              {
                'tagId|+1': 1000,
                'name': /[A-Z][a-z]{1,5}/,
                'children|0-10': [
                  {
                    'tagId|+1': 10000,
                    'name': /[A-Z][a-z]{1,5}/,
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
		

  }],
  'msg': '操作成功',
})