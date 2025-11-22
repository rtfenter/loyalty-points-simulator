console.log("Loyalty Points Simulator is loading...");

// Simple FX table (just examples for now)
const fxRates = {
  US: 1,      // USD base
  EU: 1.1,    // EUR → USD example rate
  UK: 1.25,   // GBP → USD
  JP: 0.007   // JPY → USD
};

document.getElementById("calculateBtn").addEventListener("click", () => {
  const region = document.getElementById("region").value;
  const amount = Number(document.getElementById("amount").value);
  const rate = Number(document.getElementById("rate").value);

  if (!amount) {
    document.getElementById("result").innerText = "Enter a valid amount.";
    return;
  }

  // Convert the amount to USD based on region
  const fx = fxRates[region];
  const convertedAmount = amount * fx;

  // Calculate points using converted amount
  const points = convertedAmount * (rate / 100);

  document.getElementById("result").innerText =
    `Region: ${region} (FX: ${fx})\n` +
    `Converted Amount (USD): ${convertedAmount.toFixed(2)}\n` +
    `Points Earned: ${points.toFixed(2)}`;
});
