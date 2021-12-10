const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const form = document.forms["contact"];

let checkSubmit;

// checks the entry conditions on the inputs
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
}

class eventInit {
	static openEvent() {
		const constactMe = document.querySelector("#contact");
		const formBground = document.querySelector("#formBground");
		const main = document.querySelector("main");

		constactMe.addEventListener("click", () => {
			formBground.style.display = "flex"; // at the click on the button 'contact me' , the form appears
			form.style.animation = "formOpen 1s forwards";
			main.style.position = "fixed";
			const ariaHidden = document.querySelectorAll("header, section");
			ariaHidden.forEach((elt) => {
				elt.setAttribute("aria-hidden", "true");
			}); // the screen reader has no access anymore to the elements in the background
			const tabHidden = document.querySelectorAll("header a,  section a, section button");
			tabHidden.forEach((elt) => {
				elt.setAttribute("tabindex", "-1");
			}); //tabulation is not available anymore for buttons and background link
		});
	}

	static close() {
		const formBground = document.querySelector("#formBground");
		const main = document.querySelector("main");

		formBground.style.display = "none"; // the form is not visible anymore

		main.style.position = "relative";

		const ariaHidden = document.querySelectorAll("header, section");
		ariaHidden.forEach((elt) => {
			elt.removeAttribute("aria-hidden");
		}); //the screen reader again accesses the element of the photographer page when closing the form

		const tabHidden = document.querySelectorAll("header a,  section a, section button");
		tabHidden.forEach((elt) => {
			elt.removeAttribute("tabindex");
		}); // the tab is again available for the buttons and links of the photographer page
	}

	static closeEvent() {
		const closeElt = document.querySelector(".closeForm");
		closeElt.addEventListener("click", () => {
			this.close();
		});
		document.addEventListener("keydown", (e) => {
			if (e.code == "Escape") {
				this.close();
			}
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

//  add blur event to check conditions on inuput
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

// submit form
form.addEventListener("submit", function (e) {
	e.preventDefault();
	checkSubmit = true;

	checkLastName();
	checkFirstName();
	checkEmail();

	if (checkSubmit) {
		const formBground = document.querySelector("#formBground");
		const main = document.querySelector("main");
		console.log("Prénom : " + firstName.value);
		console.log("Nom : " + lastName.value);
		console.log("Email : " + email.value);
		console.log("Message : " + message.value);

		form.style.animation = "formClose 1s forwards";
		form.reset();
		setTimeout(() => {
			formBground.style.display = "none";
			main.style.position = "relative";
		}, 1000);
	}
});

export { eventInit };
