const btn = document.getElementById("ClickBtn");
btn.addEventListener('click', function ageIndays() {
    let age = prompt('Enter Your BirthYear: ');
    const result = (2020 - age) * 365;
    const message = document.createTextNode(`You are ${result} days old.`);
    const h1 = document.createElement('h1');
    h1.setAttribute('id', 'answer')
    h1.appendChild(message);
    document.getElementById('result').appendChild(h1);
});

const rbtn = document.getElementById('ResetBtn');
rbtn.addEventListener('click', function reset() {
    document.getElementById('answer').remove();
});


const catBtn = document.getElementById("catBtn");
catBtn.addEventListener('click', function catGen() {
    const image = document.createElement('img');
    image.setAttribute('id', 'imageResize');
    image.src = "GIF/catfree.gif";
    document.getElementById('flexDiv').appendChild(image);
})



function rpsGame(yourChoice)
{
    const humanChoice = yourChoice.id;
    const botChoice = botChoicefunction(randNum());
    let result = decideWinner(humanChoice,botChoice);
    let message = finalMessage(result);

    rpsFrontEnd(humanChoice,botChoice,message);
}

function randNum()
{
    return Math.floor(Math.random()*3);
}

function botChoicefunction(number)
{
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(humanChoice,botChoice)
{
    let rpsDataBase = {
        'rock': {'scissors':1, 'rock':0.5, 'paper':0},
        'paper': {'rock':1, 'paper':0.5, 'scissors':0},
        'scissors': {'paper':1, 'scissors':0.5, 'rock':0},
    }

    const humanResult = rpsDataBase[humanChoice][botChoice];
    const botResult = rpsDataBase[botChoice][humanChoice];

    return [humanResult, botResult];
}

function finalMessage([humanResult,botResult])
{
    if (humanResult === 1)
    {
        return {'message':'You Win !','color':'green'};
    }

    else if (humanResult === 0.5)
    {
        return {'message':'You Tied !' , 'color':'yellow'};
    }

    else{
        return {'message': 'You Lost !','color':'red'};
    }
}


function rpsFrontEnd(humanChoice,botChoice,finalMessage)
{
    const rpsImgDataBase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    };

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');
    
    humanDiv.innerHTML  = "<img src = '"+ rpsImgDataBase[humanChoice]+ "' height = 150px width = 150px style = 'box-shadow: 0px 10px 20px  rgba(46, 14, 230, 0.7);'>";
    messageDiv.innerHTML  = "<h1 style = 'color:"+ finalMessage['color']+"; font-size:5rem; padding: 2rem;'>" + finalMessage['message'] +"</h1>"
    botDiv.innerHTML  = "<img src = '"+ rpsImgDataBase[botChoice]+ "' height = 150px width = 150px style = 'box-shadow: 0px 10px 20px  rgba(178, 0, 0, 1);'>";

    document.getElementById('main3').appendChild(humanDiv);
    document.getElementById('main3').appendChild(messageDiv);
    document.getElementById('main3').appendChild(botDiv);

}

// console.log(colorChoice);
var allButton = document.getElementsByTagName('button');
// console.log(colorChoice.value);

// console.log(allButton);
let allButtonCopy = [];

for(let i=0;i<allButton.length;i++)
{
    allButtonCopy.push(allButton[i].classList[1]);
}

// console.log(allButtonCopy);
function colorChange(colorChoice)
{

    if(colorChoice.value === 'red')
    {
        allButtonRed();
    }

    else if(colorChoice.value === 'green')
    {
        allButtonGreen();
    }

    else if(colorChoice.value === 'blue')
    {
        allButtonBlue();
    }

    else if(colorChoice.value === 'yellow')
    {
        allButtonYellow();
    }

    else if(colorChoice.value === 'reset')
    {
        allButtonReset();
    }

    else if(colorChoice.value === 'random')
    {
        allButtonRandom();
    }


}

function allButtonRed()
{
    for(let i=0;i<allButton.length;i++)
    {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-danger');
    }
}
function allButtonGreen()
{
    for(let i=0;i<allButton.length;i++)
    {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-success');
    }
}
function allButtonYellow()
{
    for(let i=0;i<allButton.length;i++)
    {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-warning');
    }
}

function allButtonBlue()
{
    for(let i=0;i<allButton.length;i++)
    {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-primary');
    }
}

function allButtonReset()
{
    for(let i=0;i<allButton.length;i++)
    {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(allButtonCopy[i]);
    }
}

function allButtonRandom()
{
    let buttonDataBase = ['btn-success','btn-primary','btn-warning','btn-danger'];

    for(let i=0;i<allButton.length;i++)
    {
        let num = Math.floor(Math.random()*4);
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(buttonDataBase[num]);
    }
}


var blackJackGame = {
    'you' :{'scoreSpan':'#yourScore','div':'yourBox','score':0} ,
    'dealer' :{'scoreSpan':'#dealerScore','div':'dealerBox','score':0} ,
    'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'K', 'Q'],
    'cardsMap' : {'2':2,'3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'A':[1,11], 'J':10, 'K':10, 'Q':10},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand' : false,
    'turnsOver' : false,
};

const YOU = blackJackGame['you'];
const DEALER  =blackJackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#hitButton').addEventListener('click', blackJackHit);
document.querySelector('#standButton').addEventListener('click', blackJackStand);
document.querySelector('#dealButton').addEventListener('click', blackJackDeal);


function blackJackHit()
{
    if(blackJackGame['isStand'] === false)
    {
        let cardToShow =  randCard();
        showCard(cardToShow,YOU);
        updateScore(cardToShow, YOU);
        showScore(YOU);
    }

}

function randCard()
{
    let indexOfCard = Math.floor(Math.random()*13);
    return blackJackGame['cards'][indexOfCard];
}

function showCard(cardToShow,activePlayer)
{
    if(activePlayer['score'] <= 21)
    {

        let imageOfCard = document.createElement('img');
        imageOfCard.setAttribute('id','imgResizing');
        imageOfCard.src = (`images/${cardToShow}.png`);
        if (activePlayer === YOU)document.querySelector('#yourBox').appendChild(imageOfCard);
        else if(activePlayer === DEALER ) document.querySelector('#dealerBox').appendChild(imageOfCard);
        hitSound.play();
        
    }
}

function updateScore(card,activePlayer)
{
     if(card === 'A')
     {
         if(activePlayer['score']+blackJackGame['cardsMap'][card][1] <= 21){
             activePlayer['score'] += blackJackGame['cardsMap'][card][1];
            }
            else{
                activePlayer['score'] += blackJackGame['cardsMap'][card][0];
         }
     }

     else {
         activePlayer['score'] += blackJackGame['cardsMap'][card];
     }

}

function showScore(activePlayer)
{
    if (activePlayer['score']>21)
    {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BLUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    }
    
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function blackJackStand()
{
    blackJackGame['isStand'] = true;
    
    let cardToShow =  randCard();
    showCard(cardToShow,DEALER);
    updateScore(cardToShow, DEALER);
    showScore(DEALER);
    
    // if(bla ckJackGame['isStand'] === true)
   if(DEALER['score'] > 16)
   {
       blackJackGame['turnsOver'] = true;
       let winnerOfGame = blackJackWinner();
       showResult(winnerOfGame);
   }
}

function blackJackDeal()
{
    if(blackJackGame['turnsOver'] === true)
    {
        blackJackGame['isStand'] = false;
        let yourBoxImage = document.querySelector("#yourBox").querySelectorAll('img');
        let dealerBoxImage = document.querySelector("#dealerBox").querySelectorAll('img');
        for (let i=0;i<yourBoxImage.length;i++)
        {
            yourBoxImage[i].remove();
        }
        for (let i=0;i<dealerBoxImage.length;i++)
        {
            dealerBoxImage[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#yourScore').textContent = 0;
        document.querySelector('#yourScore').style.color = 'white';

        document.querySelector('#dealerScore').textContent = 0;
        document.querySelector('#dealerScore').style.color = 'white';

        document.querySelector('#gameMessage').textContent = "Let's  play";
        document.querySelector('#gameMessage').style.color = 'black';
    }

    blackJackGame['turnsOver'] = false;
}

function blackJackWinner(){
    let winner;
    if(YOU['score'] <=21 )
    {
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21)
        {
            blackJackGame['wins']++;
            winner = YOU;
        }

        else if(YOU['score'] < DEALER['score'])
        {
            blackJackGame['losses']++;
            winner = DEALER;
        }

        else if(YOU['score'] === DEALER['score'])
        {
            blackJackGame['draws']++;
        }
    }

    else if(YOU['score'] > 21 && DEALER['score'] <= 21)
    {
        blackJackGame['losses']++;
        winner = DEALER;
    }

    else if(YOU['score'] > 21 && DEALER['score'] > 21)
    {
        blackJackGame['draws']++;
    }

    return winner;
}


function showResult(winner)
{
    let message,messageColor,sound;

    if(blackJackGame['turnsOver'] ===  true)
    {
        if (winner === YOU)
        {
            message = 'You win !';
            messageColor = 'green';
            sound = winSound;
        }

        else if(winner === DEALER)
        {
            message = 'You lost !';
            messageColor = 'red';
            sound = lossSound;
        }

        else {
            message = 'You draw !';
            messageColor = 'yellow';
            sound = lossSound;
        }

        document.querySelector('#gameMessage').textContent = message;
        document.querySelector('#gameMessage').style.color = messageColor;
        sound.play();

        pointsOfGame();
    }
}

function pointsOfGame()
{
    let arrOfPoints = [blackJackGame['wins'],blackJackGame['losses'],blackJackGame['draws']];
    let numberOfTd = document.querySelector('#main3-flexbox').getElementsByTagName('td');
    for(let i=0;i<numberOfTd.length;i++)
    {
        numberOfTd[i].textContent = arrOfPoints[i];
    }

}


