const {getSmallestRunner} = require('./getSmallestRunner')

describe('Tests Code within getTcData.js', () => {
  it('Should test getTcData(tcData, mochaData)', () => {
    const runners = {
      "g1": {
        "title": [
          "suite3 test1"
        ],
        "estTotalDuration": 2000
      },
      "g2": {
        "title": [
          "suite3 test2"
        ],
        "estTotalDuration": 1000
      },
      "g3": {
        "title": [
          "suite3 test1"
        ],
        "estTotalDuration": 3000
      },
    }

    expect(getSmallestRunner(runners)).toBe('g2')
  })
})