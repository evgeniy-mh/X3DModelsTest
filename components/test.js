var modelContainer = document.getElementById('modelContainer');
var answerButtonsContainer = document.getElementById('answerButtonsContainer');

function loadPageHeader() {
  $(function() { $('#page-header').load('components/header.html'); });
}
loadPageHeader();

//Массив фигур. Содержит фигуры правильное название котторых пользователю
//нелбходимо будет указать.
var questions = [];
//Номер текущего вопроса
var questionIndex = 0;

//Массив фигур. Содержит правильный ответ и несколько неправильных.
var answers = [];

//
var rightAnswer;

(function() { initQuestionsList(); })();

function createX3DModel(model) {
  var inline = document.createElement("inline");
  inline.setAttribute("url", model.getX3DModelName());

  var scene = document.createElement("scene");
  scene.setAttribute("id", model.getX3DModelName());
  scene.appendChild(inline);

  var x3d = document.createElement("x3d");
  setAttributes(x3d, {"id": "x3dElement", "width": "400px", "height": "300px"});
  x3d.appendChild(scene);

  return x3d;
}

function loadX3DContainer(model) {
  var divWX3DElement = document.createElement("div");
  divWX3DElement.setAttribute("class", "col");
  var x3d = createX3DModel(model);
  divWX3DElement.appendChild(x3d);

  var divRow = document.createElement("div");
  divRow.setAttribute("class", "row");
  divRow.appendChild(divWX3DElement);

  modelContainer.appendChild(divRow);
}

function deleteX3DCurrentModel() {
  document.getElementById("x3dElement").remove();
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
  this.answers.length=0;
  this.answers.push(rightAnswer);

  //Найти случайные неправильные ответы
  i = 0;
  while (i < numberOfAnswers - 1) {
    var nextIndex = Math.floor(Math.random() * Models.length);
    if (answers.includes(Models[nextIndex]) ||
        (rightAnswer.name === Models[nextIndex].name)) {
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

  $(answerButtonsContainer).empty();

  //Вывести варианты ответов в качестве кнопок
  this.answers.forEach(element => {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-secondary";
    button.innerText = element.rusName;
    button.onclick = checkAnswer;
    answerButtonsContainer.appendChild(button);
  });

  //loadX3DContainer(this.rightAnswer);
  loadX3DContainer(this.rightAnswer);
}

function initQuestionsList() {
  questions = Models.slice(0);
  shuffleArray(questions);
  initModelAnswers(questions[questionIndex]);
}

function checkAnswer(event) {
  if (event.target.innerText === rightAnswer.rusName) {
    console.log("da");
  }
}

function nextQuestion() {
  deleteX3DCurrentModel();
  questionIndex++;
  initModelAnswers(questions[questionIndex]);
}

//Алгоритм Фишера–Йетса для случайной перестановки элементов в массиве
function shuffleArray(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}