var modelsListContainer = document.getElementById('modelsListContainer');

const modelsDirectory = "x3d/";
Models = [
  new X3DModel(modelsDirectory + "cube"),
  new X3DModel(modelsDirectory + "cone"),
  new X3DModel(modelsDirectory + "cylinder"),
  new X3DModel(modelsDirectory + "sphere"),
  new X3DModel(modelsDirectory + "torus"),
];

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

function createX3DModelsList() {
  Models.forEach(element => {
    var divWX3DElement = document.createElement("div");
    divWX3DElement.setAttribute("class", "col");
    var x3d = createX3DModel(element);
    // var x3d = document.createTextNode("sdfdsfsd");
    divWX3DElement.appendChild(x3d);

    var divWModelDescription = document.createElement("div");
    divWModelDescription.setAttribute("class", "col");

    fetch(element.getModelDescription())
        .then(response => response.text())
        .then(text => {
          /*var modelDescription = document.createTextNode(text);
          divWModelDescription.appendChild(modelDescription);*/
          divWModelDescription.innerHTML = text;
        });

    var divRow = document.createElement("div");
    divRow.setAttribute("class", "row");
    divRow.appendChild(divWX3DElement);
    divRow.appendChild(divWModelDescription);

    modelsListContainer.appendChild(divRow);
  });
}

//Функия позволяющая быстро задавать необходимые параметры HTML элементов при их
//создании
function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function loadPageHeader() {
  $(function() {
    $('#page-header').load('components/header.html');
  });
}

createX3DModelsList();
loadPageHeader();