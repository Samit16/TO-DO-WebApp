let chartInstance = null;

async function fetchPrice() {
  const coin = document.getElementById("coinDropdown").value;
  const resultBox = document.getElementById("result");
  const chartCanvas = document.getElementById("priceChart");

  const priceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=inr,usd&include_24hr_change=true`;
  const chartUrl = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`;

  try {
    const res = await fetch(priceUrl);
    const data = await res.json();
    const priceInINR = data[coin].inr;
    const priceInUSD = data[coin].usd;
    const change = data[coin].usd_24h_change.toFixed(2);
    const changeColor = change >= 0 ? 'limegreen' : 'red';

    resultBox.innerHTML = `
      <p><span>Coin:</span> ${coin}</p>
      <p><span>Price (INR):</span> ₹${priceInINR}</p>
      <p><span>Price (USD):</span> $${priceInUSD}</p>
      <p><span>24h Change:</span> <span style="color: ${changeColor}">${change}%</span></p>
    `;
    resultBox.style.display = 'block';

    const chartRes = await fetch(chartUrl);
    const chartData = await chartRes.json();
    const prices = chartData.prices.map(p => p[1]);
    const labels = chartData.prices.map(p => {
      const date = new Date(p[0]);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: `${coin.toUpperCase()} - Last 7 Days`,
          data: prices,
          borderColor: '#58a6ff',
          borderWidth: 2,
          fill: false,
          tension: 0.3,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: '#e6edf3' }
          }
        },
        scales: {
          x: {
            ticks: { color: '#e6edf3' }
          },
          y: {
            ticks: { color: '#e6edf3' }
          }
        }
      }
    });

  } catch (err) {
    resultBox.innerHTML = `<p>Error fetching data. Try again later.</p>`;
    resultBox.style.display = 'block';
    console.error(err);
  }
}
