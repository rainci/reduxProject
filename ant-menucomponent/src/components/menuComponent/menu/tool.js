/**
 * 
 * @param {Array} children 
 * @return {[string]} 
 * @author rainci(刘雨熙)
 * get children的ids
 */
export const getChildrenIds = (children = []) => {
    let ids = [];
    for (const child of children) {
        const { tagId } = child;
        if (tagId) {
            ids.push(`${tagId}`);
        }
        if (child.children) {
            const resault = getChildrenIds(child.children);
            if (resault && resault.length) {
                ids.push(...resault);
            }
        }
    }
    return ids;
}