const get = require('./get')

describe('Tests Code within get.js', () => {
  it('Should test get.property(obj, property)', () => {
    const obj = {
      "stats": {
        "gameCount": 3,
        "characterCount": 6
      },
      "results": [
        {
          "title": "Mario Party",
          "company": "Nintendo",
          "games": [
            {
              "title": "Mario Party 2",
              "characters": [
                {
                  "name": "Boo",
                  "description": "A ghost with his tongue out."
                },
                {
                  "name": "Koopa Troopa",
                  "fullTitle": "Turtle that walks on two legs."
                }
              ]
            }
          ]
        },
        {
          "title": "Halo",
          "company": "Bungie",
          "games": [
            {
              "title": "Halo Combat Evolved",
              "characters": [
                {
                  "name": "Master Chief",
                  "description": "Tall, green armored guy."
                },
                {
                  "name": "Pod Infector",
                  "fullTitle": "Squid like aliens."
                }
              ]
            },
            {
              "title": "Halo 2",
              "characters": [
                {
                  "name": "Cortana",
                  "description": "Artificial intelligence that helps Master Chief."
                },
                {
                  "name": "Catherine Halsey",
                  "fullTitle": "Lead behind the SPARTAN-II program."
                }
              ]
            }
          ]
        }
      ]
    }
    const expectedObjResults = [{"company": "Nintendo", "games": [{"characters": [{"description": "A ghost with his tongue out.", "name": "Boo"}, {"fullTitle": "Turtle that walks on two legs.", "name": "Koopa Troopa"}], "title": "Mario Party 2"}], "title": "Mario Party"}, {"company": "Bungie", "games": [{"characters": [{"description": "Tall, green armored guy.", "name": "Master Chief"}, {"fullTitle": "Squid like aliens.", "name": "Pod Infector"}], "title": "Halo Combat Evolved"}, {"characters": [{"description": "Artificial intelligence that helps Master Chief.", "name": "Cortana"}, {"fullTitle": "Lead behind the SPARTAN-II program.", "name": "Catherine Halsey"}], "title": "Halo 2"}], "title": "Halo"}]


    //Happy Paths
    expect(get.property(obj, 'stats')).toStrictEqual({"characterCount": 6, "gameCount": 3})
    expect(get.property(obj.stats, 'gameCount')).toBe(3)
    expect(get.property(obj, 'results')).toStrictEqual(expectedObjResults)
    expect(get.property(obj.results[0], 'title')).toStrictEqual('Mario Party')
    expect(get.property(obj.results[1].games[0], 'characters')).toStrictEqual([{"description": "Tall, green armored guy.", "name": "Master Chief"}, {"fullTitle": "Squid like aliens.", "name": "Pod Infector"}])

    //Error Paths
    expect(() => get.property(obj, 'badProp')).toThrow("Could not find property, badProp, from the object.")
    expect(() => get.property(obj, '')).toThrow("Could not find property, , from the object.")
    expect(() => get.property(obj, null)).toThrow("Could not find property, null, from the object.")
    expect(() => get.property(obj, 2)).toThrow("Could not find property, 2, from the object.")


  })
})