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

test("addWord cat to the AutoCompleteTrie", function () {
  let node = new AutoCompleteTrie();
  expect(Object.keys(node.children).length).toBe(0);

  node.addWord("cat");
  expect(node.findWord("cat")).toBeTruthy();
  node.addWord("dog");
  expect(node.findWord("dog")).toBeTruthy();
  node.addWord("category");
  expect(node.findWord("category")).toBeTruthy();
});

test("_getRemainingTree to get wanted node or null", function () {
  let node = new AutoCompleteTrie();

  node.addWord("cat");
  expect(node._getRemainingTree("ca", node)).not.toBeNull();
  expect(node._getRemainingTree("dog", node)).toBeNull();

  node.addWord("category");
  expect(node._getRemainingTree("cat", node).endOfWord).toBeTruthy();
});

test("_allWordsHelper create a words array", function () {
  let node = new AutoCompleteTrie();
  node.addWord("their");
  node.addWord("there");
  node.addWord("this");
  node.addWord("does");
  node.addWord("doing");

  let arr = [];
  let preNode;
  preNode = node._getRemainingTree("th", node);
  node._allWordsHelper("th", preNode, arr);
  expect(arr).toEqual(["their", "there", "this"]);
  arr = [];
  preNode = node._getRemainingTree("do", node);
  node._allWordsHelper("do", preNode, arr);
  expect(arr).toEqual(["does", "doing"]);
  arr = [];
  preNode = node._getRemainingTree("yes", node);
  node._allWordsHelper("yes", preNode, arr);
  expect(arr).toEqual([]);
});

test("predictWords return array with words or empty if words don't exist ", function () {
  let node = new AutoCompleteTrie();
  node.addWord("their");
  node.addWord("there");
  node.addWord("this");
  node.addWord("does");
  node.addWord("doing");

  let arr = node.predictWords("hot");
  expect(arr).toEqual([]);
  arr = node.predictWords("thi");
  expect(arr).toEqual(["this"]);
  arr = node.predictWords("do");
  expect(arr).toEqual(["does", "doing"]);
});
