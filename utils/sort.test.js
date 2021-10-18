const sort = require('./sort')

describe('Tests Code within sort.js', () => {
  it('Should test sort.byAvgDur(data)', async () => {
    const input = [
      {
        "name": "object-4",
        "avg_duration": 4000
      },
      {
        "name": "object-1",
        "avg_duration": 1000
      },
      {
        "name": "object-3",
        "avg_duration": 3000
      },
      {
        "name": "object-5",
      },
      {
        "name": "object-2",
        "avg_duration": 2000
      }
    ]
    const expected  = [
      {
        "name": "object-4",
        "avg_duration": 4000
      },
      {
        "name": "object-3",
        "avg_duration": 3000
      },
      {
        "name": "object-2",
        "avg_duration": 2000
      },
      {
        "name": "object-1",
        "avg_duration": 1000
      },
      {
        "name": "object-5",
      }
    ]
      expect(sort.byAvgDur(input)).toStrictEqual(expected)
  })
})