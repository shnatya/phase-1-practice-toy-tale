//second virsion of grabbing a <p> element on the card using p_id
let addToy = false;
base_url = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  initialize();
});
function initialize() {
  const form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", addNewToy)
  getToys();
}
function addNewToy(event) {
    event.preventDefault();
    let newToyObj = {
      name: `${event.target[0].value}`,
      image: `${event.target[1].value}`,
      likes: 0
    }
    fetch(base_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToyObj)
    }).then(res => res.json())
    .then(data => console.log(data))
    renderToyCard(newToyObj);
};
function getToys() {
    fetch(base_url)
    .then(res => res.json())
    .then(toysArray => toysArray.forEach(toy => renderToyCard(toy)))
}
//Create a new toy card and render it to DOM
function renderToyCard(toy) {
    let toyCard = document.createElement('li');
    const toyCollectionDiv = document.querySelector("#toy-collection")
    toyCard.className = "card";
    let p_id = "t_" + toy.id; // assigning id to each <p> so we can grab it or use button.previousElementSibling
    toyCard.innerHTML = `
      <h2>${toy.name}</h2>
      <img src = ${toy.image} class = "toy-avatar">
      <p id = ${p_id}>${toy.likes}</p>
      <button class="like-btn" id=${toy.id}>Like</button>
    `
    toyCollectionDiv.appendChild(toyCard);
    
    handleLikeButton(toy,p_id); //Listen for a click on "like" button
}
//"Like" button listens for an event and if it pressed, then likes increase by 1.
function handleLikeButton(toy,p_id) {
  const button = document.getElementById(`${toy.id}`)
  button.addEventListener("click", (event) => {
    event.preventDefault(); 
    toy.likes ++;
    likesVar = document.querySelector(`#${p_id}`)
    likesVar.textContent = `${toy.likes}`;
    saveLikesAPI(toy);
  })
}
function saveLikesAPI(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  }).then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.log(error.message))
}
//${e.target.id}
