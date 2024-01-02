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
// -------------------------------------------------------------------
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
// -------------------------------------------------------------------
// generate random letters of words
let allLetters = [];
// convert words to letters 
for(const word of shuffledWordsArray) {
  for(const letter of word) {
    allLetters.push(letter);
  }
}
console.log(allLetters);
// -------------------------------------------------------------------
// create letters box 
const createLettersBox = (box_number) => {
  for(let i = 0; i < box_number; i++) {
    let wordsBox = document.createElement('button');
    wordsBox.innerHTML = allLetters[i];
    wordsBox.className = 'word_box';
    wordsBox.id = `word-${allLetters[i]}`;
    gameBoxs.appendChild(wordsBox);
  }
  getLetterOfWord();
}
// -------------------------------------------------------------------
// list of words to display
let listOfWordsToDisplay = document.querySelector('.list_of_words_to_display');
// display all words function
const displayAllWords = () => {
  for(let i = 0; i < words.length; i++) {
    let correctWord = document.createElement('span');
    correctWord.className = 'word';
    correctWord.innerHTML = words[i];
    if(i < words.length) {
      let space = document.createTextNode(' - ');
      listOfWordsToDisplay.appendChild(space);  
      listOfWordsToDisplay.appendChild(correctWord);  
    }else{
      listOfWordsToDisplay.appendChild(correctWord);  
    }
  }
}
// -------------------------------------------------------------------
// selected letters and Buttons array
let selectedLetters = [];
let selectedButtons = [];
// get letter from word box
const getLetterOfWord = () => {
  let randomLetter = document.querySelectorAll('.word_box');
  randomLetter.forEach(letter => {
    letter.addEventListener('click', () => {
      // change background color of letter
      if(letter.classList.contains('clicked')) {
        letter.classList.remove('clicked');
        letter.className = 'word_box';
        letterToRemove = selectedLetters.indexOf(letter.textContent);
        buttonToRemove = selectedButtons.indexOf(letter);
        if(letterToRemove !== -1 || buttonToRemove !== -1) {
          selectedLetters.splice(letterToRemove, 1);
          selectedButtons.splice(buttonToRemove, 1);
        }
      }else {
        letter.className = 'clicked';
        selectedLetters.push(letter.textContent);
        // get selected buttons
        selectedButtons.push(letter);   
        console.log(letter.textContent, 'is clicked');
      }
      // update letters  to word
      let wordInput = document.getElementById('word_input');
      wordInput.innerHTML = selectedLetters.join('');
      console.log(selectedLetters.join(''));
      console.log(selectedButtons);
      // check if word is correct
      for(let i = 0; i < words.length; i++) {
        let displayedWords = document.querySelectorAll('.word');
        if(selectedLetters.join('') === words[i] && selectedLetters.join('') === displayedWords[i].innerHTML) {
          // console.log(selectedLetters.join(''));
          displayedWords[i].id = 'correct_word';
          selectedButtons.forEach((button) => {
            button.className = 'disabled_button';
            button.disabled = true;
          });
          console.log(`very good the word "${words[i]}" is correct`);
          selectedLetters = [];
        }
      }
    });
  });
}

// call functions
// display all word should to found
displayAllWords();
createLettersBox(49);