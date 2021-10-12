const clone = require('./clone')

const fs = require('fs');

describe('Tests Code within clone.js', () => {
  it('Should test clone.safeClone(filePath)', () => {
    const mockedModuleData = {
      "key1": "value1",
      "key2": ["str1", "str2"],
      "key3": {
        "subKey1": "subValue1"
      }
    }
    // will make fs.existsSync(filePath) return true 1 time regardless of the filepath exists or not
    // noinspection JSCheckFunctionSignatures <reason: 3rd arg is optional for jest.spyOn. We do not need it, false postitve>
    jest.spyOn(fs, "existsSync").mockImplementationOnce(() => jest.fn())
    //when require(mockedModule) is invoked, it will virtually contain the object below
    jest.mock("/fake/data.json", () => mockedModuleData, {virtual: true})


    expect(clone.safeClone("/fake/data.json")).toStrictEqual(mockedModuleData)
    expect(clone.safeClone("/fake/data.json")).toStrictEqual([])
  })
})