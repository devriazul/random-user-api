// Element Selectors
const gallery = document.getElementById("gallery");
const galleryModals = document.getElementById("galleryModals");
const searchInput = document.getElementById("search-input");
const searchSubmit = document.getElementById("search-submit");
//  API URL
const url = "https://randomuser.me/api/?results=15";
//  Data From Api
const getUserData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;
  if (results.length != 0) {
    showUserData(results);
    showUserModal(results);
  }
};
getUserData(url);
//  Show Single User Function
const showUserData = (user) => {
  let singleUser = "";
  user.forEach((item) => {
    const { name, picture, email, location } = item;
    singleUser += `
    <div class="card uname-${name.first}">
        <div class="card-img-container">
            <img class="card-img" src="${picture.large}" alt="${name.first}">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${location.city} , ${location.country}</p>
        </div>
    </div>`;
    gallery.innerHTML = singleUser;
  });
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      showModal(event);
    });
  });
};
//  Open Modal
const showModal = (event) => {
  let cardClass = event.target.closest(".card").classList[1];
  let modalArr = document.querySelectorAll(".modal-container");
  let modalNewArray = Array.from(modalArr);
  let openDiv = modalNewArray.filter((modalElemnt) => {
    return modalElemnt.id == cardClass;
  })[0];
  openDiv.style.display = "block";
};
//  Show Modal User
const showUserModal = (modaluser) => {
  let singleModal = "";
  let num = 0;
  modaluser.forEach((modaluser) => {
    const { name, picture, email, location, phone, dob, gender } = modaluser;
    singleModal += `
    <div class="modal-container did-${num}" id="uname-${
      name.first
    }" data-id="did-${num}">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container active">
                <img class="modal-img" src="${picture.large}" alt="${
      name.first
    }">
                <h3 id="name" class="modal-name cap">${name.first} ${
      name.last
    }</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${location.city} , ${
      location.country
    }</p>
                <hr>
                <p class="modal-text">${phone}</p>
                <p class="modal-text">${location.street.number} , ${
      location.street.name
    } , ${location.city}</p>
                <p class="modal-text">Gender : ${gender}</p>
                <p class="modal-text">Age : ${dob.age}</p>
                <p class="modal-text">Birthday : ${getDate(dob.date)}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;
    galleryModals.innerHTML = singleModal;
    num++;
  });
  document.querySelectorAll(".modal-close-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      let closeDiv = event.target.parentElement.parentElement.parentElement;
      closeDiv.style.display = "none";
    });
  });
  modalEvent();
};
//  Date of Birth Function
const getDate = (dob) => {
  const option = { year: "numeric", month: "numeric", day: "numeric" };
  const date = new Date(dob).toLocaleDateString("en-Us", option);
  return date;
};
//  Search Function
const searchAction = () => {
  const data = document.querySelectorAll(".card");
  const result = Array.from(data).filter((element) => {
    return filterData(element);
  });
  showSearchResult(result);
};
//  Data Filtering form Search-Input
const filterData = (element) => {
  let searchValue = searchInput.value.trim();
  let data = null;
  let elementArray = element.children[1].children;
  let newArray = Array.from(elementArray);
  newArray.forEach((item) => {
    let cardName = item.classList.contains("card-name");
    if (cardName) {
      let itemName = item.innerHTML
        .toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      if (itemName) {
        data = element;
      }
    }
  });
  if (data != null) {
    return data;
  } else if (searchInput.value == "" || searchInput.value == null) {
    getUserData(url);
  }
};
// Show Search Result
const showSearchResult = (data) => {
  gallery.innerHTML = "";
  data.forEach((item) => {
    gallery.appendChild(item);
  });
};
// Event Listener
searchSubmit.addEventListener("click", searchAction);

let modalEvent = () => {
  let nextBtn = document.querySelectorAll("#modal-next");
  let prevBtn = document.querySelectorAll("#modal-prev");
  // Previous Button
  prevBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let currentModal = e.target.parentElement.parentElement
        .getAttribute("data-id")
        .toString()
        .split("-")[1];
      if (currentModal > 0 && currentModal < 15) {
        document.querySelector(".did-" + currentModal).style.display = "none";
        let openDiv = document.querySelector(".did-" + --currentModal);
        openDiv.style.display = "block";
      }
    });
  });
  // Next Button
  nextBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let currentModal = e.target.parentElement.parentElement
        .getAttribute("data-id")
        .toString()
        .split("-")[1];
      if (currentModal >= 0 && currentModal < 14) {
        document.querySelector(".did-" + currentModal).style.display = "none";
        let openDiv = document.querySelector(".did-" + ++currentModal);
        openDiv.style.display = "block";
      }
    });
  });
};
