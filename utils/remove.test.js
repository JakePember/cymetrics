const remove = require('./remove')

const fs = require('fs');

describe('Tests Code within remove.js', () => {
  it('Should test remove.file(file)', () => {
    // will make fs.unlinkSync(file) return true 1 time regardless if the file exists
    // noinspection JSCheckFunctionSignatures <reason: 3rd arg is optional for jest.spyOn. We do not need it, false postitve>
    jest.spyOn(fs, "unlinkSync").mockImplementationOnce(() => jest.fn())


    remove.file("/fake/data.json")
    expect(fs.unlinkSync).toHaveBeenCalledTimes(1);
    remove.file("/fake/data.json") //coveres catch
  })
})