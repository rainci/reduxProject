/**
 * 
 * @author rainci(刘雨熙)
 * @time 2019.4.8
 * get children的ids
 */
import { getChildrenIds } from './tool'
describe('test getChildrenIds Fn',() => {
    it('get children ids ', () => {
        const data = [
            {tagId: 1},
            {
                tagId: 2,
                children: [
                    {tagId:3}
                ]
            },
        ],
        expectResult = ['1','2','3']
        expect(getChildrenIds(data)).toEqual(expectResult)
    })

})
