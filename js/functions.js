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

//Evaluate if the credit card is properly filled out
function evauluateCreditCardFields() {
    const cardValue = creditCardInput.value;
    const zipValue = zipCodeInput.value;
    const ccvValue = creditCardCVVInput.value;

    if(cardValue.length > 0 && zipValue.length > 0 && ccvValue.length > 0) {
        //regEx variables for testing card number, zip and ccv
        var cardTest =  /^4[0-9]{12}(?:[0-9]{3})?$/;
        var zipTest = /^([0-9]{5})$/;
        var ccvTest = /^([0-9]{3})$/;

        const cardNumTest = cardTest.test(cardValue);
        const zipNumTest = zipTest.test(zipCodeInput.value);
        const ccvNumTest = ccvTest.test(ccvValue);

        if (cardNumTest && zipNumTest && ccvNumTest) {
            let monthElement = document.getElementById('exp-month');
            let yearElement = document.getElementById('exp-year');

            return (monthElement.selectedIndex > 0 && yearElement.selectedIndex > 0);
        }
    }

    return false;
}
//event handler for the form submit
function FormSubmitHandler(event) {
    if(event.target != null) {
        const nameValue = nameInputTextBox.value;
        const emailValue = emailInput.value;
        
        if(nameValue.length > 0 && emailValue.length > 0 && activityCost > 0) {
            var regEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
            if(regEx.test(emailValue)) {
                if(!creditCardDiv.hidden) {
                    if(evauluateCreditCardFields() === false) {
                        event.preventDefault();
                    }
                }
                else {
                    event.preventDefault();
                }
            }
            else {
                event.preventDefault();
            }
        }
        else {
            event.preventDefault();
        }
    }
}