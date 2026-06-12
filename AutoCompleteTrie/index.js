class AutoCompleteTrie {
  constructor(value = "", children = {}, endOfWord = false) {
    this.value = value;
    this.children = children;
    this.endOfWord = endOfWord;
  }

  addWord(word) {
    let current = this;
    word = word.toLowerCase();
    for (const char of word) {
      if (!current.children[char]) {
        current.children[char] = new AutoCompleteTrie(char);
      }
      current = current.children[char];
    }
    current.endOfWord = true;
  }

  findWord(word) {
    let current = this;

    for (const char of word) {
      if (!current.children[char]) {
        return false;
      }
      current = current.children[char];
    }
    return current.endOfWord;
  }

  predictWords(prefix) {}

  _getRemainingTree(prefix, node) {
    let current = node;
    for (const char of prefix) {
      if (!current.children[char]) {
        return null;
      }
      current = current.children[char];
    }
    return current;
  }

  _allWordsHelper(prefix, node, allWords) {
    if (!node) {
      return;
    }

    if (node.endOfWord) {
      allWords.push(prefix);
    }

    for (const char in node.children) {
      this._allWordsHelper(prefix + char, node.children[char], allWords);
    }
  }
}

module.exports = { AutoCompleteTrie };
