//Team Treehouse Project 3: Interactive Form
//James Hanley, 12/15/2020
//This script contains functions used in the main script.js

//Event handler for the jobRoleSelectBox onChanged event
function OnJobRoleSelectChanged (event) {
    if(event.target != null) {
        
        const showOther = (event.target.value === 'other');

        //if we have the value other, unhide using !, otherwise hide the otherRole
        otherRoleSelectBox.hidden = !showOther;
    }
}

function OnDesignThemeChanged(event) {
    if(event.target != null) {
        shirtColorSelect.disabled = false;

        //get a reference to the children in the select options box
        let colorChildren = shirtColorSelect.children;
        //how many children do we have, so we know how many to loop
        const childCount = colorChildren.length;

        for(var index = 0; index < childCount; index++) {
            //store a reference to the child we are working with
            const childOption = colorChildren[index];
            //store the color value
            const color = event.target.value;
            //the attribute 'data-theme'
            const themeAttribute = childOption.getAttribute('data-theme');

            if(color === themeAttribute) {
                childOption.hidden = false;
                childOption.selected = true;
            }
            else {
                childOption.hidden = true;
            }
        }

    }
}

//Event handler for the Register for Activities fieldset
function OnActivitiesChanged(event) {
    if (event.target != null) {
        //reference to the attribute element
        let dataCostAttribute = event.target.getAttribute("data-cost");

        //the actual number value
        let costValue = parseInt(dataCostAttribute);

        if(event.target.checked === true) {
            activityCost += costValue;
        }
        else {
            activityCost -= costValue;
        }

        totalElement.innerHTML = `Total: $${activityCost}`;
        ValidateActivityCheckboxes();
    }
}

//Event handler for payment
function OnPaymentOptionChanged (event) {
    if(event.target != null) {
        const value = event.target.value;

        switch(value) {
            case 'credit-card':
                creditCardDiv.hidden = false;
                payPalDiv.hidden = true;
                bitcoinDiv.hidden = true;
                break;

            case 'paypal':
                creditCardDiv.hidden = true;
                payPalDiv.hidden = false;
                bitcoinDiv.hidden = true;
                break;

            case 'bitcoin':
                creditCardDiv.hidden = true;
                payPalDiv.hidden = true;
                bitcoinDiv.hidden = false;
                break;
        }
    }
}

//evaluate the credit card number field
function ValidateCreditNumberField() {
    
    const cardValue = creditCardInput.value;

    //regEx variables for testing card number
    var cardTest =  /^4[0-9]{12}(?:[0-9]{4})?$/;
    const cardNumTest = cardTest.test(cardValue);

    creditCardInput.parentNode.lastElementChild.style.display = (cardNumTest) ? "none" : "block";

    if(cardNumTest) {
        creditCardInput.parentNode.classList.add('valid');
        creditCardInput.parentNode.classList.remove('not-valid');
    }
    else {
        creditCardInput.parentNode.classList.add('not-valid');
        creditCardInput.parentNode.classList.remove('valid');
    }
    return cardNumTest;
}

//evaluate the credit card zip field
function ValidateCreditZipField() {
    
    const zipValue = zipCodeInput.value;

    //regEx variables for testing zip
    var zipTest = /^([0-9]{5})$/;
    const zipNumTest = zipTest.test(zipCodeInput.value);

    zipCodeInput.parentNode.lastElementChild.style.display = (zipNumTest) ? "none" : "block";

    if(zipNumTest) {
        zipCodeInput.parentNode.classList.add('valid');
        zipCodeInput.parentNode.classList.remove('not-valid');
    }
    else {
        zipCodeInput.parentNode.classList.add('not-valid');
        zipCodeInput.parentNode.classList.remove('valid');
    }
    return zipNumTest;
}

//evaluate the credit card ccv field
function ValidateCreditCVVField() {
   
    const cvvValue = creditCardCVVInput.value;

    //regEx variables for testing ccv
    var cvvTest = /^([0-9]{3})$/;
    const cvvNumTest = cvvTest.test(cvvValue);

    creditCardCVVInput.parentNode.lastElementChild.style.display = (cvvNumTest) ? "none" : "block";

    if(cvvNumTest) {
        creditCardCVVInput.parentNode.classList.add('valid');
        creditCardCVVInput.parentNode.classList.remove('not-valid');
    }
    else {
        creditCardCVVInput.parentNode.classList.add('not-valid');
        creditCardCVVInput.parentNode.classList.remove('valid');
    }
     return cvvNumTest;
}

//Evaluate if the credit card is properly filled out
function evauluateCreditCardFields() {
    let monthElement = document.getElementById('exp-month');
    let yearElement = document.getElementById('exp-year');

    let cardNumTest = ValidateCreditNumberField();
    let zipNumTest = ValidateCreditZipField();
    let cvvNumTest = ValidateCreditCVVField();

    return (cardNumTest && zipNumTest && cvvNumTest);
}
//event handler for the form submit
function FormSubmitHandler(event) {
    if(event.target != null) {
        const nameValid = ValidateNameInput();
        const emailValid = ValidateEmailInput();
        const activityValid = ValidateActivityCheckboxes();
        let creditCards = false;

        if(!creditCardDiv.hidden) {
            creditCards = evauluateCreditCardFields();
        }

        if(nameValid && emailValid && activityCost > 0 && activityValid) {
           
            if(!creditCardDiv.hidden && !creditCards) {
                event.preventDefault();                
            }
        }
        else {
            event.preventDefault();
        }
    }
}


//function for form validation of name input box
function ValidateNameInput() {

    let success = false;
    if(nameInputTextBox != null) {
        if(nameInputTextBox.value.length > 0) {
            nameInputTextBox.parentNode.classList.remove("not-valid");
            nameInputTextBox.parentNode.classList.add("valid");
            nameInputTextBox.parentNode.lastElementChild.style.display = 'none';
            success = true;
        }
    }

    if(!success) {
        nameInputTextBox.parentNode.classList.add("not-valid");
        nameInputTextBox.parentNode.lastElementChild.style.display = 'block';
    }

    return success;
}

//function for form validation of name input box
function ValidateEmailInput() {
    let success = false;

    if(emailInput != null) {
        if(emailInput.value.length > 0) {
            var regEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
            if(regEx.test(emailInput.value)) {
                emailInput.parentNode.classList.remove("not-valid");
                emailInput.parentNode.classList.add("valid");
                emailInput.parentNode.lastElementChild.style.display = 'none';
                success = true;
            }
           
        }
    }

    if(!success) {
        emailInput.parentNode.classList.add("not-valid");
        emailInput.parentNode.lastElementChild.style.display = 'block';
    }

    return success;
}
 
 //valid the activities fieldset, check if any checkboxes are set
 function ValidateActivityCheckboxes() {
    let hint = registerActivityElement.lastElementChild;
    if(activityCost > 0) {
        registerActivityElement.classList.remove("not-valid");
        registerActivityElement.classList.add("valid");
        hint.style.display = 'none';
        return true;
     }
     else {
        registerActivityElement.classList.add("not-valid");
        hint.style.display = 'block';
     }

     return false;
 }