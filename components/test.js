var modelContainer = document.getElementById('modelContainer');
var answerButtonsContainer = document.getElementById('answerButtonsContainer');
var questionNumberContainer =
    document.getElementById('questionNumberContainer');
var userScoreContainer = document.getElementById('userScoreContainer');

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

//Правильный ответ
var rightAnswer;

//Баллы пользователя
userScore = 0;
//Количество правильных ответов
rightAnswersCount = 0;

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

function clearX3DInlineFromX3DContainer(){
  /*var scene = document.getElementById("X3DScene");
  scene.childNodes.forEach(node=>{
    console.log(node);
    node.remove();
  })*/
  $(X3DScene).empty();
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
  // loadX3DInlineToX3DContainer(this.rightAnswer);
}

function initQuestionsList() {
  questions = Models.slice(0);
  shuffleArray(questions);
}

function checkAnswer(event) {
  if (event.target.innerText === rightAnswer.rusName) {
    //Правильный ответ на вопрос
    userScore += 10;
    rightAnswersCount++;
    nextQuestion();
  } else {
    //Неправильный ответ на вопрос
    nextQuestion();
  }
}

function nextQuestion() {
  if (questionIndex + 1 === questions.length) {  //Все вопросы пройдены
    endTest();
    return;
  }

  deleteX3DInlineFromX3DContainer(questions[questionIndex]);
  questionIndex++;
  initModelAnswers(questions[questionIndex]);
  loadX3DInlineToX3DContainer(this.rightAnswer);
  updateTestInfo();
}

function startTest() {
  initModelAnswers(questions[questionIndex]);
  loadX3DInlineToX3DContainer(this.rightAnswer);
  updateTestInfo();
}

function endTest() {
  // alert(`Вы набрали ${userScore} баллов и ответили на ${rightAnswersCount} из
  // ${questions.length} правильно.` );
  document.getElementById("endTestInfoContainer").innerText =
      `Вы набрали ${userScore} баллов и ответили на ${rightAnswersCount} из ${questions.length} правильно.`;
  document.getElementById("endTestModalLabel").innerText =
      rightAnswersCount === questions.length ? "Вы прошли тест!" :
                                               "Вы не прошли тест";
  $('#endTestModal').modal('show')
}

function startTestAgain(){
  clearX3DInlineFromX3DContainer();
  questionIndex = 0;
  userScore = 0;
  rightAnswersCount = 0;
  initQuestionsList();
  initModelAnswers(questions[questionIndex]);  
  nextQuestion();
  startTest();
}

function updateTestInfo() {
  questionNumberContainer.innerText =
      `${questionIndex+1} из ${questions.length}`;
  userScoreContainer.innerText = userScore;
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