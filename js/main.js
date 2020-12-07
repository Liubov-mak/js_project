'use strict';

let start = document.getElementById('start'), // кнопка старта
    incomeAdd = document.querySelector('.income_add'),
    cancel = document.getElementById('cancel'), // кнопка отмены
    expensesAdd = document.querySelector('.expenses_add'),

    depositСheck = document.querySelector('#deposit-check'),

    depositCheckmark = document.querySelector('.deposit-checkmark'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    /* prevAdditionalIncomeItem = document.querySelectorAll('.additional_income> .additional_income-item')[0],
    nextAdditionalIncomeItem = document.querySelectorAll('.additional_income> .additional_income-item')[1], */
    incomeTitle = document.querySelector('.income-items> .income-title'), //Дополнительный доход
    /* incomeAmount = document.querySelector('.income-amount'), */ //Дополнительный доход - сумма
    incomeItems = document.querySelectorAll('.income-items'),
    salaryAmount = document.querySelector('.salary-amount'), //Месячный доход
    expensesTitle = document.querySelectorAll('.expenses-items> .expenses-title')[0], //Обязательные расходы 
    /* expensesAmount = document.querySelector('.expenses-amount'), */ //Обязательные расходы - сумма
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'), // Возможные расходы
    targetAmount = document.querySelector('.target-amount'), //Сумма депозита
    periodSelect = document.querySelector('.period-select'), //выбор периода
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0];
    /* incomeItem = document.querySelector(); */

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

String.prototype.firstLetterCaps = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

//-------------------------------
let appData = {
    income: {}, // дополнительный источник дохода
    addIncome: [],
    expenses: {}, // расходы
    addExpenses: [],
    incomeMonth: 0,
    deposit: false,
    percentDeposit: 0, // процент депозита
    moneyDeposit: 0, // сколько человек заложил  
    budget: 0, // доход
    budgetDay: 0, // budgetMonth / 30
    budgetMonth: 0, // доходы минус сумма расходов в месяц
    expensesMonth: 0,  // сумма расходов  
    start: function() {           
        appData.budget = +salaryAmount.value;        
        appData.getExpenses();
        appData.getIncome(); 
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();         
        appData.getBudget();             
        appData.showResult();  
        appData.blocked();      
    },
/*     cancel: function() {      
        appData.resetResult();            
    },
    resetResult: function() {
        cancel.addEventListener('click', function() {
            appData.showResult().reset();            
        });
    }, */
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim(', ');
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    blocked: function() {
        document.querySelectorAll('.data input[type = text]').forEach(function(item) {
            item.disabled = true;
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcSavedMoney();       
        periodSelect.addEventListener('change', function() {
            incomePeriodValue.value = appData.calcSavedMoney();
        });
        console.log(this);
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
        console.log(this);
    },
    addExpensesBlock: function() {
        let expensesItems = document.querySelectorAll('.expenses-items');       
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);

        if (expensesItems.length === 2) {
            expensesAdd.style.display = 'none';
        }     
        
        /*  cloneExpensesItem.querySelectorAll('input').forEach((item) => {
            item.value = '';
        }); */
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
        console.log(this);
    },
    addIncomeBlock: function() {
        let incomeItems = document.querySelectorAll('.income-items');        
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);

        if (incomeItems.length === 2) {
            incomeAdd.style.display = 'none';
        }
    },  
    getIncome: function() {
    /*    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
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
 */
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
        console.log(this);
    },
    asking: function() {

        let addExpenses = prompt('Перечислите возможные расходы через запятую?');
            while (isNumber(addExpenses) || addExpenses.trim() === '' || addExpenses === null) {
                addExpenses = prompt('Перечислите возможные расходы через запятую?');
            }                  
            appData.addExpenses = new Array(addExpenses).join(', ').firstLetterCaps();         


            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            /*   for (let i = 0; i < 2; i++) {
                let itemExpenses = prompt('Введите обязательную статью расходов?');
                while (isNumber(itemExpenses) || itemExpenses.trim() === '' || itemExpenses === null) {
                    itemExpenses = prompt('Введите обязательную статью расходов?');
                }
                let cashExpenses;
                do {
                    cashExpenses = prompt('Во сколько это обойдется?');
                } 
                while (isNaN(cashExpenses) || cashExpenses.trim() === '' || cashExpenses === null);

                appData.expenses[itemExpenses] = cashExpenses;
            }  */                     
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }  
        console.log(this);      
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        console.log(this);
    },
    getTargetMonth: function() {
        console.log(this);
        return targetAmount.value / appData.budgetMonth;        
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
            while (isNumber(appData.percentDeposit) || appData.percentDeposit.trim() === '' || appData.percentDeposit === null) {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            appData.moneyDeposit = prompt('Какая сумма заложена?', 1000);   
            while (isNaN(appData.moneyDeposit) || appData.moneyDeposit.trim() === '' || appData.moneyDeposit === null) {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 1000);
            }
        }        
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * periodSelect.value;
    },
};

let periodAmount = document.querySelector('.period-amount');
periodSelect.addEventListener('input', function() {
    periodAmount.innerHTML = this.value;
    console.log(periodAmount);       
});

start.addEventListener('click', appData.start);
cancel.addEventListener('click', appData.cancel);
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);


//-------------------------------
/* if (appData.getTargetMonth() > 0) {
    console.log('Цель достигну за: ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
} */

//-------------------------------
/* for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + " Значение: " + appData[key]);
} */

/* let changeSelect = function() {     
}
periodSelect.addEventListener('change', changeSelect); */