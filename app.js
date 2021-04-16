var selectedRow = null;
var pizzaArr = [];
// sessionStorage.setItem("Pizzas", JSON.stringify(pizzaArr));

console.log("hello");
console.log(sessionStorage.getItem("Pizzas"));

// loading from storage

if ((sessionStorage.getItem("Pizzas").length = 0)) {
  console.log("empty array");
} else {
  var storedArray = JSON.parse(sessionStorage.getItem("Pizzas")); //no brackets
  var i;
  if (storedArray.length > 0) {
    for (i = 0; i < storedArray.length; i++) {
      insertNewRecord(storedArray[i]);
    }
  }
}

function onFormSubmit() {
  if (validate()) {
    var formData = readFormData();
    if (selectedRow == null) {
      insertNewRecord(formData);
    } else {
      updateRecord(formData);
    }
    resetForm();
  }
}

function readFormData() {
  var formData = {};
  formData["name"] = document.getElementById("name").value;
  formData["price"] = document.getElementById("price").value;
  // formData["heat"] = document.getElementById("heat").value;

  // Heat radio logic
  var heatRadios = document.getElementsByName("heat");
  var checkedHeatRadio;

  for (var i = 0, length = heatRadios.length; i < length; i++) {
    if (heatRadios[i].checked) {
      checkedHeatRadio = heatRadios[i].value;
      break;
    }
  }

  formData["heat"] = checkedHeatRadio;

  // Topping logic
  const toppingArr = [];
  var topping1 = document.getElementById("t1");
  if (topping1.checked == true) {
    toppingArr.push(topping1.value);
  }
  var topping2 = document.getElementById("t2");
  if (topping2.checked == true) {
    toppingArr.push(topping2.value);
  }
  var topping3 = document.getElementById("t3");
  if (topping3.checked == true) {
    toppingArr.push(topping3.value);
  }
  var topping4 = document.getElementById("t4");
  if (topping4.checked == true) {
    toppingArr.push(topping4.value);
  }
  var topping5 = document.getElementById("t5");
  if (topping5.checked == true) {
    toppingArr.push(topping5.value);
  }
  var topping6 = document.getElementById("t6");
  if (topping6.checked == true) {
    toppingArr.push(topping6.value);
  }
  var topping7 = document.getElementById("t7");
  if (topping7.checked == true) {
    toppingArr.push(topping7.value);
  }
  var topping8 = document.getElementById("t8");
  if (topping8.checked == true) {
    toppingArr.push(topping8.value);
  }
  console.log(toppingArr.length);
  formData["toppings"] = toppingArr;

  // Pizza radio's logic
  var radios = document.getElementsByName("pizzaname");
  var checkedRadio;

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      checkedRadio = radios[i].value;
      break;
    }
  }

  formData["photo"] = checkedRadio;
  console.log(formData);
  return formData;
}

var heat;
var pizzaName;
var price;

function insertNewRecord(data) {
  pizzaArr.push(data);
  sessionStorage.setItem("Pizzas", JSON.stringify(pizzaArr));

  console.log(sessionStorage.getItem("Pizzas").length);
  var table = document
    .getElementById("pizzaList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  var cell1 = newRow.insertCell(0);
  pizzaName = data.name;
  cell1.innerHTML = data.name;
  // Heat adding logic

  price = data.price;
  var cell2 = newRow.insertCell(1);

  if (data.heat === "1") {
    cell2.innerHTML = "🌶️";
    heat = 1;
  } else if (data.heat === "2") {
    cell2.innerHTML = "🌶️🌶️";
    heat = 2;
  } else if (data.heat === "3") {
    cell2.innerHTML = "🌶️🌶️🌶️";
    heat = 3;
  } else {
    cell2.innerHTML = "";
    heat = 0;
  }

  var cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.price + "$";
  var cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.toppings;
  var selectedPhoto = document.createElement("img");

  if (data.photo === "1") {
    selectedPhoto.src = "../images/olivepizza.jpeg";
  } else if (data.photo === "2") {
    selectedPhoto.src = "../images/chickenpizza.jpeg";
  } else if (data.photo === "3") {
    selectedPhoto.src = "../images/salami.jpeg";
  } else {
    selectedPhoto.src = "../images/noimg.jpg";
  }

  selectedPhoto.width = "100";
  var cell5 = newRow.insertCell(4).appendChild(selectedPhoto);
  cell5.innerHTML = selectedPhoto;
  var cell6 = newRow.insertCell(5);
  cell6.innerHTML = `
  <a onClick="onDelete(this)" class="delete" name="${data.name}">Delete</a>`;
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("t1").checked = false;
  document.getElementById("t2").checked = false;
  document.getElementById("t3").checked = false;
  document.getElementById("t4").checked = false;
  document.getElementById("t5").checked = false;
  document.getElementById("t6").checked = false;
  document.getElementById("t7").checked = false;
  document.getElementById("t8").checked = false;
  selectedRow = null;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("name").value = pizzaName;
  document.getElementById("price").value = price;
  document.getElementById("heat").value = heat;
  document.getElementById("toppings").value = selectedRow.cells[2].innerHTML;
  document.getElementByName("pizzaname").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
  if (formData.heat === "1") {
    selectedRow.cells[0].innerHTML = formData.name + "🌶️";
    heat = 1;
  } else if (formData.heat === "2") {
    selectedRow.cells[0].innerHTML = formData.name + "🌶️🌶️";
    heat = 2;
  } else if (formData.heat === "3") {
    selectedRow.cells[0].innerHTML = formData.name + "🌶️🌶️🌶️";
    heat = 3;
  } else {
    selectedRow.cells[0].innerHTML = formData.name;
    heat = 0;
  }
  selectedRow.cells[1].innerHTML = formData.price + "$";
  // selectedRow.cells[2].innerHTML = formData.heat;
  selectedRow.cells[2].innerHTML = formData.toppings;

  var selectedPhoto = document.createElement("img");

  if (formData.photo === "1") {
    selectedPhoto.src = "../images/olivepizza.jpeg";
  } else if (formData.photo === "2") {
    selectedPhoto.src = "../images/chickenpizza.jpeg";
  } else if (formData.photo === "3") {
    selectedPhoto.src = "../images/salami.jpeg";
  } else {
    selectedPhoto.src = "../images/noimg.jpg";
  }
  selectedPhoto.width = "100";

  selectedRow.cells[3].innerHTML.appendChild(selectedPhoto);
  resetForm();
}

function onDelete(td) {
  if (confirm(`Are you sure to delete this record ${td.name}?`)) {
    let row = td.parentElement.parentElement;

    for (var i = 0; i < pizzaArr.length; i++) {
      // console.log(pizzaArr[i])
      if (pizzaArr[i].name == td.name) {
        const index = pizzaArr[i].name;
        console.log(index);
        pizzaArr.splice(index, 1);
        sessionStorage.setItem("Pizzas", JSON.stringify(pizzaArr));
      }
    }

    console.log(pizzaArr);
    console.log(td.name);
    console.log(td);
    document.getElementById("pizzaList").deleteRow(row.rowIndex);
    resetForm();
  }
}
function validate() {
  let isValid = true;

  let toppingsChecked = 0;

  var t1 = document.getElementById("t1").checked;
  if (t1 == true) {
    toppingsChecked += 1;
  }
  var t2 = document.getElementById("t2").checked;
  if (t2 == true) {
    toppingsChecked += 1;
  }
  var t3 = document.getElementById("t3").checked;
  if (t3 == true) {
    toppingsChecked += 1;
  }
  var t4 = document.getElementById("t4").checked;
  if (t4 == true) {
    toppingsChecked += 1;
  }
  var t5 = document.getElementById("t5").checked;
  if (t5 == true) {
    toppingsChecked += 1;
  }
  var t6 = document.getElementById("t6").checked;
  if (t6 == true) {
    toppingsChecked += 1;
  }
  var t7 = document.getElementById("t7").checked;
  if (t7 == true) {
    toppingsChecked += 1;
  }
  var t8 = document.getElementById("t8").checked;
  if (t8 == true) {
    toppingsChecked += 1;
  }

  console.log(toppingsChecked);

  // Unique name logic
  var sameName = false;

  var itemName = document.getElementById("name").value;
  for (var i = 0; i < pizzaArr.length; i++) {
    if (pizzaArr[i].name == itemName) {
      sameName = true;
      break;
    }
  }

  if (
    document.getElementById("name").value == "" ||
    toppingsChecked < 2 ||
    sameName == true
  ) {
    if (toppingsChecked < 2) {
      alert("Select at least 2 toppings!");
    }
    if (sameName == true) {
      alert("Pizza name is already used");
    }
    isValid = false;
    document.getElementById("fullNameValidationError").classList.remove("hide");
  } else {
    isValid = true;
    if (
      !document
        .getElementById("fullNameValidationError")
        .classList.contains("hide")
    )
      document.getElementById("fullNameValidationError").classList.add("hide");
  }
  return isValid;
}

// Sorting logic

const getCellValue = (tr, idx) =>
  tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) =>
  ((v1, v2) =>
    v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2)
      ? v1 - v2
      : v1.toString().localeCompare(v2))(
    getCellValue(asc ? a : b, idx),
    getCellValue(asc ? b : a, idx)
  );

// do the work...
document.querySelectorAll("th").forEach((th) =>
  th.addEventListener("click", () => {
    const table = th.closest("table");
    Array.from(table.querySelectorAll("tr:nth-child(n+2)"))
      .sort(
        comparer(
          Array.from(th.parentNode.children).indexOf(th),
          (this.asc = !this.asc)
        )
      )
      .forEach((tr) => table.appendChild(tr));
  })
);
