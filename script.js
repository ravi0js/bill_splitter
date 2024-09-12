document.addEventListener("DOMContentLoaded", () => {
  const tipOptions = [5, 10, 15, 25, 50, 75];
  const tipContainer = document.querySelector(".tip-options");
  const generateButton = document.getElementById("generateBill");

  
  generateButton.disabled = true;

  tipOptions.forEach((tip) => {
    const button = document.createElement("button");
    button.classList.add("tip-btn");
    button.textContent = `${tip} %`;
    button.onclick = () => {
      setTip(tip);
      checkFormFields();
    };
    tipContainer.appendChild(button);
  });

  // Add event listeners to form fields
  const billAmountInput = document.getElementById("billAmount");
  const numPeopleInput = document.getElementById("numPeople");
  const customTipInput = document.getElementById("customTip");

  billAmountInput.addEventListener("input", checkFormFields);
  numPeopleInput.addEventListener("input", checkFormFields);
  customTipInput.addEventListener("input", checkFormFields);

  function checkFormFields() {
    const billAmount = billAmountInput.value.trim();
    const numPeople = numPeopleInput.value.trim();
    const customTip = customTipInput.value.trim();

    if (
      billAmount !== "" &&
      numPeople !== "" &&
      customTip !== "" &&
      !isNaN(parseFloat(billAmount)) &&
      !isNaN(parseInt(numPeople)) &&
      !isNaN(parseFloat(customTip))
    ) {
      generateButton.disabled = false;
      generateButton.style.backgroundColor = " #d8b7fa";
    } else {
      generateButton.disabled = true;
    }
  }
});

let tipPercentage = 5;

function setTip(tip) {
  tipPercentage = tip;
  document.getElementById("customTip").value = tip;
}

function calculateBill() {
  const billAmount = parseFloat(document.getElementById("billAmount").value);
  const numPeople = parseInt(document.getElementById("numPeople").value);
  const customTip = parseFloat(document.getElementById("customTip").value);

  if (isNaN(billAmount) || isNaN(numPeople) || isNaN(customTip)) {
    alert("Please enter valid numbers for all inputs.");
    return;
  }

  const tipAmount = (billAmount * customTip) / 100;
  const totalAmount = billAmount + tipAmount;
  const eachPersonBill = totalAmount / numPeople;

  document.getElementById("tipAmount").innerText = `₹${tipAmount.toFixed(2)}`;
  document.getElementById("totalAmount").innerText = `₹${totalAmount.toFixed(
    2
  )}`;
  document.getElementById(
    "eachPersonBill"
  ).innerText = `₹${eachPersonBill.toFixed(2)}`;
}

function resetCalculator() {
  document.getElementById("billAmount").value = "";
  document.getElementById("customTip").value = "";
  document.getElementById("numPeople").value = "";

  document.getElementById("tipAmount").innerText = "₹0";
  document.getElementById("totalAmount").innerText = "₹0";
  document.getElementById("eachPersonBill").innerText = "₹0";

  // Disable the Generate button after reset
  document.getElementById("generateBill").disabled = true;
}
