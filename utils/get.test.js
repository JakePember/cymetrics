const get = require('./get')

describe('Tests Code within get.js', () => {
  it('Should test get.property(obj, property)', () => {
    const obj = {
      "name": "Jake",
      "language": "English"
    }
    expect(get.property(obj, 'name')).toBe('Jake')
    expect(() => get.property(obj, 'phone')).toThrow()
  })
})