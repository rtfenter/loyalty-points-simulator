console.log("Loyalty Points Simulator is loading...");

// Simple FX table (just examples for now)
const fxRates = {
  US: 1,      // USD base
  EU: 1.1,    // EUR → USD example rate
  UK: 1.25,   // GBP → USD
  JP: 0.007   // JPY → USD
};

// Tier multipliers (applied on top of earn rate)
const tierMultipliers = {
  Silver: 1.0,
  Gold: 1.25,
  Platinum: 1.5
};

// Assumed point value in USD
const POINT_VALUE_USD = 0.01;

// Formatting helpers
function formatNumber(value) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(2);
}

function formatPercent(value) {
  return `${formatNumber(value)}%`;
}

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

function getRegionLabel(region) {
  switch (region) {
    case "US":
      return "United States (USD)";
    case "EU":
      return "Europe (EUR)";
    case "UK":
      return "United Kingdom (GBP)";
    case "JP":
      return "Japan (JPY)";
    default:
      return region;
  }
}

// Summary rendering
function renderSummary({ region, tier, points, redemptionValueUSD }) {
  const summary = document.getElementById("summary");
  summary.innerHTML = "";

  const badge = document.createElement("div");
  badge.className = "summary-badge summary-badge-ok";

  badge.innerHTML = `
    <span class="count">${formatNumber(points)}</span> point${points === 1 ? "" : "s"}
    · Redemption value: <strong>${formatCurrency(redemptionValueUSD)}</strong>
    · Region: ${region} · Tier: ${tier}
  `;

  summary.appendChild(badge);
}

function renderErrorSummary(message) {
  const summary = document.getElementById("summary");
  summary.innerHTML = `
    <div class="summary-badge summary-badge-fail">
      ${message}
    </div>
  `;
}

// Main calculation
function calculatePoints() {
  const region = document.getElementById("region").value;
  const tier = document.getElementById("tier").value;
  const amountRaw = document.getElementById("amount").value;
  const rateRaw = document.getElementById("rate").value;
  const status = document.getElementById("calc-status");

  const amount = Number(amountRaw);
  const rate = Number(rateRaw);

  if (!amountRaw || isNaN(amount) || amount <= 0) {
    renderErrorSummary("Enter a valid transaction amount.");
    status.textContent = "Amount must be a positive number.";
    resetDetails();
    return;
  }

  if (!rateRaw || isNaN(rate) || rate < 0) {
    renderErrorSummary("Enter a valid earn rate.");
    status.textContent = "Earn rate must be zero or positive.";
    resetDetails();
    return;
  }

  const fx = fxRates[region] ?? 1;
  const convertedAmount = amount * fx;

  const tierMultiplier = tierMultipliers[tier] || 1;
  const effectiveRate = rate * tierMultiplier;

  const points = convertedAmount * (effectiveRate / 100);
  const redemptionValue = points * POINT_VALUE_USD;

  status.textContent = "Calculation complete.";

  renderSummary({
    region,
    tier,
    points,
    redemptionValueUSD: redemptionValue,
  });

  renderDetails({
    region,
    fx,
    amount,
    convertedAmount,
    tier,
    rate,
    tierMultiplier,
    effectiveRate,
    points,
    redemptionValue,
  });
}

function resetDetails() {
  document.getElementById("fx-line").textContent =
    "Choose a region and amount to see how spend is normalized to USD.";
  document.getElementById("tier-line").textContent =
    "Tier multipliers stack on top of the base earn rate.";
  document.getElementById("points-line").textContent =
    "Points earned represent a future redemption liability for the program.";
  document.getElementById("raw-output").textContent = "No calculation yet.";
}

function renderDetails({
  region,
  fx,
  amount,
  convertedAmount,
  tier,
  rate,
  tierMultiplier,
  effectiveRate,
  points,
  redemptionValue,
}) {
  const regionLabel = getRegionLabel(region);

  const fxLine = document.getElementById("fx-line");
  fxLine.innerHTML = `
    <strong>${regionLabel}</strong><br />
    Local amount: ${formatNumber(amount)} · FX: ${fx}<br />
    Normalized spend: <strong>${formatCurrency(convertedAmount)}</strong> (USD)
  `;

  const tierLine = document.getElementById("tier-line");
  tierLine.innerHTML = `
    Base earn rate: ${formatPercent(rate)} · Tier: <strong>${tier}</strong><br />
    Tier multiplier: ${tierMultiplier}x → Effective rate:
    <strong>${formatPercent(effectiveRate)}</strong>
  `;

  const pointsLine = document.getElementById("points-line");
  pointsLine.innerHTML = `
    Points earned: <strong>${formatNumber(points)}</strong><br />
    Assumed point value: ${formatCurrency(POINT_VALUE_USD)} per point<br />
    Estimated liability: <strong>${formatCurrency(redemptionValue)}</strong> (USD)
  `;

  const raw = [
    `Region: ${region} (${regionLabel})`,
    `FX rate: ${fx}`,
    `Local transaction amount: ${amount}`,
    `Converted amount (USD): ${formatCurrency(convertedAmount)}`,
    `Tier: ${tier}`,
    `Base earn rate: ${formatPercent(rate)}`,
    `Tier multiplier: ${tierMultiplier}x`,
    `Effective earn rate: ${formatPercent(effectiveRate)}`,
    `Points earned: ${formatNumber(points)}`,
    `Redemption value (USD): ${formatCurrency(redemptionValue)}`,
  ].join("\n");

  document.getElementById("raw-output").textContent = raw;
}

// Example scenario loader
function loadExampleScenario() {
  document.getElementById("region").value = "EU";
  document.getElementById("tier").value = "Gold";
  document.getElementById("amount").value = "150";
  document.getElementById("rate").value = "4";

  document.getElementById("calc-status").textContent = "Example scenario loaded. Click Calculate Points.";
  resetDetails();

  const summary = document.getElementById("summary");
  summary.innerHTML = `
    <div class="summary-badge summary-badge-idle">
      Ready to calculate the example scenario.
    </div>
  `;
}

// Wire up
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("calculateBtn")
    .addEventListener("click", calculatePoints);

  const exampleBtn = document.getElementById("load-example");
  if (exampleBtn) {
    exampleBtn.addEventListener("click", loadExampleScenario);
  }

  // Optional: pre-load example on first load
  loadExampleScenario();
});
