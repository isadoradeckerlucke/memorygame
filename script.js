const gameContainer = document.getElementById("game");
document.body.style.backgroundColor = 'lavender'
const COLORS = [
  "palevioletred",
  "paleturquoise",
  "palegreen",
  "palegoldenrod",
  "plum",
  "palevioletred",
  "paleturquoise",
  "palegreen",
  "palegoldenrod",
  "plum"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);

  }
}

let first;
let second;
let tries = 0;
let noClick = false; //this removes the ability to click too fast on more than two cards. no clicks allowed when two cards are already turned over. 
function handleCardClick(event) {
  if (noClick) return; //end the function early if noClick is set to true
  if (event.target.getAttribute('data-flipped')) return; //if the event target aready has 'data-flipped' in it, end the funtcion. 

  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);  
  //changes the color of the card when it is clicked. 
  event.target.style.backgroundColor = event.target.className

  if (!first && (event.target.getAttribute('data-flipped')=== null)) { //if first is undefined && doesn't have the flipped attribute yet. 
    first = event.target;
    first.setAttribute('data-flipped', 'yes')
  } else if (!second && (event.target.getAttribute('data-flipped')===null)) { //if second is undefined && doesn't have the flipped attribute yet. 
    second = event.target;
    second.setAttribute('data-flipped', 'yes')
  }

  if (first && second){//if first and second card are defined, no more clicking. 
    noClick = true; 
  }

  if (second && first.className === second.className){//if second is defined and first equals second
    first.removeEventListener("click", handleCardClick);
    second.removeEventListener("click", handleCardClick);
    first.removeAttribute('data-flipped');
    second.removeAttribute('data-flipped');
    first = null;
    second = null;
    noClick = false; //reset, allow clicks again
    tries ++;
  } else if (second && first.className !== second.className){ //if second is defined and first doesn't equal second
    first.removeAttribute('data-flipped');
    second.removeAttribute('data-flipped');
    setTimeout( function(){
      //SET BACKGROUND COLOR OF BOTH TO ORIGINAL --IF YOU USE EVENT.TARGET.CLASSNAME IT ONLY RESETS SECOND ONE. 
      first.style.backgroundColor = 'rgb(99, 15, 43)'
      second.style.backgroundColor = 'rgb(99, 15, 43)'
      first = null;
      second = null;
      noClick = false; //reset and allow clicks again
    }, 1000)
    tries ++;
  }
  document.getElementById('count').innerHTML = tries;

}

// when the DOM loads
createDivsForColors(shuffledColors);

