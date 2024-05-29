class InputForm {
  constructor(name) {
    this.form = document.querySelector(`.${name}`);
    this.inputs = [];

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.SubmitForm();
    });

    this.form.addEventListener("reset", () => {
      this.inputs.forEach((input) => {
        input.resetError();
      });
    });
  }
  CreateInput(input) {
    this.inputs.push(input);
  }

  SubmitForm() {
    let isValid = true;
    this.inputs.forEach((input) => {
      if (!input.validateInput()) isValid = false;
    });
    if (isValid) {
      console.log("Submit Form");
      this.form.reset();
    }
  }
}

class TextInput {
  constructor(element, errorDisplayID) {
    this.element = element;
    this.type = element.type;
    this.minLength = element.minLength;
    this.maxLength = element.maxLength;
    this.required = element.required;
    this.errorDisplay = document.querySelector(`#${errorDisplayID}`);

    this.element.addEventListener("focusout", () => this.validateInput());
  }

  validateInput() {
    if (!this.element.validity.valid) {
      this.displayError();
      return false;
    } else {
      this.resetError();
      return true;
    }
  }

  displayError() {
    this.element.className = "input-error";
    this.errorDisplay.className = "error active";
    if (this.element.validity.typeMismatch)
      this.errorDisplay.innerText = `Value entered must be a${
        this.type.match("^[aieouAIEOU].*") ? "n" : ""
      } ${this.type}`;
    else if (this.element.validity.tooShort)
      this.errorDisplay.innerText = `Value entered must be longer than ${this.minLength} characters long!`;
    else if (this.element.validity.tooLong)
      this.errorDisplay.innerText = `Value entered must be shorter than ${this.maxLength} characters long!`;
    else if (this.required && this.element.validity.valueMissing)
      this.errorDisplay.innerText = `Value must be entered!`;
  }

  resetError() {
    this.errorDisplay.className = "error";
    this.element.className = "";
  }
}

class PatternInput extends TextInput {
  constructor(element, errorDisplayID, patternText) {
    super(element, errorDisplayID);
    this.pattern = element.pattern;
    this.patternText = patternText;
  }

  displayError() {
    if (this.element.validity.patternMismatch)
      this.errorDisplay.innerText = `Value must include: ${this.patternText}`;
    super.displayError();
  }
}

class MatchInput extends TextInput {
  constructor(element, errorDisplayID, matchElement) {
    super(element, errorDisplayID);
    this.matchElement = document.querySelector(`#${matchElement}`);
  }

  validateInput() {
    if (this.element.value !== this.matchElement.value || !this.element.value) {
      this.displayError();
      return false;
    } else {
      this.resetError();
      return true;
    }
  }

  displayError() {
    this.element.className = "input-error";
    this.errorDisplay.className = "error active";
    this.errorDisplay.innerText = `Passwords do not match!`;
  }
}

const inputForm = new InputForm("input-form");
inputForm.CreateInput(
  new TextInput(document.querySelector("#email"), "email-error")
);
inputForm.CreateInput(
  new TextInput(document.querySelector("#country"), "country-error")
);
inputForm.CreateInput(
  new TextInput(document.querySelector("#postcode"), "postcode-error")
);
inputForm.CreateInput(
  new PatternInput(
    document.querySelector("#password"),
    "password-error",
    "1x Capital, 1x Number"
  )
);
inputForm.CreateInput(
  new MatchInput(
    document.querySelector("#password-match"),
    "password-match-error",
    "password"
  )
);
