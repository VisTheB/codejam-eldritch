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
const ancient = document.querySelector('.main__ancient');
ancient.addEventListener('click', (event) => {
  let eventTarget = event.target;
  console.log(eventTarget.alt);
})