let nav = document.querySelector('nav');
let home = document.querySelector('#home');
let menu = document.querySelector('#menu');
let section = document.querySelector('section');
let dropDown = document.querySelector('.dropDown');
let list = document.querySelector('.dropDown ul');
let breedList = document.querySelector('.breedList ul');
let h4 = document.querySelector('h4');
let imgCont = document.querySelector('.imgCont');
let button = document.querySelector('button');

let current = "";

// MENU FUNCTION
home.addEventListener('click', function(){
  window.location.href = '';
});

menu.addEventListener('click', function(){
  if (dropDown.style.display === 'none'){
    dropDown.style.display = 'block';
  } else  {
    dropDown.style.display = 'none';
  }
});

button.addEventListener('click', function(){
  imgCont.innerHTML = '';
  getIMG()
});

//GET RANDOM PIC
function getIMG(x){
  let info = new XMLHttpRequest();
  info.addEventListener("load", img);
  let hash = window.location.hash;
  if(!hash.includes("-") && hash.length > 0){
    info.open("GET", "https://dog.ceo/api/breed/"+ hash.slice(1) +"/images/random");
  } else if(hash.includes("-")) {
    let arr = hash.slice(1).split("-");
    info.open("GET", "https://dog.ceo/api/breed/"+ arr[0]+ "/" + arr[1] +"/images/random");
  } else {
    info.open('GET', 'https://dog.ceo/api/breeds/image/random');
  }
  info.send ();
}

function img() {
  let parsedImg = JSON.parse(this.responseText);
  let img = document.createElement('img');
  img.setAttribute('src', parsedImg.message);
  imgCont.appendChild(img);

  let text = JSON.stringify(parsedImg.message);
  displayBreed(text);
}

function displayBreed(y){
  let array = [];
  array = y.split('/');

  h4.textContent = array[4];
}

//GET BREEDS
function request() {
  console.log(this.status);
  let parse = JSON.parse(this.responseText);
  createLi(parse)
}

// CREATE LI ELEMENT
function createLi(parse){
  for (let breed in parse.message){
    let li = document.createElement('li');
    li.textContent = breed;
    list.appendChild(li);
    li.addEventListener('click', function(event){
      window.location.hash = breed;
      subBreed(parse, event);
      clickOnBreed(event);
    });
  }
}

function getBreeds(){
  let info = new XMLHttpRequest();
  info.addEventListener("load", request);
  info.open('GET', 'https://dog.ceo/api/breeds/list/all');
  info.send();
}
  getBreeds();

function clickOnBreed(event) {
  if (dropDown.style.display === 'block'){
    dropDown.style.display = 'none';}
    imgCont.innerHTML = '';
    let hash = window.location.hash;

    let req = new XMLHttpRequest();

    let clicked = event.target.textContent;
    if((!hash.includes("-") && hash.length > 0) || !hash){
      req.open("GET", "https://dog.ceo/api/breed/"+ hash.slice(1) +"/images/random");
    } else {
      let arr = hash.slice(1).split("-");
      req.open("GET", "https://dog.ceo/api/breed/"+ arr[0]+ "/" + arr[1] +"/images/random");
    }

    console.log(current);

    console.log(req);

    req.addEventListener("load", img);
    req.send();
  }

function subBreed(parse, event){
  breedList.innerHTML= '';
for (let dog in parse.message){
  if(event.target.textContent === dog){
    let getSub = parse.message[dog];
    for(let sub in getSub){
      console.log(getSub[sub]);

      let li = document.createElement('li');


      li.innerHTML = getSub[sub];
      li.style.textTransform = "capitalize";
      breedList.appendChild(li);

      li.addEventListener('click', function(e){
        window.location.hash = "#" + dog + "-" + getSub[sub];
        clickOnBreed(e);
      });
    }
  }
}
}
  getIMG();
