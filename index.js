// --------------------Audio------------------

// const audio = new Audio();
// audio.src = '/codejam-eldritch/assets/bgMusic.mp3';
// audio.play();
// audio.addEventListener('ended', () => {
//   audio.play();
// });

// console.log(audio.src);
// -------------------------------------------

// -------------------------------------------
import ancientsData from '../codejam-eldritch/data/ancients.js';
import cardsDataGreen from '../codejam-eldritch/data/mythicCards/green/index.js';
import cardsDataBrown from '../codejam-eldritch/data/mythicCards/brown/index.js';
import cardsDataBlue from '../codejam-eldritch/data/mythicCards/blue/index.js';
import stages from '../codejam-eldritch/data/stages.js';

const ancientsNumber = {
  azathoth: 0,
  cthulhu: 1,
  iogSothoth: 2,
  shubNiggurath: 3
}

const ancient = document.querySelector('.main__ancient');
let ancientName;

ancient.addEventListener('click', (event) => {
  let eventTarget = event.target;
  ancientName = eventTarget.alt;
  eventTarget.classList.toggle('active');
  getCardsQuantity(ancientName);
})

let grCards, blCards, brCards;

function getCardsQuantity(name) {
  name = ancientsNumber[name];
  grCards = ancientsData[name].firstStage.greenCards + ancientsData[name].secondStage.greenCards + ancientsData[name].thirdStage.greenCards;
  blCards = ancientsData[name].firstStage.blueCards + ancientsData[name].secondStage.blueCards + ancientsData[name].thirdStage.blueCards;
  brCards = ancientsData[name].firstStage.brownCards + ancientsData[name].secondStage.brownCards + ancientsData[name].thirdStage.brownCards;
}

let difficulty;

const difficulties = document.querySelector('.main__difficulty');
difficulties.addEventListener('click', (event) => {
  event.target.classList.toggle('active');
  difficulty = event.target.textContent;
})

const shuffleButton = document.querySelector('.shuffle__button');
const currentState = document.querySelector('.current__state');
const deck = document.querySelector('.deck');
const lastCard = document.querySelector('.last__card');

shuffleButton.addEventListener('click', () => {
  shuffleButton.classList.toggle('active');
  currentState.classList.toggle('active');
  deck.classList.toggle('active');
  lastCard.classList.toggle('active');
  shuffleDeck(difficulty);
})

function shuffleDeck(diff) {
  switch(diff) {
    case 'Очень Лёгкая':
      let greenGeneral, blueGeneral, brownGeneral;
      greenGeneral = cardsDataGreen.filter(item => item.difficulty == 'easy');
      blueGeneral = cardsDataBlue.filter(item => item.difficulty == 'easy');
      brownGeneral = cardsDataBrown.filter(item => item.difficulty == 'easy');
      let greenSorted = [];
      let brownSorted = [];
      let blueSorted = [];
      function getSortedCards(arr, s_arr, cards, all_cards) {
        let rand;
        let max = arr.length;
        for(let i = 0; i < cards; i++) {
          if(arr.length == 0) {
            max = all_cards.length - 1;
            rand = Math.floor(Math.random() * (max + 1));
            s_arr.push(all_cards[rand]);
            all_cards.splice(rand, 1);
          } else {
              max--;
              rand = Math.floor(Math.random() * (max + 1));
              s_arr.push(arr[rand]);
              arr.splice(rand, 1);
          }
        }
      }
      getSortedCards(greenGeneral, greenSorted, grCards, cardsDataGreen);
      getSortedCards(blueGeneral, blueSorted, blCards, cardsDataBlue);
      getSortedCards(brownGeneral, brownSorted, brCards, cardsDataBrown);

      function showCards(grsorted, blsorted, brsorted) {
        let state = [];
        for(let i of stages[ancientsNumber[ancientName]]) {
          for(let j of i) {
            state.push(j);
          }
        }
        console.log(state);
        const dots = document.querySelectorAll('.dot');

        function getState() {
          for(let i = 0; i < state.length; i++) {
            dots[i].textContent = state[i];
          }
        }
        getState();

        let cardsImgs = [];

        for(let i = 0; i < 9; i++) {
          let count = state[i];
          if(i == 0 || i == 3 || i == 6) {
            if(count == 0) {
              continue;
            } else {
              for(let k = 0; k < count; k++) {
                cardsImgs.push(grsorted[0].cardFace);
                grsorted.shift();
              }
            }
          }
          if(i == 1 || i == 4 || i == 7) {
            if(count == 0) {
              continue;
            } else {
              for(let k = 0; k < count; k++) {
                cardsImgs.push(brsorted[0].cardFace);
                brsorted.shift();
              }
            }
          }
          if(i == 2 || i == 5 || i == 8) {
            if(count == 0) {
              continue;
            } else {
              for(let k = 0; k < count; k++) {
                cardsImgs.push(blsorted[0].cardFace);
                blsorted.shift();
              }
            }
          }
        }
        console.log(cardsImgs);
        const deck = document.querySelector('.deck');
        const currentCard = document.querySelector('.last__card');
        const refreshButton = document.querySelector('.refresh');
        let i = 0;

        deck.addEventListener('click', () => {
          if(state[i] == 0) {
            i++;
          }
          if(state[i] == 0) {
            i++;
          }
          if(i == 9) {
            refreshButton.classList.add('end');
            deck.classList.remove('active');
            currentCard.classList.remove('active');
          } else {
              state[i]--;
              currentCard.style.backgroundImage = `url('${cardsImgs[0]}')`;
              cardsImgs.shift();
              getState();
            }
        })
      }

      showCards(greenSorted, blueSorted, brownSorted);
      break;
    case 'Лёгкая':
      let greenGeneral2, blueGeneral2, brownGeneral2;

      greenGeneral2 = cardsDataGreen.filter(item => item.difficulty == 'easy' || item.difficulty == 'normal');
      blueGeneral2 = cardsDataBlue.filter(item => item.difficulty == 'easy' || item.difficulty == 'normal');
      brownGeneral2 = cardsDataBrown.filter(item => item.difficulty == 'easy' || item.difficulty == 'normal');
      
      let greenSorted2 = [];
      let brownSorted2 = [];
      let blueSorted2 = [];
  
      getSortedCards(greenGeneral2, greenSorted2, grCards, cardsDataGreen);
      getSortedCards(blueGeneral2, blueSorted2, blCards, cardsDataBlue);
      getSortedCards(brownGeneral2, brownSorted2, brCards, cardsDataBrown);
  
      showCards(greenSorted2, blueSorted2, brownSorted2);
      break;
    case 'Средняя':
      let greenGeneral3, blueGeneral3, brownGeneral3;
      greenGeneral3 = cardsDataGreen;
      blueGeneral3 = cardsDataBlue;
      brownGeneral3 = cardsDataBrown;
      
      let greenSorted3 = [];
      let brownSorted3 = [];
      let blueSorted3 = [];

      getSortedCards(greenGeneral3, greenSorted3, grCards, cardsDataGreen);
      getSortedCards(blueGeneral3, blueSorted3, blCards, cardsDataBlue);
      getSortedCards(brownGeneral3, brownSorted3, brCards, cardsDataBrown);
  
      showCards(greenSorted3, blueSorted3, brownSorted3);
      break;
    case 'Сложная':

      break;
    case 'Очень Сложная':

      break;        
  }
}

