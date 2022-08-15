const billInput = document.querySelector("#bill-input");
const tipButton = document.querySelectorAll(".tip-input-percent");
const tipInput = document.querySelector("#tip-input");
const peopleInput = document.querySelector("#people-input");
const tipResult = document.querySelector(".tip-amount");
const totalResult = document.querySelector(".total-amount");
const resetButton = document.querySelector(".reset-button");
const errorMessage = document.querySelector(".error-message");

let bill;
let percent;
let noOfPeople;

billInput.addEventListener("input", () => {
  bill = parseFloat(billInput.value);
  calc();
});

tipButton.forEach((tip) => {
  tip.addEventListener("click", () => {
    // IF TIP CONTAINS ANOTHER CLASSLIST REMOVED THE ALREADY APPLIED STYLE
    if (tip.classList[1]) {
      tip.classList.remove("button-clicked");
      percent = "";
      console.log("percent is: ", percent);
      tipResult.innerText = "$0.00";
      totalResult.innerText = "$0.00";
      return;
    }
    for (const buttons of tipButton) {
      buttons.classList.remove("button-clicked");
    }
    tip.classList.add("button-clicked");
    tipInput.style.color = "#a3a2a2";
    percent = parseInt(tip.value);
    calc();
  });
});

tipInput.addEventListener("input", () => {
  tipInput.style.color = "";
  tipButton.forEach((item) => {
    item.classList.remove("button-clicked");
  });
  percent = parseFloat(tipInput.value);
  calc();
});

peopleInput.addEventListener("input", () => {
  // RETURNS EARLY TO PREVENT BLOCK DISPLAY AFTER DELETING THE ZERO
  if (peopleInput.value === "") {
    errorMessage.style.display = "none";
    return;
  }
  let arr = [];
  let newArr = [];
  arr.push(peopleInput.value);
  // NESTED LOOP TO PARSEINT() INDIVIDUAL DIGITS IN arr
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      parseInt(arr[i][j]);
      newArr.push(parseInt(arr[i][j]));
    }
  }
  let addition = newArr.reduce((prev, curr) => prev + curr);
  if (addition === 0) {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "";
  }
  noOfPeople = parseFloat(peopleInput.value);
  calc();
});

const calc = () => {
  /* TIP CALCULATION */
  if (bill && percent && noOfPeople) {
    let tip = ((percent / 100) * bill) / noOfPeople;
    let tipAmount = tip.toString();
    /* SEARCHES FOR "." AND 3 NUMBERS AFTER THEN SLICES IT FOR 2 DECIMAL PLACE */
    if (tipAmount.indexOf(".") > 1) {
      tipAmount = tipAmount.slice(0, tipAmount.indexOf(".") + 3);

      tipResult.innerText = `$${parseFloat(tipAmount).toFixed(2)}`;
    } else {
      tipResult.innerText = `$${parseFloat(tipAmount).toFixed(2)}`;
    }

    /* FOR TOTAL */
    let tipAmountInInteger = ((percent / 100) * bill) / noOfPeople;
    let total = bill / noOfPeople + tipAmountInInteger;
    totalResult.innerText = `$${total.toFixed(2)}`;

    /* FOR RESET BUTTON*/
    resetButton.disabled = false;
  }
};

resetButton.addEventListener("click", () => {
  billInput.value = "";
  tipInput.value = "";
  tipButton.value = "";
  peopleInput.value = "";
  bill = "";
  percent = "";
  noOfPeople = "";
  tipResult.innerText = "$0.00";
  totalResult.innerText = "$0.00";
  tipButton.forEach((item) => {
    item.classList.remove("button-clicked");
  });
  resetButton.disabled = true;
});
