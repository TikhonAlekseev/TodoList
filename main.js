var form = document.getElementById("addForm");
var itemsList = document.getElementById("items");
var filter = document.getElementById("filter");

let data = [];

setData()

data.forEach((item) => renderItem(item))

form.addEventListener("submit", addItem);

itemsList.addEventListener("click", removeItem);

filter.addEventListener("keyup", filterItems);


function addItem(e) {
 
  e.preventDefault();

  var newItemInput = document.getElementById("newItemText");

  var newItemText = newItemInput.value;

  var newElement = document.createElement("li");
  newElement.className = "list-group-item";

  var newTextNode = document.createTextNode(newItemText);
  newElement.appendChild(newTextNode);


  var deleteBtn = document.createElement("button");
 
  deleteBtn.appendChild(document.createTextNode("Удалить"));

  deleteBtn.className = "btn btn-light btn-sm float-right";

  deleteBtn.dataset.action = "delete";

  newElement.appendChild(deleteBtn);
  
  itemsList.prepend(newElement);

  newItemInput.value = "";

  data.push(newItemText)

  localStorage.setItem("data", JSON.stringify(data))
}

function removeItem(e) {
  if (
    e.target.hasAttribute("data-action") &&
    e.target.getAttribute("data-action") == "delete"
  ) {
    if (confirm("Удалить задачу?")) {
      e.target.parentNode.remove();

      const textValue = e.target.parentNode.firstChild.textContent

      const index = data.indexOf(textValue)

      data.splice(index,1)
      
      localStorage.setItem("data" , JSON.stringify(data))
    }
  }
}

function filterItems(e) {

  var searchedText = e.target.value.toLowerCase();

  var items = itemsList.querySelectorAll("li");

  items.forEach(function (item) {
  
    var itemText = item.firstChild.textContent.toLowerCase();

    if (itemText.indexOf(searchedText) != -1) {
    
      item.style.display = "block";
    } else {

      item.style.display = "none";
    }
  });
}

function setData(){

  var jsonData = localStorage.getItem("data");

  if(jsonData){
    data = JSON.parse(jsonData);
  }
};

function renderItem(itemText){

  var newElement = document.createElement("li");

  newElement.className = "list-group-item";

  var newTextNode = document.createTextNode(itemText);

  newElement.appendChild(newTextNode);

  var deleteBtn = document.createElement("button");

  deleteBtn.appendChild(document.createTextNode("Удалить"));

  deleteBtn.className = "btn btn-light btn-sm float-right";
  
  deleteBtn.dataset.action = "delete";

  newElement.appendChild(deleteBtn);
  
  itemsList.prepend(newElement);
}
