const {loadJsonItems} = require('../js/json')

test("load Json Items", () =>{
    listItem = createNewElement("task", false)

    expect(loadJsonItems.click().anything())
});
