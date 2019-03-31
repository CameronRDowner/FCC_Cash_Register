function checkCashRegister(cashOwed, cashPaid, cashInDrawer) {
    const CASHVALUES = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
    let changeDue = (cashPaid - cashOwed).toFixed(2);
    let changeDenomenations = [];
    let denominationAmount = 0;
    for (let i = cashInDrawer.length - 1; i >= 0; i--) {
        if (changeDue >= cashInDrawer[i][1]) {
            changeDenomenations.push(cashInDrawer[i]);
            changeDue = (changeDue - changeDenomenations[changeDenomenations.length - 1][1]).toFixed(2);
        } else if (changeDue < cashInDrawer[i][1] && changeDue > CASHVALUES[i]) {
            denominationAmount = (Math.floor(changeDue / CASHVALUES[i]) * CASHVALUES[i]).toFixed(2); //finds the total amount that can be taken from the current cashInDrawer denomination 
            changeDenomenations.push(cashInDrawer[i]);
            changeDenomenations[changeDenomenations.length - 1][1] = parseFloat(denominationAmount);
            changeDue = (changeDue - denominationAmount).toFixed(2);
        }
    }

    let drawerState = {
        status: '',
        change: []
    }

    let totalCashInDrawer = cashInDrawer.map(subArray => subArray[1]).reduce((total, element) => total + element).toFixed(2)
    let cashLeft = (totalCashInDrawer - (cashPaid - cashOwed)).toFixed(2);
    if (cashLeft > 0 && changeDue == 0) {
        drawerState.status = 'OPEN';
        drawerState.change = changeDenomenations;
    } else if (cashLeft == 0) {
        drawerState.status = 'CLOSED';
        drawerState.change = cashInDrawer;
    } else {
        drawerState.status = 'INSUFFICIENT_FUNDS';
        drawerState.change = [];
    }
    return drawerState;
}

checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 1],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
])