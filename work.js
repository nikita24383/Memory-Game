// all the images
var back_images = ["img/1.png", "img/1.png", "img/2.png", "img/2.png", "img/3.png", "img/3.png", "img/4.png", "img/4.png", "img/5.png", "img/5.png", "img/6.png", "img/6.png", "img/7.png", "img/7.png", "img/8.png", "img/8.png", "img/9.png", "img/9.png"]

let card = document.getElementsByClassName("card");
let cards = [...card];

// collects all the 
const deck = document.getElementsByClassName("back");

 // array for opened cards
var openedCards = [];

// window reload on startGame and call shuffle card
document.body.onload = startGame();
function startGame(){
	var shuffledCards = Shuffle(back_images);
	console.log(shuffledCards);
	for (var i = deck.length - 1; i >= 0; i--) {
		deck[i].src = shuffledCards[i];
	}
}

// loop to add event listener to each card
for (var i = cards.length - 1; i >= 0; i--) {
	cards[i].addEventListener("click", displayCard);
}

// to display the card
function displayCard(){
	var child = this.childNodes;
	child[1].classList.add("front");
	child[3].classList.remove("back");

	// adding opened card to an array
	if (!openedCards.includes(this)) {
		openedCards.push(this);
	}
	console.log(openedCards);
	if(openedCards.length == 2){
		openedCard();
	}
}

// Fisher-Yates (aka Knuth) shuffle 
function Shuffle(Array){
	var currentIndex = Array.length, tempValue, randIndex;

	while(currentIndex != 0){
		randIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		tempValue = Array[currentIndex];
		Array[currentIndex] = Array[randIndex];
		Array[randIndex] = tempValue;
	}
	return Array;
}

// to check if matched
function openedCard(){
	var len = openedCards.length;
	if (len == 2) {
		if (openedCards[0].children[1].src == openedCards[1].children[1].src) {
			matched();
		}else if(openedCards[0].children[1].src != openedCards[1].children[1].src){
			setTimeout(() => unmatched(), 500);
		}
	}
}

function matched(){
	openedCards[0].style.boxShadow = "none";
	openedCards[1].style.boxShadow = "none";

	openedCards[0].classList.add("fix");
	openedCards[1].classList.add("fix");
	openedCards[0].style.opacity = "0.5";
	openedCards[1].style.opacity = "0.5";

	openedCards = [];
}

function unmatched(){
	openedCards[0].children[0].classList.remove("front");
	openedCards[0].children[1].classList.add("back");

	openedCards[1].children[0].classList.remove("front");
	openedCards[1].children[1].classList.add("back");

	openedCards = [];
}