"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}
//  function sendEmail() {
//    // Replace the email address below with the address you want to send to
//    let email = "omkarsonawane159@gmail.com";
//    let bodyText = document.getElementsByClassName("yourMessage").value;
//    let userFullName = document.getElementsByClassName("fullName").value;

//    // To convert a string to another string with the words separated by "%20"
//    let mailBody = bodyText.replace(/ /g, "%20");
//    let mailSubject = userFullName.replace(/ /g, "%20");

//    // Use the JavaScript "mailto" function to open the default email client
//    // with the recipient, subject, and body pre-filled
//    window.location.href =
//      "mailto:" + email + `?subject=${mailSubject}&body=${mailBody}`;
//  }
function sendEmail() {
  // Replace the email address below with the address you want to send to
  let email = "kadamaditya1972@gmail.com";
  let bodyText = document.querySelector(".yourMessage").value;
  let userFullName = document.querySelector(".fullName").value;
  // To convert a string to another string with the words separated by "%20"
  let mailBody = bodyText.replace(/ /g, "%20");
  let mailSubject = userFullName.replace(/ /g, "%20");

  // Use the JavaScript "mailto" function to open the default email client
  // with the recipient, subject, and body pre-filled
  window.location.href =
    "mailto:" + email + `?subject=This%20is%20${mailSubject}&body=${mailBody}`;
}

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var requestOptions = {
  method: "get",
  headers: myHeaders,
  redirect: "follow",
};

fetch(
  "https://v1.nocodeapi.com/omkarsonawane/medium/bHEQWpCGbzLGRnjp",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    displayBlog(result);
  })
  .catch((error) => console.log("error", error));

function displayBlog(result) {
  // console.log(result);
  let count = 1;
  result.forEach((ele) => {
    if (count == 10) {
      return;
    }
    // console.log(ele);
    const words = ele.content.replace(/<img[^>]*>/g, "").split(/\s+/);
    const allowedWords = words.slice(0, 30);
    const allowedHtml = allowedWords.join(" ");
    const timestamp = ele.published;
    const date = new Date(timestamp);

    // Format the date using the toLocaleDateString() method
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    // console.log(ele.content);
    document.querySelector(".blog-posts-list").insertAdjacentHTML(
      "beforeend",
      `<li class="blog-post-item">
              <a href=${ele.link}>
                <div class="blog-content">

                  <div class="blog-meta">
                    <p class="blog-category">${ele.category[0]}</p>

                    <span class="dot"></span>

                    <time datetime="2022-02-23">${formattedDate}</time>
                  </div>

                  <h3 class="h3 blog-item-title">${ele.title}</h3>

                  <p class="blog-text">
                        ${allowedHtml}...
                  </p>

                </div>

              </a>
            </li>`
    );
    count++;
  });
}

async function getprojects() {
  // write your code here
  let projectLink;

  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://api.github.com/users/adii-tech/repos?sort=updated",
    true
  );
  xhr.onload = function () {
    let projectDetails = this.responseText;
    let data = JSON.parse(projectDetails);
    let count = 1;
    for (let i = 0; i < data.length; i++) {
      if (!data[i].fork) {
        let projectRepo = `https://github.com/adii-tech/${data[i].name}`;
        if (data[i].homepage) {
          projectLink = data[i].homepage;
        } else {
          projectLink = projectRepo;
        }
        let description;
        if (data[i].description == null) {
          description = "Check out repository for more information";
        } else if (data[i].description.length > 60) {
          description = `${data[i].description.slice(0, 60)} ...`;
        } else {
          description = data[i].description;
        }

        document.querySelector(".project-list").insertAdjacentHTML(
          "beforeend",
          `   <li
                      class="project-item active"
                    >
                      <a href=${projectLink} target="_blank">
                        <figure class="project-img">
                          <div class="project-item-icon-box">
                            <ion-icon name="eye-outline"></ion-icon>
                          </div>

                          <img
                            src="https://raw.githubusercontent.com/adii-tech/${
                              data[i].name
                            }/master/display.png"
                            alt="orizon"
                            loading="lazy"
                          />
                        </figure>

                        <h3 class="project-title">${
                          data[i].name.charAt(0).toUpperCase() +
                          data[i].name.slice(1)
                        }</h3>

                        <p class="project-description">${description}</p>
                      </a>
                    </li>
      `
        );
        count++;
      }
    }
  };
  xhr.send();
}
getprojects();
