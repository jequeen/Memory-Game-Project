/*
 * Create a list that holds all of your cards
 */
let cardsList = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
displayCards();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCards(){
    let documentFragment = document.createDocumentFragment();
    let newList = shuffle(cardsList);
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }
    for(li of newList){
        documentFragment.appendChild(li);
    }
    deck.appendChild(documentFragment);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(nodeList) {
    let array = Array.from(nodeList); 
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let openCardList = [];

for (let item of cardsList) {
    item.addEventListener('click',function(e){
        if(!item.classList.contains("match") 
            && !item.classList.contains("show") 
            && !item.classList.contains("open") 
            && openCardList.length < 2)
            {
                displayCardSymbol(item);
                addOpenCardToList(item);
                // TODO: the classes are being added but not displaying the image before removing the classes
                // for improper matches
            } 
        if(openCardList.length == 2){

            if(checkIfMatch()){    
                for(item of openCardList){
                    lockPosition(item);
                } 
            }
            else{
                console.log("here");
                for(item of openCardList){
                    displayCardSymbol(item);  
                }
                openCardList = [];
            }
        }
    });
}

/*
* Displays the symbol and flipped version of the
*/
function displayCardSymbol(element){
    element.classList.toggle("show");
    element.classList.toggle("open");
}

function addOpenCardToList(element){
    openCardList.push(element);
}

function lockPosition(element){
    displayCardSymbol(element);
    element.classList.toggle("match");
}

function checkIfMatch(){
    if(openCardList[0].firstElementChild.className === openCardList[1].firstElementChild.className){
        return true;
    }
}