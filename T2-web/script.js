let modal = document.querySelector("#taskModal");
let modalBtn = document.querySelector("#modal-btn");
let alert = document.querySelector("#alert");
let close = document.querySelector(".close");

modalBtn.addEventListener("click", (event) => {
  modal.style.display = "block";
});

close.addEventListener("click", (event) =>{
  alert.style.display = "none";
  modal.style.display = "block";
});

document.addEventListener("keyup", (event) => {
  let keyPressed = event.keyCode;
  if (keyPressed == 27){
    document.getElementById("taskTitulo").value = "";
    document.getElementById("taskDescricao").value = "";
    modal.style.display = "none";
  }
});

document.addEventListener("keyup", (event) => {
  let keyPressed = event.keyCode;
  if (keyPressed == 13 && event.altKey) {
    createNewTask();
    progressBar();
    modal.style.display = "none";
  }
});

function progressBar() {
  let toDo = document.querySelector("#to-do");
  let inProgress = document.querySelector("#in-progress");
  let review = document.querySelector("#review");
  let complete = document.querySelector("#complete");

  let todo = toDo.getElementsByClassName("task").length;
  let inprogress = inProgress.getElementsByClassName("task").length;
  let reviews = review.getElementsByClassName("task").length;
  let completes = complete.getElementsByClassName("task").length;

  let total = todo + inprogress + reviews + completes;
  let firstWidth = (todo / total) * 100 + "%";
  let secondWidth = (inprogress / total) * 100 + "%";
  let thirdWidth = (reviews / total) * 100 + "%";
  let fourthWidth = (completes / total) * 100 + "%";

  let firstBar = document.querySelector("#barra-toDo");
  let secondBar = document.querySelector("#barra-inProgress");
  let thirdBar = document.querySelector("#barra-review");
  let fourthBar = document.querySelector("#barra-complete");

  firstBar.style.width = firstWidth;
  secondBar.style.width = secondWidth;
  thirdBar.style.width = thirdWidth;
  fourthBar.style.width = fourthWidth;
}

progressBar();

function createNewTask() {
  let taskDiv = document.createElement("div");
  let b = document.createElement("b");
  taskDiv.appendChild(b);
  let p = document.createElement("p");
  taskDiv.appendChild(p);
  let t = document.getElementById("taskTitulo").value;
  let d = document.getElementById("taskDescricao").value;
  let task = document.createTextNode(t);
  b.appendChild(task);
  let description = document.createTextNode(d);
  p.appendChild(description);

  if (t === '' || d === '') {
    alert.style.display = "block";
  } else {
    document.getElementById("to-do").appendChild(taskDiv);
  }
  document.getElementById("taskTitulo").value = "";
  document.getElementById("taskDescricao").value = "";

  taskDiv.className = "task";
  b.onclick = function () { moveTaskForward(event) };
}

function moveTaskForward(event) {
  switch (event.target.parentNode.parentNode.getAttribute("id")) {
    case "to-do":
      document.querySelector("#in-progress").appendChild(
        event.target.parentNode
      );
      break;

    case "in-progress":
      document.querySelector("#review").appendChild(
        event.target.parentNode
      );
      break;

    case "review":
      document.querySelector("#complete").appendChild(
        event.target.parentNode
      );
      break;
  }

  progressBar();
}