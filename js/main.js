'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

String.prototype.firstLetterCaps = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

//-------------------------------
let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', 50000);
        } 
        while (isNaN(money) || money === '' || money === null);
    };

start();

//-------------------------------
let appData = {
    income: {}, // дополнительный источник дохода
    addIncome: [],
    expenses: {}, // расходы
    addExpenses: [],
    deposit: false,
    percentDeposit: 0, // процент депозита
    moneyDeposit: 0, // сколько человек заложил
    mission: 75000, // цель
    period: 3,
    budget: money, // доход
    budgetDay: 0, // budgetMonth / 30
    budgetMonth: 0, // доходы минус сумма расходов в месяц
    expensesMonth: 0,  // сумма расходов  
    asking: function() {

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Репетитор');
            while (isNumber(itemIncome) || itemIncome === '' || itemIncome === null || itemIncome.trim() === '') {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Репетитор');
            }
            let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            while (isNaN(cashIncome) || cashIncome === '' || cashIncome === null || cashIncome.trim() === '') {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            }
            appData.income[itemIncome] = cashIncome;
        }


        let addExpenses = prompt('Перечислите возможные расходы через запятую?');
            while (isNumber(addExpenses) || addExpenses === '' || addExpenses === null || addExpenses.trim() === '') {
                addExpenses = prompt('Перечислите возможные расходы через запятую?');
            }            
            appData.addExpenses = addExpenses.firstLetterCaps();          
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            for (let i = 0; i < 2; i++) {
                let itemExpenses = prompt('Введите обязательную статью расходов?');
                while (isNumber(itemExpenses) || itemExpenses === '' || itemExpenses === null || itemExpenses.trim() === '') {
                    itemExpenses = prompt('Введите обязательную статью расходов?');
                }
                let cashExpenses;
                do {
                    cashExpenses = prompt('Во сколько это обойдется?');
                } 
                while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null || cashExpenses.trim() === '');

                appData.expenses[itemExpenses] = cashExpenses;
            }           
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }        
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return appData.mission / appData.budgetMonth;
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
    getInfoDeposit: function() {
        if (appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            while (isNumber(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null || appData.percentDeposit.trim() === '') {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            appData.moneyDeposit = prompt('Какая сумма заложена?', 1000);   
            while (isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null || appData.moneyDeposit.trim() === '') {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 1000);
            }
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

//-------------------------------
console.log('Расходы за месяц: ' + appData.expensesMonth);

//-------------------------------
if (appData.getTargetMonth() > 0) {
    console.log('Цель достигну за: ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

//-------------------------------
console.log(appData.getStatusIncome());
console.log(appData.addExpenses);
console.log(typeof appData.addExpenses);

//-------------------------------
/* for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + " Значение: " + appData[key]);
} */