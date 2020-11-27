'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

//-------------------------------
let money;
/* let expenses1;
let expenses2;
let amount1;
let amount2; */


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
    accumulatedMonth: 0,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы через запятую?');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    getExpensesMonth: function() {
        let sum = 0, newSum;
    
        for (let i = 0; i < 2; i++) {
            appData.expenses[i] = prompt('Введите обязательную статью расходов?');             

            newSum = +prompt('Во сколько это обойдется?');
            while (!isNumber(newSum)) {
                newSum = +prompt('Во сколько это обойдется?');
            }   
            
            sum += +newSum;            

            /* appData.expenses = {i, newSum};
            console.log(appData.expenses); */
        }
        /* console.log(sum); */
        return sum; 
        
        
    },
    getBudget: function() {
        return money - appData.expensesMonth;         
    },
    getTargetMonth: function() {
        return appData.mission / appData.accumulatedMonth;       
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

appData.asking();

//-------------------------------


/* if (amount1 === null) {
    amount1 = 0;
}
if (amount2 === null) {
    amount2 = 0;
} */

/* let budgetMonth;
budgetMonth = appData.budgetDay * 30 + amount1 + amount2;
console.log(budgetMonth);

let missionTarget = appData.mission / budgetMonth;
missionTarget = parseFloat(Math.ceil(missionTarget));
console.log(missionTarget);

appData.budgetDay = budgetMonth / 30;
appData.budgetDay = parseFloat(Math.floor(appData.budgetDay));
console.log(appData.budgetDay); */

//-------------------------------


/* do {
    question = prompt('Во сколько это обойдется?');
    }
while (sum += +question); */

appData.expensesMonth = appData.getExpensesMonth(); // appData потому что переменная обьявлекна в обьекте appData
console.log('Расходы за месяц: ' + appData.expensesMonth);

//-------------------------------

appData.accumulatedMonth = appData.getBudget(); // appData потому что переменная обьявлекна в обьекте appData
/* console.log(appData.accumulatedMonth); */

//-------------------------------

if (appData.getTargetMonth() > 0) {
    console.log('Цель достигну за: ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

/* console.log(appData.getTargetMonth()); */

//-------------------------------
appData.budgetDay = appData.accumulatedMonth / 30;
/* console.log(Math.ceil(appData.budgetDay)); */

//-------------------------------
console.log('Ваш доход ' + money);
console.log(appData);

for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + " Значение: " + appData[key]);
}
console.log(Object.keys(appData));

/* let getExpensesMonth = function() {
    for (let key in appData.expenses) {
        appData.expensesMonth = appData.expenses[key]
    }
}; */

