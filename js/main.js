'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money = 500; 
//-------------------------------
let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } 
    while (!isNumber(money));    
};

start();

//-------------------------------
let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 5000,
    period: 3,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы через запятую?');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
    }
};

//-------------------------------
let expenses1;
let expenses2;
let amount1;
let amount2;

if (amount1 === null) {
    amount1 = 0;
}
if (amount2 === null) {
    amount2 = 0;
}

/* let budgetMonth;
budgetMonth = budgetDay * 30 + amount1 + amount2;
console.log(budgetMonth);

let missionTarget = mission / budgetMonth;
missionTarget = parseFloat(Math.ceil(missionTarget));
console.log(missionTarget);

budgetDay = budgetMonth / 30;
budgetDay = parseFloat(Math.floor(budgetDay));
console.log(budgetDay); */

//-------------------------------
let getExpensesMonth = function() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            expenses1 = prompt('Введите обязательную статью расходов?', 'Коммуналка');
            while (isNumber(expenses1)) {
                expenses1 = prompt('Введите обязательную статью расходов?', 'Коммуналка');
            }
        } else if (i === 1) {
            expenses2 = prompt('Введите обязательную статью расходов?', 'Школа');
            while (isNumber(expenses2)) {
                expenses2 = prompt('Введите обязательную статью расходов?', 'Школа');
            }    
        }

        sum += +prompt('Во сколько это обойдется?');
    }
    console.log(sum);
    return sum;    
};

/* do {
    question = prompt('Во сколько это обойдется?');
    }
while (sum += +question); */

let expensesMonth = getExpensesMonth();
console.log('Расходы за месяц: ' + expensesMonth);

//-------------------------------
let getAccumulatedMonth = function() {
    return money - expensesMonth;
};
let accumulatedMonth = getAccumulatedMonth();
console.log(accumulatedMonth);

//-------------------------------
let getTargetMonth = function() {
    return appData.mission / accumulatedMonth; // appData потому что переменная обьявлекна в обьекте appData
};
if (getTargetMonth() > 0) {
    console.log('Цель достигну за: ' + Math.ceil(getTargetMonth()) + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

//-------------------------------
let budgetDay = accumulatedMonth / 30;
console.log(Math.ceil(appData.budgetDay));

//-------------------------------
let getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return('У вас высокий уровень дохода');
    } else if (budgetDay > 600 && budgetDay < 1200) {
        return('У вас средний уровень дохода');
    } else if (budgetDay > 0 && budgetDay < 600) {
        return('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return('Что то пошло не так');
    }
};
console.log(getStatusIncome());