$(function () {
  $(".menu-opener").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
    $(".head-menu").toggleClass("active");
    $("body").toggleClass("no-scroll");
  });

  // account img on click
  $(".content-head > a").on("click", function (e) {
    e.preventDefault();
    $(".side-menu .nav-link").removeClass("active");
    $("#v-pills-messages-tab").addClass("active");

    $(".prsn-content .tab-pane").removeClass("active show");
    $("#v-pills-messages").addClass("active show");
  });

  // select all words
  var selectAllItems = "#select-all";
  var checkboxItem = ".words :checkbox";

  $(selectAllItems).click(function () {
    if ($(this).prop("checked")) {
      $(checkboxItem).prop("checked", true);
      document.querySelector(".btn-add").disabled = false;
    } else {
      $(checkboxItem).prop("checked", false);
      document.querySelector(".btn-add").disabled = true;
    }
  });

  // words remove input
  $(".test-list input").keyup(function () {
    // $(this).css('border', 'none', 'margin', '0');
    var value = $(this).val();
    if (value.length > 1) {
      $(this).val(value.substring(0, 1));
    }
  });

  var swiper3 = new Swiper(".word-slide", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: false,
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  new Card({
    form: "#payment-modal",
    container: ".card",
    formSelectors: {
      numberInput: "input[name=number]",
      expiryInput: "input[name=expiry]",
      cvcInput: "input[name=cvv]",
    },

    width: 390, // optional — default 350px
    formatting: true,

    placeholders: {
      number: "•••• •••• •••• ••••",
      expiry: "••/••",
      cvc: "•••",
    },
  });
});

$(document).ready(function () {
  $("form[name='login-form']").validate({
    // Specify the validation rules
    rules: {
      // firstname: "required", //firstname is corresponding input name
      password: {
        required: true,
        minlength: 6,
      },
      //passowrd:  is corresponding input name
      email: {
        required: true,
        email: true,
      },
    },
    // Specify the validation error messages
    messages: {
      // firstname: "Пожалуйста, укажите имя",
      password: "Пожалуйста, укажите пароль",
      email: "Пожалуйста, укажите email или телефон",
    },
    submitHandler: function (form) {
      document
        .querySelector(".login-modal")
        .addEventListener("submit", (e) => checkLogin(e));
    },
  });

  $("form[name='reg-form']").validate({
    // Specify the validation rules
    rules: {
      // firstname: "required", //firstname is corresponding input name
      password: {
        required: true,
        minlength: 6,
      },
      //passowrd:  is corresponding input name
      email: {
        required: true,
        email: true,
      },
    },
    // Specify the validation error messages
    messages: {
      // firstname: "Пожалуйста, укажите имя",
      password: "Пожалуйста, укажите пароль",
      email: "Пожалуйста, укажите email или телефон",
    },
    submitHandler: function (form) {
      document
        .querySelector(".reg-modal")
        .addEventListener("submit", (e) => checkLogin(e));
    },
  });

  // Выбираем кнопку отправки формы
  $("#sign_in_btn").click(function () {
    // Вызов функции проверки формы
    if (validateForm()) {
      document
        .querySelector(".reg-modal")
        .addEventListener("submit", (e) => checkLogin(e));
    }
  });

  // Функция проверки формы
  function validateForm() {
    var isValid = true;

    // Проверка имени
    var nameInput = $("#name");
    if ($.trim(nameInput.val()) === "") {
      setErrorFor(nameInput, "Пожалуйста, введите имя ребенка.");
      isValid = false;
    } else {
      setSuccessFor(nameInput);
    }

    // Проверить электронную почту
    var emailInput = $("#email");
    if ($.trim(emailInput.val()) === "") {
      setErrorFor(emailInput, "Пожалуйста, введите вашу почту.");
      isValid = false;
    } else if (!isEmail($.trim(emailInput.val()))) {
      setErrorFor(emailInput, "Пожалуйста, укажите существующий email");
      isValid = false;
    } else {
      setSuccessFor(emailInput);
    }

    // Подтверждаем пароль
    var passwordInput = $("#password");
    if ($.trim(passwordInput.val()) === "") {
      setErrorFor(passwordInput, "Пожалуйста, введите ваш пароль.");
      isValid = false;
    } else {
      setSuccessFor(passwordInput);
    }

    // Подтвердите пароль
    var confirmPasswordInput = $("#confirm_password");
    if ($.trim(confirmPasswordInput.val()) === "") {
      setErrorFor(confirmPasswordInput, "Введите подтверждение пароля.");
      isValid = false;
    } else if (
      $.trim(passwordInput.val()) !== $.trim(confirmPasswordInput.val())
    ) {
      setErrorFor(confirmPasswordInput, "Неверноле подтверждение пароля");
      isValid = false;
    } else {
      setSuccessFor(confirmPasswordInput);
    }

    return isValid;
  }

  // Функция для установки ошибки
  function setErrorFor(input, message) {
    var errorSpan = input.next(".error");
    errorSpan.text(message).show();
    input.addClass("error"); // Xato klassini qo'shish
  }

  // Функция для установки правильного ввода
  function setSuccessFor(input) {
    var errorSpan = input.next(".error");
    errorSpan.hide();
    input.removeClass("error");
  }

  // Проверка входных данных
  $("#reg-modal input").on("input", function () {
    var input = $(this);
    if ($.trim(input.val()) !== "") {
      setSuccessFor(input);
    } else {
      setErrorFor(input, input.attr("placeholder") + "ni kiriting");
    }
  });

  // Функция проверки электронной почты
  function isEmail(email) {
    // Oddiy regex bilan tekshiramiz
    return /\S+@\S+\.\S+/.test(email);
  }
  // const checkAuth = () => {
  //   if (token && paySuccess) {
  //     ////
  //   }
  //   if (token && !paySuccess) {
  //     /////
  //   }
  // };
  let cards = [
    {
      number: 0,
      words: [],
    },
  ];
  let words = [
    { word: "Азбука", blur: "03" },
    { word: "Игра", blur: "0" },
    { word: "Полтинник", blur: "1" },
    { word: "Жизнь", blur: "1" },
    { word: "Мечта", blur: "1" },
    { word: "сорок", blur: "1" },
  ];  
  let filteredWords = Object.assign([], words);

  async function checkLogin(e) {
    try {
      const url = "http://localhost:5500/api/auth/register";
      e.preventDefault();

      let formData = new FormData(e.target);
      const formDataObj = Object.fromEntries(formData.entries());

      const response = await fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });

      const data = await response.json();
      e.target.reset();
    } catch (e) {
      console.error(e);
    }
  }
  const mainSideBtn = document.querySelector(".nav-link-cards");
  if (mainSideBtn) {
    mainSideBtn.addEventListener("click", () => {
      if (mainSideBtn.classList.contains("activity")) {
        window.location.href = "/personal-cabinet.html";
      }
      // mainSideBtn.classList.toggle('activity')
    });
    if (window.innerWidth < 800) {
      document.getElementById("v-pills-home-tab").classList.remove("active");
      document.getElementById("v-pills-home-tab").classList.remove("activity");
      document.getElementById("v-pills-home").classList.remove("active");
      document.getElementById("v-pills-home").classList.remove("show");
    }
    document
      .querySelector(".nav-pills")
      .querySelectorAll(".nav-link")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          document
            .querySelector(".nav-pills")
            .querySelectorAll(".nav-link")
            .forEach((btn) => {
              btn.classList.remove("activity");
            });
          btn.classList.add("activity");
        });
      });
  }
  deleteProfileBtn = document.querySelector(".confirm-delete-btn");
  saveData = document.querySelector(".save-btn");
  if (deleteProfileBtn) {
    deleteProfileBtn.addEventListener("click", () => {
      deleteProfile();
    });
    saveData.addEventListener("click", () => {
      editProfileData();
    });
  }

  async function editProfileData() {
    try {
      personalData = new FormData(document.querySelector(".editProfileData"));
      const personalDataObj = Object.fromEntries(personalData.entries());
      editProfileUrl = "http://localhost:5500/api/auth/register";
      const response = await fetch(editProfileUrl, {
        method: "PATCH",
        body: JSON.stringify(personalDataObj),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  async function deleteProfile() {
    try {
      deleteProfileUrl = "http://localhost:5500/api/auth/register";
      const response = await fetch(deleteProfileUrl, {
        method: "DELETE",
        body: "delete",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  const addinglist = document.querySelector(".adding-list");
  if (addinglist) {
    document.querySelector(".btn-add").addEventListener("click", () => {
      createNewCard();
    });
    async function createNewCard() {
      try {
        newCardUrl = "http://localhost:5500/api/auth/register";
        const response = await fetch(newCardUrl, {
          method: "POST",
          body: JSON.stringify(addedWords),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        });
        const data = await response.json();
      } catch (e) {
        console.error(e);
      }
    }

    //активирую поиск
    const search = document.querySelector(".search");
    search.oninput = (e) => {
      // resetWords();
      checkSearch(e);
      hideUnusedLetter();
      console.log(addedWords);
    };
    //функция поиска
    const resetWords = () => {
      addinglist.querySelectorAll(".adding-item").forEach((item) => {
        const wordsContainer = item.querySelector(".words");
        wordsContainer.innerHTML = "";
      });
    };
    const checkSearch = (e) => {
      if (e.target.value) {
        let searchValue = e.target.value.trim().toLowerCase();
        addinglist.querySelectorAll("label").forEach((label) => {
          label.classList.remove("hide");
          if (
            label
              .querySelector("span")
              .textContent.toLowerCase()
              .search(searchValue) === -1
          ) {
            label.classList.add("hide");
          }
        });

        // filteredWords = Object.assign([], words).filter(curr => {
        //   if (curr.word.toLowerCase().search(searchValue) !== -1) {
        //     return true
        //   }
        // })
      } else {
        addinglist.querySelectorAll("label").forEach((label) => {
          label.classList.remove("hide");
        });
      }
    };

    //прячу все буквы, где нет слов
    addedWords = [];
    const hideUnusedLetter = () => {
      addinglist.querySelectorAll(".adding-item").forEach((item) => {
        flag = true;
        item.querySelectorAll("label").forEach((label) => {
          if (!label.classList.contains("hide")) {
            flag = false;
          }
        });
        if (flag) {
          item.classList.add("hide");
        } else {
          item.classList.remove("hide");
        }
      });
    };

    //вывод отфильтрованных слов
    const showFilteredWords = () => {
      filteredWords.forEach((word) => {
        const letter = word.word.toLowerCase().slice(0, 1);
        addinglist.querySelectorAll(".adding-item").forEach((item) => {
          if (letter === item.querySelector("p").textContent.slice(1, 2)) {
            let label = document.createElement("label");
            label.innerHTML = `<input type="checkbox" class="word-cb" value="${word.word}"><span>${word.word}</span>`;
            item.querySelector(".words").appendChild(label);
            item.classList.remove("hide");
          }
        });
      });
    };

    showFilteredWords();
    hideUnusedLetter();
    //добавление/удаление списка слов новой карточки, отключение кнопки
    addinglist.querySelectorAll(".word-cb").forEach((word) => {
      word.addEventListener("click", () => {
        if (word.checked) {
          addedWords.push(word.value);
          document.querySelector(".btn-add").disabled = false;
        } else {
          addedWords.splice(addedWords.indexOf(word.value), 1);
          if (addedWords.length == 0) {
            document.querySelector(".btn-add").disabled = true;
          }
        }
        console.log(addedWords);
      });
    });
  }
});
