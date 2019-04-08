/**
 * 
 * @author rainci(刘雨熙)
 * @time 2019.4.2
 */
import { getParentIdAndName, checkHasChildrenFn } from './tool'

describe('check getParentIdAndName fn', () => { 
    it('', () => {
        const sampleData = new Map([
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
            ],
            [
                112,[
                    {
                        tagId:112,
                        name:'孙子112',
                        parentId:11,
                    }, 
                ]
            ]
        ]),
        expectResult = {
            secletIds: [1,11], 
            relationLeaf: [{tagId:1,name:'爷爷1'},{tagId:11,name:'爸爸11'}]   
        };
        console.log('sample:',getParentIdAndName({currentId:11,sampleTreeData:sampleData}))
        // expect(getParentIdAndName({currentId:1,sampleTreeData:sampleData})).toEqual(expectResult)    
        
    })
})

describe('check checkHasChildrenFn fn', () => {//describe方法表示进行一组单元测试,"测试套件"（Suites）
    it('should create an checked reducer', () => {//it内部是一组测试中的某一个测试（Specs）
        const data = ['1','2','3'],
        itemChildren = [{tagId:1},{tagId:2}];
        expect(checkHasChildrenFn(data,itemChildren)).toEqual(true)
    })
})
