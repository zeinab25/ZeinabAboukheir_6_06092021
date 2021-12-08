const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const form = document.forms["contact"];

let checkSubmit;

class Form {
	constructor(input, messageError) {
		this.input = input;
		this.messageError = messageError;
	}

	showError() {
		this.input.parentElement.setAttribute("data-error", this.messageError);
	}

	showSuccess() {
		this.input.parentElement.removeAttribute("data-error");
	}

	checkCondition(conditionInput) {
		if (conditionInput) {
			this.showSuccess();
		} else {
			this.showError();
			checkSubmit = false;
		}
	}

	static open() {
		const constactMe = document.querySelector("#contact");
		const formBground = document.querySelector("#formBground");
		const main = document.querySelector("main");
		constactMe.addEventListener("click", () => {
			formBground.style.display = "flex";
			form.style.animation = "formOpen 1s forwards";
			main.style.position = "fixed";
		});
	}

	static close() {
		const close = document.querySelector(".closeForm");
		const formBground = document.querySelector("#formBground");
		const main = document.querySelector("main");

		close.addEventListener("click", (e) => {
			formBground.style.display = "none";
			main.style.position = "relative";
			e.preventDefault();
		});
	}
}

let checkFirstName = () => {
	new Form(firstName, `Veuillez saisir au minimum 2 charactères.`).checkCondition(
		firstName.value.trim().length >= 2
	);
};

let checkLastName = () => {
	new Form(lastName, `Veuillez saisir au minimum 2 charactères.`).checkCondition(
		lastName.value.trim().length >= 2
	);
};

let checkEmail = () => {
	new Form(email, "Veuillez saisir une adresse Email valide.").checkCondition(
		/^[\w.-]+@([a-z0-9._-]{2,})+\.([a-z]{2,4})$/.test(email.value.trim())
	);
};

[firstName, lastName, email].forEach((elt) => {
	elt.addEventListener("blur", () => {
		switch (elt) {
			case firstName:
				checkFirstName();
				break;
			case lastName:
				checkLastName();
				break;
			case email:
				checkEmail();
		}
	});
});

// submit test control
form.addEventListener("submit", function (e) {
	e.preventDefault();
	checkSubmit = true;

	checkLastName();
	checkFirstName();
	checkEmail();

	if (checkSubmit) {
		const formBground = document.querySelector("#formBground");
		const main = document.querySelector("main");
		form.style.animation = "formClose 1s forwards";

		console.log("Prénom : " + firstName.value);
		console.log("Nom : " + lastName.value);
		console.log("Email : " + email.value);
		console.log("Message : " + message.value);
		form.reset();
		setTimeout(() => {
			formBground.style.display = "none";
			main.style.position = "relative";
		}, 1000);
	}
});

export { Form };
