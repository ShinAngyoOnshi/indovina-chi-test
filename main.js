 //variabili
const API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-3.5-turbo";
const API_KEY = ""; //inserire qui la chiave API

const loader = document.querySelector(".loading")
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

let listaPersonaggi = [];
let choiceCharacter = [];

//FUNCTIONS

async function guessGenerator() {
    //mostrare il loader
    loader.classList.remove("loading-hidden");
    //dichiare i parametri
    const action = getRandomAction();
    let character = randomCharacter();
    const temperature = 0.7;
    //recuperare la risposta
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [
                {
                    role: "user",
                    content: `Sei ${character} e ${action} con un massimo di 100 caratteri senza hashtag`
                }
            ],
            temperature: temperature
        })
    })
    
    //interpretare la risposta in json
    const data = await response.json()
    //compilare la modale con i dati ricevuti
    console.log(data)
    const message = data.choices[0].message.content;
    modalContent.innerHTML = `
    <p>${message}</p>
    `
    //Nascondere il loading e far vedere la modale
    loader.classList.add("loading-hidden"); 
    modal.classList.remove("modal-hidden");
    
    //restituire e conservare il character

    if (choiceCharacter.length >= 1) {     
        choiceCharacter.pop();
        choiceCharacter.push(character);
    } else {
        choiceCharacter.push(character);
    }

    // operatore ternario
    // choiceCharacter.length ? 
    // choiceCharacter = [] :
    // choiceCharacter.push(character);

    console.log(character);
    console.log(choiceCharacter);
}

console.log(listaPersonaggi);
console.log(choiceCharacter);


//function random action


function getRandomAction() {
    const action = [
        'salutare nel tuo modo più iconico',
        'dare un consiglio di stile in base ai tuoi gusti',
        'raccontare la tua ultima avventura',
        'svelarmi i tuoi sogni',
        'dirmi chi è il tuo migliore amico',
        'scrivere la tua bio di linkedin'
        
    ];
    const indexRandom = Math.floor(Math.random() * action.length)
    return action[indexRandom];
}

//INIT & events

const guess = document.querySelector(".btn")
const characters = document.querySelectorAll(".character");

let charactersArray = Array.from(characters);

// console.log(charactersArray);

//function random character

function randomCharacter(){
    listaPersonaggi = [];

    charactersArray.forEach(function(element) {
        let nameCharacter = element.dataset.character;
        listaPersonaggi.push(nameCharacter);
    })


    const indexRandom = Math.floor(Math.random() * 9)
    console.log(indexRandom);
    
    return listaPersonaggi[indexRandom];
}

console.log(randomCharacter());
console.log(listaPersonaggi);


// const randomName = randomCharacter();
// console.log(randomName)


// Guess Button

guess.addEventListener("click", () => {
    guessGenerator();
})

// modale

modalClose.addEventListener("click", function() {
    modal.classList.add("modal-hidden");
});

//Character pick
// let intersection = listaPersonaggi.filter(element => choiceCharacter.includes(element));

// insert modal alert "Make your choice" or "Take your pick"

characters.forEach(function(element) {
    
    element.addEventListener("click", function(){
        
        let nameCharacter = element.dataset.character;
        
        if (choiceCharacter.toString() === nameCharacter) {
            console.log("Hai indovinato")
            // add modal result
        } else {
            console.log("Ritenta")
            //add modal result
        }
    })
})




