const monsterContainer = document.querySelector(".monster-container");
let monsterNumber = 0;
let monsterName = "";
let challengeRating = 0;
const generateMonsterNumber = function() {
  monsterNumber = Math.floor(Math.random() * 500);
  return monsterNumber;
}
const determineProperResponse = function(monster){
  challengeRating = monster.challenge_rating;
  if(challengeRating < 2) {
    return "You think you can take it."
  }
  else if(challengeRating < 4) {
    return "It looks very scary."
  }
  else if(challengeRating < 8) {
    return "It looks terrifying."
  }
  else if(challengeRating < 12) {
    return "It looks like you should run away very fast."
  }
  else if(challengeRating < 16) {
    return "You should run away screaming."
  }
  else {
    return "Prepare to be turned into space dust."
  }
}
const outputMonster = function(monster) {
  console.log(monster);
  monsterContainer.innerHTML = `<h2>Dracula has summoned a <a href="https://www.dndbeyond.com/monsters/${monster.name}">${monster.name}</a>. It is a ${monster.size} sized creature. ${determineProperResponse(monster)}</h2>`;

}
const summonHellHound = function() {
  fetch('https://random.dog/woof.json')
    .then(function(response){
      // JSON that is returned from the server must be converted to a JS object asynchronously.
      if (!response.ok) {
        throw new Error('Not 200 OK');
      }
      return response.json();
    })
    .then(function(data){
      // Any code that depends on the `data` must go in this block  
      monsterContainer.innerHTML = `<h2>Dracula has summoned a giant hell hound. Quiver in despair at its horrific visage:</h2> <img src="${data.url}" alt="It's an invisible hell hound"></img>`;
    })
    .catch(function(err){
      // An error or `reject` from any of the above `.then()` blocks will end up here.
      console.log(err);
    });
}
const fetchMonster = function() {
  fetch('https://www.dnd5eapi.co/api/monsters/')
    .then(function(response) {
      // JSON that is returned from the server must be converted to a JS object asynchronously.
      if (!response.ok) {
        throw new Error('Not 200 OK');
      }
      return response.json();
    })
    .then(function(data) {
      // Any code that depends on the `data` must go in this block 
      // once data is fetched then get monster number then get the monster's URL then fetch stats with another fetch because that's how this api works
      monsterNumber = generateMonsterNumber();
      // if the monster number is > 331 then he will summon a giant dog instead.
      if(monsterNumber > 331)
      {
        summonHellHound();
      } else {
        monsterURL = data.results[monsterNumber].url;
        fetchMonsterStats(monsterURL);
      }
    })
    .catch(function(err) {
      // An error or `reject` from any of the above `.then()` blocks will end up here.
      console.log(err);
    });
}
const fetchMonsterStats = function(monsterURL) {
  fetch(`https://www.dnd5eapi.co${monsterURL}`) 
    .then(function(response) {
      // JSON that is returned from the server must be converted to a JS object asynchronously.
      if (!response.ok) {
        throw new Error('Not 200 OK');
      }
      return response.json();
    })
    .then(function(data) {
      //once everything is fetched and good then output to page
      outputMonster(data);
    })
    .catch(function(err) {
      // An error or `reject` from any of the above `.then()` blocks will end up here.
      console.log(err);
    });   
}
  const summonButton = document.querySelector(".summon-button");
  summonButton.addEventListener("click", fetchMonster);
  