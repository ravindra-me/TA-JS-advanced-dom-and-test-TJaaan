const array = [
  [
    {
      i: 'fab fa-github',
      name: 'GitHub',
    },
    {
      i: 'fab fa-twitter',
      name: 'Twitter',
    },
    {
      i: 'fab fa-facebook-f',
      name: 'FaceBook',
    },
    {
      i: 'fab fa-instagram',
      name: 'Instagram',
    },
    {
      i: 'fab fa-bluetooth-b',
      name: 'Bluetooth',
    },
  ],
  [
    {
      i: 'fab fa-stack-overflow',
      name: 'stack-overflow',
    },
    {
      i: 'fab fa-stripe-s',
      name: 'strip',
    },
    {
      i: 'fab fa-trello',
      name: 'trello',
    },
    {
      i: 'fab fa-uber',
      name: 'uber',
    },
    {
      i: 'fab fa-vuejs',
      name: 'vue js',
    },
  ],
];

let score = document.querySelector('.right-score');
let num = 0;
let chance = document.querySelector('.chance');
let playAgain = document.querySelector('.play-again');

let chanceNum = 0;

playAgain.addEventListener('click', (event) => {
  window.location.reload();
});

function dragStart(event) {
  event.target.style.opacity = '0.4';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text', this.dataset.id);
  if (chanceNum < arr.length) {
    chanceNum += 1;
    chance.innerText = `${chanceNum}`;
    if (chanceNum === arr.length) playAgain.classList.remove('display-none');
  }
}

function dropHandler(event) {
  event.stopPropagation();
  event.preventDefault();
  if (event.dataTransfer.getData('text') === event.target.dataset.id) {
    let elm = arr.find((element) => {
      if (element.name === event.target.dataset.id) {
        return element;
      }
    });
    console.log(elm.i);
    let createI = document.createElement('i');
    createI.classList = `${elm.i}`;
    event.target.append(createI);

    num += 1;
    console.log(num);
    score.innerText = num;
  }
}
function dragEnterHandler(event) {
  console.log('drag enter');
}
function dragOverHandler(event) {
  event.preventDefault();
  console.log('drag over');
}

function dragLeaveHandler(event) {
  event.preventDefault();
  console.log('drag leave');
}

function dragEndHandler() {
  console.log('drag end');
}

let dragSrcEl = null;

let iconeBox = document.querySelector('.icone-box');
let matchBox = document.querySelector('.matching-container');
let arr = array[Math.floor(Math.random() * array.length)];
function createUi(arr) {
  iconeBox.innerHTML = '';
  matchBox.innerHTML = '';
  arr.forEach((element, arr) => {
    let div = document.createElement('div');
    let iElem = document.createElement('i');
    iElem.classList = `${element.i} draggable`;
    iElem.setAttribute('draggable', true);
    div.append(iElem);
    iElem.addEventListener('dragstart', dragStart, false);
    iElem.addEventListener('dragend', dragEndHandler, false);
    iElem.setAttribute('data-id', element.name);
    iconeBox.append(div);
    // matching element
    let div2 = document.createElement('div');
    div2.classList = `flex justify-between align-center`;
    let spanText = document.createElement('span');
    spanText.classList = `brand-name`;
    spanText.innerText = `${element.name}`;
    let spanIcon = document.createElement('span');
    spanIcon.classList = `dropEnd-element`;
    spanIcon.setAttribute('data-id', element.name);
    spanIcon.addEventListener('dragenter', dragEnterHandler, false);
    spanIcon.addEventListener('dragover', dragOverHandler, false);
    spanIcon.addEventListener('dragleave', dragLeaveHandler, false);
    spanIcon.addEventListener('drop', dropHandler, false);

    div2.append(spanText, spanIcon);
    matchBox.append(div2);
  });
}

createUi(arr);
