class AutoCompleteTrie {
  constructor(value = "", children = {}, endOfWord = false) {
    this.value = value;
    this.children = children;
    this.endOfWord = endOfWord;
  }

  addWord(word) {}

  findWord(word) {}

  predictWords(prefix) {}

  _getRemainingTree(prefix, node) {}

  _allWordsHelper(prefix, node, allWords) {}
}
