class X3DModel {
  constructor(modelURL, modelDescription) {
    this.modelURL = modelURL;
    this.modelDescription = modelDescription;
  }
}

var modelsListContainer = document.getElementById('modelsListContainer');

Models = [new X3DModel("x3d/Deer.x3d", "desc"),new X3DModel("x3d/cube.x3d", "desc cube")];

function createX3DModel(model) {
  console.log(model);

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
    //var x3d = document.createTextNode("sdfdsfsd");
    divWX3DElement.appendChild(x3d);

    var divWModelDescription = document.createElement("div");
    divWModelDescription.setAttribute("class", "col");
    var modelDescription = document.createTextNode(element.modelDescription);
    divWModelDescription.appendChild(
    document.createTextNode(element.modelDescription));

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

//Функция возвращающая название выбранной трехмерной модели
function getX3DModel() {
  return ShapeSelectListBox.options[ShapeSelectListBox.selectedIndex]
      .attributes.name.value;
}