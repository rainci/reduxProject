import sum from './sum'
describe('sum', () => {
  it('sum test', () => {
    // expect(sum(1, 2)).toBe(3)
    expect(sum(1, 2)).toEqual(3)
  })
})