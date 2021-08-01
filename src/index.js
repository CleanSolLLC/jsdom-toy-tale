//get object from db.json and iterate over the object to populate characters
document.addEventListener("DOMContentLoaded", function() {
});
const toyCollection = document.getElementById("toy-collection");
const addNewToyButton = document.getElementById("new-toy-btn")
const createNewToyButton = document.querySelector(".submit")


addNewToyButton.addEventListener("click", function() {
  showInputForm();
})
toyCollection.addEventListener("click", function(e) {
  addToLikeCounter(e);
})
createNewToyButton.addEventListener("click", function() {
  addCharacter();
});



getCharacters();

function getCharacters() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json()) 
  .then(data => populateCards(data))
}

 
function populateCards(characters) {
  let id = document.getElementById("toy-collection")
    for(const character of characters) {
	  let div = document.createElement("div")
	    div.className = "card";
        id.appendChild(div)
		div.dataset.id = character.id;
		let h2 = document.createElement("h2");
		h2.innerHTML = character.name;
		let img = document.createElement("img");
		img.className = "toy-avatar"
		img.src = character.image;
		let p = document.createElement("p");
		p.innerHTML = character.likes; 
        p.innerHTML += character.likes > 1 ? " likes" : " like"
		
		const btn = document.createElement("BUTTON");
		btn.className = "like-btn"
		btn.innerHTML= "Like <3"
		div.appendChild(h2);
		div.appendChild(img);
		div.appendChild(p);
		div.appendChild(btn);
	}

}


function addToLikeCounter(event) {
	let e = event["path"][1]
	  let p = e.querySelector("p");
	  let pageLikes = p.innerHTML;
	  let updatedPageLikes = parseInt(pageLikes) + 1;
	  p.innerHTML = updatedPageLikes.toString();
	  p.innerHTML += parseInt(p.innerHTML) > 1 ? " likes" : " like"
	  updateChar(event); 
}   



function updateChar(e) {
  const charId = e.path[1].dataset.id
  let element = e.path[1]
  let p = element.querySelector("p");
  const num = parseInt(p.innerText).toString();


  fetch(`http://localhost:3000/toys/${charId}`,  {
        
     method: "PATCH",
     headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
         },

        body: JSON.stringify({likes: num})
   		
   		})
    .then(data => {
        console.log(data);
    })
    .catch(function(error){
        document.body.innerHTML = error.message
    })
}


function showInputForm() {
  const formData = {};
  var con = document.querySelector(".container");

  if (con.style.display === "") {
     con.style.display = 'block';
   } else {
     con.style.display = "";
   }
}



function formData() {	
   data	= {};
   data["name"] = document.body.getElementsByTagName("input")[0].value;
   data["image"] = document.body.getElementsByTagName("input")[1].value;
   data["likes"] = 0
   return data;
}



function addCharacter() {
  fetch("http://localhost:3000/toys",  {
        
     method: "POST",
     headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
         },

        body: JSON.stringify(formData())
   		
   		})
    .then(data => {
        console.log(data);
    })
    .catch(function(error){
        document.body.innerHTML = error.message
    })
    getCharacters();
}



