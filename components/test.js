var modelContainer = document.getElementById('modelContainer');
var answerButtonsContainer = document.getElementById('answerButtonsContainer');

function loadPageHeader() {
  $(function() { $('#page-header').load('components/header.html'); });
}
loadPageHeader();

var answers = [];
var rightAnswer;

function createX3DModel(model) {
  var inline = document.createElement("inline");
  inline.setAttribute("url", model.getX3DModelName());

  var scene = document.createElement("scene");
  scene.setAttribute("id", model.getX3DModelName() + "Scene");
  scene.appendChild(inline);

  var x3d = document.createElement("x3d");
  setAttributes(x3d, {"width": "400px", "height": "300px"});
  x3d.appendChild(scene);

  return x3d;
}

function showX3DModel(model) {
  var divWX3DElement = document.createElement("div");
  divWX3DElement.setAttribute("class", "col");
  var x3d = createX3DModel(model);
  divWX3DElement.appendChild(x3d);

  var divRow = document.createElement("div");
  divRow.setAttribute("class", "row");
  divRow.appendChild(divWX3DElement);

  modelContainer.appendChild(divRow);
}

//Функия позволяющая быстро задавать необходимые параметры HTML элементов при их
//создании
function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function initModelAnswers(rightAnswer) {
  var numberOfAnswers = 4;
  /*for (i = 0; i < numberOfAnswers - 1; i++) {
    var nextIndex = Math.floor(Math.random() * Models.length);
    this.answers.push(Models[nextIndex]);
  }*/

  //Добавить правильный ответ
  this.rightAnswer = rightAnswer;
  this.answers.push(rightAnswer);

  //Найти случайные неправильные ответы
  i = 0;
  while (i < numberOfAnswers - 1) {
    var nextIndex = Math.floor(Math.random() * Models.length);
    if (answers.includes(Models[nextIndex]) || (rightAnswer.name===Models[nextIndex].name)) {
      continue;
    } else {
      i++;
    }
    answers.push(Models[nextIndex]);
  }

  //Переместить правильный ответ из начала массива в случайное место
  var temp = this.answers[0];
  var randIndex = Math.floor(Math.random() * answers.length);
  this.answers[0] = this.answers[randIndex];
  this.answers[randIndex] = temp;

  //Вывести варианты ответов в качестве кнопок
  this.answers.forEach(element => {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-secondary";
    button.innerText = element.rusName;
    button.onclick=checkAnswer;
    answerButtonsContainer.appendChild(button);
  });

  showX3DModel(this.rightAnswer);
}

initModelAnswers(Models[3]);

function checkAnswer(event){
  if(event.target.innerText===rightAnswer.rusName){
    console.log("da");
  }
}