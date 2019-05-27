/**
 * 
 * @author rainci(刘雨熙)
 * @time 2019.4.12
 */
import { filterOneData } from './filterOneMapData'
describe('test utils filterOneData', () => { 
    it('test filterOneData fn', () => {//it内部是一组测试中的某一个测试（Specs）
        const data = new Map([
            [
                1,[
                    {
                        tagId:1,
                        name:'爷爷1',
                        parentId: 0,
                        children: [
                            {
                                tagId:11,
                                name:'爸爸11',
                                parentId:1,
                                children: [
                                  {
                                    tagId:112,
                                    name:'孙子112',
                                    parentId:11,
                                  }, 
                                ]
                            }
                        ]
                    }
                ]
            ],
            [
                11,[
                    {
                        tagId:11,
                        name:'爸爸11',
                        parentId:1,
                        children: [
                            {
                            tagId:111,
                            name:'孙子111',
                            parentId:11,
                            }, 
                            {
                            tagId:112,
                            name:'孙子112',
                            parentId:11,
                            }, 
                        ]
                    }
                ]
            ]
        ]),
        expectData = [
            {
                tagId:11,
                name:'爸爸11',
                parentId:1,
                children: [
                    {
                    tagId:111,
                    name:'孙子111',
                    parentId:11,
                    }, 
                    {
                    tagId:112,
                    name:'孙子112',
                    parentId:11,
                    }, 
                ]
            }
        ]
        expect(filterOneData(data,11)).toEqual(expectData)
    })
  })