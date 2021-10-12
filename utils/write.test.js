const write = require('./write')

const fs = require('fs');

describe('Tests Code within write.js', () => {
  it('Should test write.dataToFile(file, data) with correct arguments', () => {
    // noinspection JSCheckFunctionSignatures <reason: 3rd arg is optional for jest.spyOn. We do not need it, false postitve>
    jest.spyOn(fs, 'writeFileSync').mockImplementationOnce(() => jest.fn())
    write.dataToFile('path/to/output/file.json', {"name": "Jake", "dog": {"name": "Bailey", "size": "small"}})

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  })
  it('Should test write.dataToFile(file, data) with incorrect arguments', async () => {
      expect(() => write.dataToFile(undefined, {})).toThrow()
  })
})