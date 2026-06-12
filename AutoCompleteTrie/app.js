const readline = require("readline");
const { AutoCompleteTrie } = require("./index");

const trie = new AutoCompleteTrie();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

console.log("=== AutoComplete Trie Console ===");
console.log("Type 'help' for commands\n");
rl.prompt();

function printHelp() {
  console.log("Commands:");
  console.log("  add <word>        - Add word to dictionary");
  console.log("  find <word>       - Check if word exists");
  console.log("  complete <prefix> - Get completions");
  console.log("  help              - Show this message");
  console.log("  exit              - Quit program");
}

rl.on("line", (line) => {
  const trimmedInput = line.trim();

  // Split command and argument safely (e.g., "add cat" -> command: "add", arg: "cat")
  const firstSpaceIndex = trimmedInput.indexOf(" ");
  const command =
    firstSpaceIndex === -1
      ? trimmedInput
      : trimmedInput.substring(0, firstSpaceIndex);
  const argument =
    firstSpaceIndex === -1
      ? ""
      : trimmedInput.substring(firstSpaceIndex + 1).trim();

  switch (command.toLowerCase()) {
    case "add":
      if (!argument) {
        console.log("✗ Please specify a word to add. Example: add cat");
      } else {
        trie.addWord(argument.toLowerCase());
        console.log(`✓ Added '${argument}' to dictionary`);
      }
      break;

    case "find":
      if (!argument) {
        console.log("✗ Please specify a word to find. Example: find cat");
      } else {
        const found = trie.findWord(argument.toLowerCase());
        if (found) {
          console.log(`✓ '${argument}' exists in dictionary`);
        } else {
          console.log(`✗ '${argument}' not found in dictionary`);
        }
      }
      break;

    case "complete":
      // If no prefix provided, treat it as an empty string (which gets all words)
      const prefix = argument.toLowerCase();
      const suggestions = trie.predictWords(prefix);

      if (suggestions.length === 0) {
        console.log(`Suggestions for '${prefix}': No matches found`);
      } else {
        console.log(`Suggestions for '${prefix}': ${suggestions.join(", ")}`);
      }
      break;

    case "help":
      printHelp();
      break;

    case "exit":
      console.log("Goodbye!");
      process.exit(0);
      break;

    case "":
      // Handle empty enters gracefully
      break;

    default:
      console.log(
        `Unknown command: '${command}'. Type 'help' for instructions.`,
      );
      break;
  }

  console.log(); // Add an empty line spacing for presentation matching your spec
  rl.prompt();
});
