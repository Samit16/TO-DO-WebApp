async function fetchPrice() {
  const coin = document.getElementById("coinDropdown").value;
  const resultBox = document.getElementById("result");

  const priceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=inr,usd&include_24hr_change=true`;

  try {
    const res = await fetch(priceUrl);
    const data = await res.json();
    console.log("API Response:", data);

    if (!data[coin]) {
      resultBox.innerHTML = `<p>Coin not found or API error. Try again.</p>`;
      resultBox.style.display = 'block';
      return;
    }

    const priceInINR = data[coin].inr;
    const priceInUSD = data[coin].usd;
    const change = data[coin].usd_24h_change.toFixed(2);
    const changeColor = change >= 0 ? 'limegreen' : 'red';

    resultBox.innerHTML = `
      <p><span>Coin:</span> ${coin.toUpperCase()}</p>
      <p><span>Price (INR):</span> ₹${priceInINR.toLocaleString()}</p>
      <p><span>Price (USD):</span> $${priceInUSD}</p>
      <p><span>24h Change:</span> <span style="color: ${changeColor}">${change}%</span></p>
    `;
    resultBox.style.display = 'block';

  } catch (err) {
    resultBox.innerHTML = `<p style="color:red">Error fetching data. Try again later.</p>`;
    resultBox.style.display = 'block';
    console.error(err);
  }
}
