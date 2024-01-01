const GameName = "Guess Words Game";
document.title = GameName;
document.querySelector('.game_title').innerHTML = GameName;
document.querySelector('.game_footer_span').innerHTML = GameName;
// get game container
let gameContainer = document.getElementById('game_container');
// get game container
let gameBoxs = document.getElementById('game_boxs');
// generate words
let words = ["react", "laravel", "html", "css", "javascript", "python", "flask", "php", "github"];

// generate random letters
const shuffleWord = (word) => {
  // Convert the word into an array of letters
  const letters = word.split('');

  // Shuffle the array of letters
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }

  // Join the shuffled letters back into a word
  const shuffledWord = letters.join('');
  return shuffledWord;
}

const shuffleWordsArray = (wordsArray) => {
  // Create a new array with shuffled words
  const shuffledArray = wordsArray.map(word => shuffleWord(word));
  return shuffledArray;
}
const shuffledWordsArray = shuffleWordsArray(words);
// generate random letters of words
let allLetters = [];
// convert words to letters 
for(const word of shuffledWordsArray) {
  for(const letter of word) {
    allLetters.push(letter);
  }
}
console.log(allLetters);
// create letters box 
const createLettersBox = (box_number) => {
  for(let i = 0; i < box_number; i++) {
    let wordsBox = document.createElement('div');
    wordsBox.innerHTML = allLetters[i];
    wordsBox.className = 'word_box';
    wordsBox.id = `word-${allLetters[i]}`;
    gameBoxs.appendChild(wordsBox);
  }
  getLetterOfWord();
}
// get letter from word box
const getLetterOfWord = () => {
  let randomLetter = document.querySelectorAll('.word_box');
  let listOfWordsFound = document.querySelector('.correct_words');
  let selectedLetters = [];
  randomLetter.forEach(letter => {
    letter.addEventListener('click', () => {
      // change background color of letter
      if(letter.classList.contains('clicked')) {
        letter.classList.remove('clicked');
        letter.className = 'word_box';
        letterToRemove = selectedLetters.indexOf(letter.textContent);
        if(letterToRemove !== -1) {
          selectedLetters.splice(letterToRemove, 1);
        }
      }else {
        letter.className = 'clicked';
        selectedLetters.push(letter.textContent);
        console.log(letter.textContent, 'is clicked');
      }
      // letter.disabled = true;
      console.log(selectedLetters.join(''));
      for(let i = 0; i <= words.length; i++) {
        if(selectedLetters.join('') === words[i]) {
          let correctWord = document.createElement('span');
          correctWord.className = 'correct_word';
          correctWord.innerHTML = words[i];
          listOfWordsFound.appendChild(correctWord);
          console.log(`very good the word "${words[i]}" is correct`);
          selectedLetters = [];
        }
      }
    });
  });
}
// call functions
createLettersBox(49);