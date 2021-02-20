let imgDiv = document.querySelector('.img-box');
let up = 100;

let right = 100;

function handleEvent(event) {
  //   console.log(event);
  if (event.keyCode == 37) {
    right -= 100;
    imgDiv.style.left = `${right}px`;
  } else if (event.keyCode == 38) {
    up -= 100;
    imgDiv.style.top = `${up}px`;
  } else if (event.keyCode == 40) {
    up += 100;
    imgDiv.style.top = `${up}px`;
  } else if (event.keyCode == 39) {
    right += 100;
    imgDiv.style.left = `${right}px`;
  }
}

function mouseClick(event) {
  document.addEventListener('keyup', handleEvent);
}

imgDiv.addEventListener('click', mouseClick);
