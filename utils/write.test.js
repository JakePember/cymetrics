const write = require('./write')

const fs = require('fs');

describe('Tests Code within write.js', () => {
  it('Should test write.dataToFile(file, data) with correct arguments', () => {
    jest.spyOn(fs, 'writeFileSync').mockImplementationOnce(() => jest.fn())
    write.dataToFile('path/to/output/file.json', {"name": "Jake", "dog": {"name": "Bailey", "size": "small"}})

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  })
  it('Should test write.dataToFile(file, data) with incorrect arguments', async () => {
      expect(() => write.dataToFile(undefined, {})).toThrow()
  })
})