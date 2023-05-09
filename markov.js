"use strict"
/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
      let chains = {}

      for (let i = 0; i<this.words.length; i++){
        let currWord = this.words[i];
        let nextWord = this.words[i+1] || null;

        if(!chains[currWord]){
          chains[currWord] = [];
        }
        chains[currWord].push(nextWord);
      }

      return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    let wordsArray = [];
    let wordToAdd = this.words[0];

    while(wordToAdd != null){
      wordsArray.push(wordToAdd);
      
      let randomIndex = this.getRandomIndexOfChain(wordToAdd)

      wordToAdd = this.chains[wordToAdd][randomIndex]
    }

    return wordsArray.join(" ");
  }

  /**Accepts a key to an object of Markov chains,
   * Return a random index of the corresponding chain*/

  getRandomIndexOfChain(key){
    let chainLength = this.chains[key].length
    let randomIndex = Math.floor(Math.random()*chainLength)
    return randomIndex;
  }
}

module.exports = {
  MarkovMachine,
};