$(function () {
	$('.menu-opener').on('click', function (e) {
		e.preventDefault()
		$(this).toggleClass('active')
		$('.head-menu').toggleClass('active')
		$('body').toggleClass('no-scroll')
	})

	// account img on click
	$('.content-head > a').on('click', function (e) {
		e.preventDefault()
		$('.side-menu .nav-link').removeClass('active')
		$('#v-pills-messages-tab').addClass('active')

		$('.prsn-content .tab-pane').removeClass('active show')
		$('#v-pills-messages').addClass('active show')
	})

	// select all words
	var selectAllItems = '#select-all'
	var checkboxItem = '.words :checkbox'

	$(selectAllItems).click(function () {
		if ($(this).prop('checked')) {
			$(checkboxItem).prop('checked', true)
		} else {
			$(checkboxItem).prop('checked', false)
		}
	})

	// words remove input
	$('.test-list input').keyup(function () {
		// $(this).css('border', 'none', 'margin', '0');
		var value = $(this).val()
		if (value.length > 1) {
			$(this).val(value.substring(0, 1))
		}
	})

	var swiper3 = new Swiper('.word-slide', {
		slidesPerView: 1,
		spaceBetween: 10,
		loop: false,
		speed: 1000,
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})

	new Card({
		form: '#payment-modal',
		container: '.card',
		formSelectors: {
			numberInput: 'input[name=number]',
			expiryInput: 'input[name=expiry]',
			cvcInput: 'input[name=cvv]',
		},

		width: 390, // optional — default 350px
		formatting: true,

		placeholders: {
			number: '•••• •••• •••• ••••',
			expiry: '••/••',
			cvc: '•••',
		},
	})
})

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
			password: 'Пожалуйста, укажите пароль',
			email: 'Пожалуйста, укажите email или телефон',
		},
		submitHandler: function (form) {
			document
				.querySelector('.login-modal')
				.addEventListener('submit', e =>
					checkLogin(e, 'http://localhost:5500/api/auth/login')
				)
		},
	})

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
			password: 'Пожалуйста, укажите пароль',
			email: 'Пожалуйста, укажите email или телефон',
		},
		submitHandler: function (form) {
			document
				.querySelector('.reg-modal')
				.addEventListener('submit', e =>
					checkLogin(e, 'http://localhost:5500/api/auth/register')
				)
		},
	})

	// Выбираем кнопку отправки формы
	// $('#sign_in_btn').click(function () {
	// 	// Вызов функции проверки формы
	// 	if (validateForm()) {
	// 		document
	// 			.querySelector('.reg-modal')
	// 			.addEventListener('submit', e => checkLogin(e))
	// 	}
	// })

	// Функция проверки формы
	function validateForm() {
		var isValid = true

		// Проверка имени
		var nameInput = $('#name')
		if ($.trim(nameInput.val()) === '') {
			setErrorFor(nameInput, 'Пожалуйста, введите имя ребенка.')
			isValid = false
		} else {
			setSuccessFor(nameInput)
		}

		// Проверить электронную почту
		var emailInput = $('#email')
		if ($.trim(emailInput.val()) === '') {
			setErrorFor(emailInput, 'Пожалуйста, введите вашу почту.')
			isValid = false
		} else if (!isEmail($.trim(emailInput.val()))) {
			setErrorFor(emailInput, 'Пожалуйста, укажите существующий email')
			isValid = false
		} else {
			setSuccessFor(emailInput)
		}

		// Подтверждаем пароль
		var passwordInput = $('#password')
		if ($.trim(passwordInput.val()) === '') {
			setErrorFor(passwordInput, 'Пожалуйста, введите ваш пароль.')
			isValid = false
		} else {
			setSuccessFor(passwordInput)
		}

		// Подтвердите пароль
		var confirmPasswordInput = $('#confirm_password')
		if ($.trim(confirmPasswordInput.val()) === '') {
			setErrorFor(confirmPasswordInput, 'Введите подтверждение пароля.')
			isValid = false
		} else if (
			$.trim(passwordInput.val()) !== $.trim(confirmPasswordInput.val())
		) {
			setErrorFor(confirmPasswordInput, 'Неверноле подтверждение пароля')
			isValid = false
		} else {
			setSuccessFor(confirmPasswordInput)
		}

		return isValid
	}

	// Функция для установки ошибки
	function setErrorFor(input, message) {
		var errorSpan = input.next('.error')
		errorSpan.text(message).show()
		input.addClass('error') // Xato klassini qo'shish
	}

	// Функция для установки правильного ввода
	function setSuccessFor(input) {
		var errorSpan = input.next('.error')
		errorSpan.hide()
		input.removeClass('error')
	}

	// Проверка входных данных
	$('#reg-modal input').on('input', function () {
		var input = $(this)
		if ($.trim(input.val()) !== '') {
			setSuccessFor(input)
		} else {
			setErrorFor(input, input.attr('placeholder') + 'ni kiriting')
		}
	})

	// Функция проверки электронной почты
	function isEmail(email) {
		// Oddiy regex bilan tekshiramiz
		return /\S+@\S+\.\S+/.test(email)
	}
	// const checkAuth = () => {
	//   if (token && paySuccess) {
	//     ////
	//   }
	//   if (token && !paySuccess) {
	//     /////
	//   }
	// };

	/* const response = await fetch(url, {
				method: 'POST',
				mode: 'no-cors',
				headers: {
					'Content-type': 'application/json;charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify(formDataObj),
			})
			const response = await fetch(url)

			const data = await response.json()
			console.log(data) */

	async function checkLogin(e, url) {
		e.preventDefault()
		let formData = new FormData(e.target)
		const formDataObj = Object.fromEntries(formData.entries())

		console.log(formDataObj)
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify(formDataObj),
		}
		try {
			const response = await fetch(url, requestOptions)
			const { user, token } = await response.json()
			// Add date_over check
			if (token && !user?.isTrial && !user?.date_over) {
				localStorage.setItem('token', token)
				localStorage.setItem('date_over', user?.date_over)
				window.location.href = '/tariff-plan.html'
				// Add date_over check
			} else if (user.isTrial || user.date_over) {
				window.location.href = '/personal-cabinet.html'
			}
		} catch (err) {
			console.error(err)
		}
		e.target.reset()
	}
})

function createNewDateOver(addedPeriod) {
	const currentDate = new Date()
	const newDate = new Date(
		currentDate.getTime() + addedPeriod * 24 * 60 * 60 * 1000
	)
	const day = newDate.getDate()
	const month = newDate.getMonth() + 1 // Месяцы начинаются с 0
	const year = newDate.getFullYear()
	const newDateOver = `${day}.${month}.${year}`
	return newDateOver
}

//TODO: CheckAuth & GetMe + token in Fetch
document.querySelectorAll('.tariff-pay-btn').forEach(btn => {
	btn.addEventListener('click', async () => {
		if (localStorage.getItem('token')) {
			let newDateOver = ''
			if (btn.getAttribute('id') === 'btn-tariff-trial') {
				newDateOver = createNewDateOver(7)
			}
			const requestOptions = {
				method: 'PATCH',
				headers: {
					'Content-type': 'application/json;charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
					authorization: localStorage.getItem('token'),
				},
				body: JSON.stringify({
					date_over: newDateOver,
				}),
			}
			const response = await fetch(
				'http://localhost:5500/api/auth/pay',
				requestOptions
			)
			const { success, user } = await response.json()
			if (success && user) {
				localStorage.setItem('date_over', user?.date_over)
				window.location.href = '/personal-cabinet.html'
			}
		} else {
			console.log('Complete authorization!')
		}
	})
})
