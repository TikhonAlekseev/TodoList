var form = document.getElementById("addForm");
var itemsList = document.getElementById("items");
var filter = document.getElementById("filter");


// Создаем переменную под массив с задачами
let data = [];
// console.log("data", data)

// Получаем данные из localStorage
setData()
// console.log("data", data)

data.forEach((item) => renderItem(item))


// Добавление новой задачи прослушка события
form.addEventListener("submit", addItem);

// Удаление элемента - прослушка клика
itemsList.addEventListener("click", removeItem);

// Фильтрация списка дел - прослушка ввода
filter.addEventListener("keyup", filterItems);






// Добавление новой задачи функция
function addItem(e) {
  // Отменяем отправку формы
  e.preventDefault();

  // Находим инпут с текстом для новой задачи
  var newItemInput = document.getElementById("newItemText");
  // Получаем текст из инпута
  var newItemText = newItemInput.value;
  // Создаем элемент для новой задачи
  var newElement = document.createElement("li");
  newElement.className = "list-group-item";

  // Добавим текст в новый элемент
  var newTextNode = document.createTextNode(newItemText);
  newElement.appendChild(newTextNode);

  // Создаем кнопку
  var deleteBtn = document.createElement("button");
  // Добавляем текст
  deleteBtn.appendChild(document.createTextNode("Удалить"));
  // Добавляем CSS class
  deleteBtn.className = "btn btn-light btn-sm float-right";
  // Добавляем data атрибут
  deleteBtn.dataset.action = "delete";

  // Помещаем кнопку внутрь тега li
  newElement.appendChild(deleteBtn);
  // console.log("addItem -> newElement", newElement);

  // Добавляем новую задачу в список со всеми задачами
  itemsList.prepend(newElement);

  // Очистим поле добавления новой задачи
  newItemInput.value = "";

  //Записываем задачу в переменную data
  data.push(newItemText)
  console.log(data)
  //Cохраняем данные в localStorage
  localStorage.setItem("data", JSON.stringify(data))
}

// Удаление элемента - ф-я
function removeItem(e) {
  if (
    e.target.hasAttribute("data-action") &&
    e.target.getAttribute("data-action") == "delete"
  ) {
    if (confirm("Удалить задачу?")) {
      e.target.parentNode.remove();

      //Удаление задачи из массива data:

      //Получение текста задачи
      const textValue = e.target.parentNode.firstChild.textContent

      //Находим в массиве задачу с данной записью
      const index = data.indexOf(textValue)

      //Удаляем задачу  с данной записью в массиве
      data.splice(index,1)
      
      //Обновляем данные localStorage
      localStorage.setItem("data" , JSON.stringify(data))

    }
  }



}

// Фильтрация списка дел ф-я
function filterItems(e) {
  // Получаем фразу для поиска и переводим ее в нижний регистр
  var searchedText = e.target.value.toLowerCase();

  // 1. Получаем списко всех задач
  var items = itemsList.querySelectorAll("li");

  // 2. Перебираем циклом все найденные теги li с задачами
  items.forEach(function (item) {
    // Получаем текст задачи из списка и переводим его в нижний регистр
    var itemText = item.firstChild.textContent.toLowerCase();

    // Проверяем вхождение искомой подстроки в текст задачи
    if (itemText.indexOf(searchedText) != -1) {
      // Если вхождение есть - показываем элемент с задачей
      item.style.display = "block";
    } else {
      // Если вхождения нет - скрываем элемент с задачей
      item.style.display = "none";
    }
  });
}

// Функция получения данных из localStorage

function setData(){
  //Получаем данные из localStorage
  const jsonData = localStorage.getItem("data");

  // Проверка на заполненность массива
  if(jsonData){
    //Если мы что-то получили , то преоразовываем это в массив и записываем в переменную
    data = JSON.parse(jsonData);
    console.log(data)
  }
};

// Функция добавления разметки записи с текстом полученнм из массива

function renderItem(itemText){

  var newElement = document.createElement("li");
  newElement.className = "list-group-item";

  // Добавим текст в новый элемент
  var newTextNode = document.createTextNode(itemText);
  newElement.appendChild(newTextNode);

  // Создаем кнопку
  var deleteBtn = document.createElement("button");
  // Добавляем текст
  deleteBtn.appendChild(document.createTextNode("Удалить"));
  // Добавляем CSS class
  deleteBtn.className = "btn btn-light btn-sm float-right";
  // Добавляем data атрибут
  deleteBtn.dataset.action = "delete";

  // Помещаем кнопку внутрь тега li
  newElement.appendChild(deleteBtn);
  // console.log("addItem -> newElement", newElement);

  // Добавляем новую задачу в список со всеми задачами
  itemsList.prepend(newElement);
}
