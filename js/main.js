//Team Treehouse Project 3: Interactive Form
//James Hanley, 12/15/2020
//This script is the main executable, or entry point for the form and uses the functions in functions.js



function main() {
    //lets make sure our variables are valid before we continue
    if((nameInputTextBox != null && nameInputTextBox.nodeName === 'INPUT')
    && (jobRoleSelectBox != null && jobRoleSelectBox.nodeName === 'SELECT')
    && (designSelectBox != null && designSelectBox.nodeName === 'SELECT')
    && (shirtColorSelect != null && shirtColorSelect.nodeName === 'SELECT')
    && (registerActivityElement != null && registerActivityElement.nodeName === 'FIELDSET')
    && (payPalDiv != null && payPalDiv.nodeName === 'DIV')
    && (bitcoinDiv != null && bitcoinDiv.nodeName === 'DIV')
    && (payWithSelectElement != null && payWithSelectElement.nodeName === 'SELECT')) {
        //set its focus to true
        nameInputTextBox.focus();

        //hide the other role text box at startup
        otherRoleSelectBox.hidden = true;

        //set the onchanged function handler, from functions.js
        jobRoleSelectBox.onchange = OnJobRoleSelectChanged;

        //set the on change event handler, from functions.js
        designSelectBox.onchange = OnDesignThemeChanged;

        shirtColorSelect.disabled = true;

        registerActivityElement.onchange = OnActivitiesChanged;

        //hide these payment types on startup
        payPalDiv.hidden = true;
        bitcoinDiv.hidden = true;

        //add selectd property to second child, 0 index based
        payWithSelectElement.children[1].setAttribute('selected', 'false');
        //set the event handler for on change
        payWithSelectElement.onchange = OnPaymentOptionChanged;
        //the main form element, lets add the submit event handler
        formElement.addEventListener('submit', FormSubmitHandler);

        //For Accessability

        const childCount = activityChecklist.children.length;
        //loop over the activity checkboxes and add event handlers for focus and blur
        for(var index = 0; index < childCount; index++) {
            //get the child element of the checklist
            const childElement = activityChecklist.children[index];
            //this should be the checkbox inside the child element
            const checkbox = childElement.childNodes[1];

            checkbox.addEventListener('focus', () => {
                childElement.classList.add('focus');
            });

            checkbox.onblur = () => {
                childElement.classList.remove('focus');
                ValidateActivityCheckboxes();
            }
        }

        //FORM VALIDATION

        //if we lose focus, validate the email entry and show error if not valid
        emailInput.onblur = () => { ValidateEmailInput(); }
        
        //remove the error on focus, because we want to show the focus not an error, even if there is one
        //leave errors to blur/form submit
        emailInput.onfocus = () => {
            emailInput.parentNode.classList.remove("not-valid");
        }

        //remove the error on focus, because we want to show the focus not an error, even if there is one
        //leave errors to blur/form submit
        nameInputTextBox.onfocus = () => {
            nameInputTextBox.parentNode.classList.remove("not-valid");
        }

        //if we lose focus, validate the name entry and show error if not valid
        nameInputTextBox.onblur = () => { ValidateNameInput(); }

        creditCardInput.onfocus = () => {
            creditCardInput.parentNode.classList.remove("not-valid");
        }

        creditCardInput.onblur = () => { ValidateCreditNumberField(); }

        zipCodeInput.onblur = () => { ValidateCreditZipField(); }

        zipCodeInput.onfocus = () => {
            zipCodeInput.parentNode.classList.remove("not-valid");
        }

        creditCardCVVInput.onblur = () => { ValidateCreditCVVField(); }

        creditCardCVVInput.onfocus = () => {
            creditCardCVVInput.parentNode.classList.remove("not-valid");
        }
    }
}


main();