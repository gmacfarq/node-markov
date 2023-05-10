const { markov, MarkovMachine } = require("./markov");

describe("markovMachine", function () {
  let machine;
  beforeEach(function () {
    machine = new MarkovMachine(
      "The cat is in the hat. The cat is the cat. The hat is a cat."
    );
  });

  test("getChains", function () {
    const chains = machine.chains;
    expect(chains).toEqual({
      The: ["cat", "cat", "hat"],
      cat: ["is", "is"],
      is: ["in", "the", "a"],
      in: ["the"],
      the: ["hat.", "cat."],
      "hat.": ["The"],
      "cat.": ["The", null],
      hat: ["is"],
      a: ["cat."],
    });
  });

  test("getText", function () {
    const words = machine.getText().split(" ");
    //words = ["The", "cat", "is", "a", "cat."]
    for (let i = 0; i < words.length; i++) {
      expect(machine.chains[words[i]]).toContain(words[i + 1] || null);
    }
  });

  test("getRandomIndexOfChain", function () {
    const randIndex = machine.getRandomIndexOfChain("cat.");
    expect(randIndex).toBeLessThan(machine.chains["cat."].length);
  });
});
