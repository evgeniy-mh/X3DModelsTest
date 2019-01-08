/*var pageContainer = document.getElementById('page-container');

loadModelsPage();

function loadModelsPage() {
  fetch('x3dObjects.html').then(response => response.text()).then(text => {
    pageContainer.innerHTML = text;
  })
}*/



function loadModelsList() {
  $(function() {
    $('#page-container').empty();
    $('#page-container').load('x3dObjects.html');
  });
}

function loadModelsTest(){
    $(function() {
        $('#page-container').empty();
        $('#page-container').load('test.html');
      });
}