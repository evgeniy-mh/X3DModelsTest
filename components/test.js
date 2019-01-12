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

(function() {
  initQuestionsList();
  loadX3DContainerToDOM();
})();

function createX3DInline(model) {
  var inline = document.createElement("inline");
  setAttributes(inline, {"url": model.getX3DModelName(), "id": model.name});
  return inline;
}

function createX3DContainer(model) {
  var scene = document.createElement("scene");
  scene.setAttribute("id", "X3DScene");

  if (model !== null) {
    var inline = createX3DInline(model);
    scene.appendChild(inline);
  }

  var x3d = document.createElement("x3d");
  setAttributes(x3d, {"id": "x3dElement", "width": "400px", "height": "300px"});
  x3d.appendChild(scene);

  return x3d;
}

function loadX3DContainerToDOM() {
  var divWX3DElement = document.createElement("div");
  divWX3DElement.setAttribute("class", "col");
  // var x3d = createX3DScene(model);
  var x3d = createX3DContainer(null);

  divWX3DElement.appendChild(x3d);

  var divRow = document.createElement("div");
  divRow.setAttribute("class", "row");
  divRow.appendChild(divWX3DElement);

  modelContainer.appendChild(divRow);
}

function loadX3DInlineToX3DContainer(model) {
  var scene = document.getElementById("X3DScene");
  scene.appendChild(createX3DInline(model));
}

function deleteX3DInlineFromX3DContainer(model) {
  var scene = document.getElementById("X3DScene");
  var inline = document.getElementById(model.name);
  if (inline !== null) {
    scene.removeChild(inline);
  }
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

  //Добавить правильный ответ
  this.rightAnswer = rightAnswer;
  this.answers.length = 0;
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

  // loadX3DContainer(this.rightAnswer);
  //loadX3DInlineToX3DContainer(this.rightAnswer);
}

function initQuestionsList() {
  questions = Models.slice(0);
  shuffleArray(questions);
}

function checkAnswer(event) {
  if (event.target.innerText === rightAnswer.rusName) {
    console.log("da");
  }
}

function nextQuestion() {
  deleteX3DInlineFromX3DContainer(questions[questionIndex]);
  questionIndex++;  
  initModelAnswers(questions[questionIndex]);
  loadX3DInlineToX3DContainer(this.rightAnswer);
}

function startTest() {
  initModelAnswers(questions[questionIndex]);
  loadX3DInlineToX3DContainer(this.rightAnswer);
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