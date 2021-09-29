const sleep = require('./sleep')

const {
  performance
} = require('perf_hooks');

describe('Tests Code within sleep.js', () => {
  it('Should test get.property(obj, property)', async () => {
    const startTime = performance.now()
    await sleep.sleep(1000)
    const endTime = performance.now()
    const delta = endTime - startTime

    expect(delta).toBeGreaterThanOrEqual(901)
    expect(delta).toBeLessThanOrEqual(1099)
  })
})