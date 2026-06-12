const { AutoCompleteTrie } = require("./index");

test("addWord cat to the AutoCompleteTrie", function () {
  let node = new AutoCompleteTrie();
  expect(Object.keys(node.children).length).toBe(0);

  node.addWord("cat");
  expect(node.children["c"]).toBeTruthy();
  node = node.children["c"];
  expect(node.children["a"]).toBeTruthy();
  node = node.children["a"];
  expect(node.children["t"]).toBeTruthy();
  node = node.children["t"];
  expect(node.endOfWord).toBeTruthy();
});
