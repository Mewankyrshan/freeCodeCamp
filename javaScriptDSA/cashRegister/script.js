let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

document.getElementById('purchase-btn').addEventListener('click', function() {
  // You can change this value for different test cases
    const cash = parseFloat(document.getElementById('cash').value);
    let changeDue = cash - price;
    const cidTotal = cid.reduce((acc, currency) => acc + currency[1], 0).toFixed(2);

    if (changeDue > cash) {
        alert('Customer does not have enough money to purchase the item');
        return;
    }

    if (changeDue === 0) {
        document.getElementById('change-due').innerText = 'No change due - customer paid with exact cash';
        return;
    }

    if (changeDue > parseFloat(cidTotal)) {
        document.getElementById('change-due').innerText = 'Status: INSUFFICIENT_FUNDS';
        return;
    }

    const currencyUnits = [
        ["ONE HUNDRED", 100],
        ["TWENTY", 20],
        ["TEN", 10],
        ["FIVE", 5],
        ["ONE", 1],
        ["QUARTER", 0.25],
        ["DIME", 0.1],
        ["NICKEL", 0.05],
        ["PENNY", 0.01]
    ];

    let change = [];
    for (let [name, value] of currencyUnits) {
        let amount = 0;
        let index = cid.findIndex(item => item[0] === name);

        while (changeDue >= value && cid[index][1] >= value) {
            changeDue = (changeDue - value).toFixed(2);
            cid[index][1] = (cid[index][1] - value).toFixed(2);
            amount += value;
        }

        if (amount > 0) {
            change.push([name, amount]);
        }
    }

    if (changeDue > 0) {
        document.getElementById('change-due').innerText = 'Status: INSUFFICIENT_FUNDS';
    } else if (cid.reduce((acc, currency) => acc + parseFloat(currency[1]), 0) === 0) {
        document.getElementById('change-due').innerText = `Status: CLOSED ${change.map(([name, amt]) => `${name}: $${amt.toFixed(2)}`).join(' ')}`;
    } else {
        document.getElementById('change-due').innerText = `Status: OPEN ${change.map(([name, amt]) => `${name}: $${amt.toFixed(2)}`).join(' ')}`;
    }
});
