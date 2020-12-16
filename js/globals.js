//Team Treehouse Project 3: Interactive Form
//James Hanley, 12/15/2020
//This script is the global variables script, which holds various variables used with the functions.js and main.js

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
//activity checklist of checkboxes element
let activityChecklist = document.getElementById('activities-box');