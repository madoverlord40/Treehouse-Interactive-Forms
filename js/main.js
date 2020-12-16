//Team Treehouse Project 3: Interactive Form
//James Hanley, 12/15/2020
//This script is the main executable, or entry point for the form and uses the functions in functions.js

//Global Variables

//the name input text box
let nameInputTextBox = document.getElementById('name');
//the job role select box
let jobRoleSelectBox = document.getElementById('title');
//other role select box
let otherRoleSelectBox = document.getElementById('other-job-role');
//the design select box, under t-shirts
let designSelectBox = document.getElementById('design');
//the color select box under t-shirts
let shirtColorSelect = document.getElementById('color');
//The "Register for Activities" <fieldset> element
let registerActivityElement = document.getElementById('activities');
// The "Total: $" <p> element
let totalElement = document.getElementById('activities-cost');
//Store the total cost of activities
let activityCost = 0;
// The "I'm going to pay with:" <select> element
let payWithSelectElement = document.getElementById('payment');
// The <div> element with the id of "credit-card"
let creditCardDiv = document.getElementById('credit-card');
// The <div> element with the id of "paypal" 
let payPalDiv = document.getElementById('paypal');
// The <div> element with the id of "bitcoin" 
let bitcoinDiv = document.getElementById('bitcoin');
//The "Email Address" <input type="text"> element
let emailInput = document.getElementById('email');
//The "Card number" <input type="text"> element
let creditCardInput = document.getElementById('cc-num');
//The "Zip code" <input type="text"> element
let zipCodeInput = document.getElementById('zip');
//The "CVV" <input type="text"> element
let creditCardCVVInput = document.getElementById('cvv');
//the container for the form
let containerDiv = document.querySelector('.container');
//The <form> element
let formElement = containerDiv.childNodes[1];

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

        formElement.addEventListener('submit', FormSubmitHandler);
    }
}

main();