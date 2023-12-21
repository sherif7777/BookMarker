var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteUrl");
var submitBtn = document.getElementById("btnSubmit");
var visitBtn = document.getElementById("btnVisit");
var deleteBtn = document.getElementById("btnDelete");
var tableContent = document.getElementById("table-content");
var nameSpan = document.getElementById("namespan");
var urlSpan = document.getElementById("urlspan");
var sitesList = [];

if (localStorage.getItem("sites")) {
  sitesList = JSON.parse(localStorage.getItem("sites"));
  display(sitesList);
}

function addSite() {
  if (
    validateName(siteNameInput.value) == true &&
    validateURL(siteURLInput.value) == true
  ) {
    var website = {
      siteName: siteNameInput.value,
      siteUrl: siteURLInput.value,
    };
    sitesList.push(website);
    localStorage.setItem("sites", JSON.stringify(sitesList));
  }
}

submitBtn.onclick = function () {
  addSite();
  display(sitesList);
};

function display(arr) {
  var content = "";
  for (var i = 0; i < arr.length; i++) {
    content += `
      <tr>
        <td>${i + 1}</td>
        <td>${arr[i].siteName}</td>
        <td>
          <a href=${arr[i].siteUrl} target="_blank">
            <button id="btnVisit" class="btn btn-success">
              <span><i class="fa-solid fa-eye pe-2"></i></span>Visit
            </button>
          </a>
        </td>
        <td>
          <button
            onclick="deleteSite(${i})"
            id="btnDelete"
            class="btn btn-danger"
          >
            <span><i class="fa-solid fa-trash-can"></i></span> Delete
          </button>
        </td>
      </tr>
    `;
  }
  tableContent.innerHTML = content;
}

function deleteSite(index) {
  sitesList.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(sitesList));
  display(sitesList);
}

function validateName(term) {
  var nameRegex = /^[(a-z)|(A-Z)|(0-9)]{3,}$/;
  console.log(nameRegex.test(term));
  if (nameRegex.test(term) == false) {
    nameSpan.classList.replace("d-none", "d-block");
    siteNameInput.classList.add("is-invalid");
    return false;
  } else {
    nameSpan.classList.replace("d-block", "d-none");
    siteNameInput.classList.replace("is-invalid", "is-valid");
    return true;
  }
}

function validateURL(term) {
  var urlRegex = /^[(www.)|(https://)].{1,}\.com/;
  if (urlRegex.test(term) == false) {
    urlSpan.classList.replace("d-none", "d-block");
    siteURLInput.classList.add("is-invalid");
    return false;
  } else {
    urlSpan.classList.replace("d-block", "d-none");
    siteURLInput.classList.replace("is-invalid", "is-valid");
    return true;
  }
}
