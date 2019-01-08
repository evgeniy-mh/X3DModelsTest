class X3DModel {
  constructor(modelURL, modelDescriptionURL) {
    this.modelURL = modelURL;
    this.modelDescriptionURL = modelDescriptionURL;
  }
}

var modelsListContainer = document.getElementById('modelsListContainer');

const modelsDirectory="x3d/";
Models = [
  new X3DModel(modelsDirectory+"cube.x3d", modelsDirectory+"cube.txt"),
  new X3DModel(modelsDirectory+"cone.x3d", modelsDirectory+"cone.txt"),
  new X3DModel(modelsDirectory+"cylinder.x3d", modelsDirectory+"cylinder.txt"),
  new X3DModel(modelsDirectory+"sphere.x3d", modelsDirectory+"sphere.txt"),
  new X3DModel(modelsDirectory+"torus.x3d", modelsDirectory+"torus.txt"),
];

function createX3DModel(model) {
  var inline = document.createElement("inline");
  inline.setAttribute("url", model.modelURL);

  var scene = document.createElement("scene");
  scene.setAttribute("id", model.modelURL + "Scene");
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

    fetch(element.modelDescriptionURL)
        .then(response => response.text())
        .then(text => {
          var modelDescription = document.createTextNode(text);
          divWModelDescription.appendChild(modelDescription);
        });

    var divRow = document.createElement("div");
    divRow.setAttribute("class", "row");
    divRow.appendChild(divWX3DElement);
    divRow.appendChild(divWModelDescription);

    modelsListContainer.appendChild(divRow);
  });
}

createX3DModelsList();

//Функия позволяющая быстро задавать необходимые параметры HTML элементов при их
//создании
function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

//Функция-обработчик события нажатия на кнопку загрузки новой трехмерной модели
// loadNewModelButton.onclick = function () {
//     //Удаление старого содержимого X3DTransformRoot
//     clearX3DViev();

//     //Создание новых дочерних элементов с новой трехмерной фигурой
//     var X3DTransform = document.createElement('transform');
//     X3DTransform.setAttribute("translation", "0 0 0");
//     var X3DShape = document.createElement('shape');
//     var X3DAppearance = document.createElement('appearance');
//     var X3DMaterial = document.createElement('material');
//     var texture =
//     X3DAppearance.appendChild(document.createElement("texture"));
//     texture.setAttribute("hideChildren", "false");
//     var canvas = texture.appendChild(document.createElement("canvas"));
//     setAttributes(canvas, {
//         "width": "512",
//         "height": "512",
//         "id": "textureCanvas",
//         "style": "border: solid 1px black; position:absolute;
//         top:20px;left:520px;"
//     });

//     X3DAppearance.appendChild(X3DMaterial);
//     X3DShape.appendChild(X3DAppearance);
//     X3DTransform.appendChild(X3DShape);
//     var X3DModel = document.createElement(getX3DModel());
//     X3DShape.appendChild(X3DModel);

//     X3DTransformRoot = document.getElementById('X3DTransformRoot');
//     X3DTransformRoot.appendChild(X3DTransform);
//     initCanvas();
//     clearCanvas();
// }

//Функция для удаления всем дочерних элементов X3DTransformRoot
function clearX3DViev() {
  var X3DTransformRoot = document.getElementById('X3DTransformRoot');
  for (var i = 0; i < X3DTransformRoot.childNodes.length; i++) {
    if (X3DTransformRoot.childNodes[i].nodeType === Node.ELEMENT_NODE) {
      X3DTransformRoot.removeChild(X3DTransformRoot.childNodes[i]);
      break;
    }
  }
}