var modelContainer = document.getElementById('modelContainer');

/*const modelsDirectory = "x3d/";
Models = [
  new X3DModel(modelsDirectory + "cube"),
  new X3DModel(modelsDirectory + "cone"),
  new X3DModel(modelsDirectory + "cylinder"),
  new X3DModel(modelsDirectory + "sphere"),
  new X3DModel(modelsDirectory + "torus"),
];*/

function loadPageHeader() {
  $(function() { $('#page-header').load('components/header.html'); });
}
loadPageHeader();

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

function addModel(model) {
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



addModel(Models[0]);