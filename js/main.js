'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

//-------------------------------
let money = 500;
let expenses1;
let expenses2;
let amount1;
let amount2;
let accumulatedMonth;

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
    mission: 75000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы через запятую?');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    getExpensesMonth: function() {
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
    },
    getAccumulatedMonth: function() {
        return money - appData.expensesMonth;
    },
    getTargetMonth: function() {
        return appData.mission / accumulatedMonth; 
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return('У вас высокий уровень дохода');
        } else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
            return('У вас средний уровень дохода');
        } else if (appData.budgetDay > 0 && appData.budgetDay < 600) {
            return('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return('Что то пошло не так');
        }
    },    
};

//-------------------------------


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


/* do {
    question = prompt('Во сколько это обойдется?');
    }
while (sum += +question); */

appData.expensesMonth = appData.getExpensesMonth(); // appData потому что переменная обьявлекна в обьекте appData
console.log('Расходы за месяц: ' + appData.expensesMonth);

//-------------------------------

appData.accumulatedMonth = appData.getAccumulatedMonth(); // appData потому что переменная обьявлекна в обьекте appData
console.log(appData.accumulatedMonth);

//-------------------------------

if (appData.getTargetMonth() > 0) {
    console.log('Цель достигну за: ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

//-------------------------------
appData.budgetDay = appData.accumulatedMonth / 30;
console.log(Math.ceil(appData.budgetDay));