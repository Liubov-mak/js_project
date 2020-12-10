'use strict';

const start = document.getElementById('start'), // кнопка старта
    cancel = document.getElementById('cancel'), // кнопка отмены
    incomeAdd = document.querySelector('.income_add'),    
    expensesAdd = document.querySelector('.expenses_add'),    
    checkBox = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'), //Месячный доход
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'), // Возможные расходы
    targetAmount = document.querySelector('.target-amount'), //Сумма депозита
    periodSelect = document.querySelector('.period-select'), //выбор периода
    periodAmount = document.querySelector('.period-amount'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    incomeItems = document.querySelectorAll('.income-items'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositBank = document.querySelector('.deposit-bank');
let isNumber;

//-------------------------------
class AppData {
    constructor() {

        this.income = {}; // дополнительный источник дохода
        this.addIncome = [];
        this.expenses = {}; // расходы
        this.addExpenses = [];
        this.incomeMonth = 0;
        this.deposit = false;
        this.percentDeposit = 0; // процент депозита
        this.moneyDeposit = 0; // сколько человек заложил  
        this.budget = 0; // доход
        this.budgetDay = 0; // budgetMonth / 30
        this.budgetMonth = 0; // доходы минус сумма расходов в месяц
        this.expensesMonth = 0; // сумма расходов 
    }
    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    check() {
        if (salaryAmount.value !== '') {
            start.removeAttribute('disabled');
        }
    }
    start() {
        if (salaryAmount.value === '') {
            start.setAttribute('disabled', 'true');
            return;
        }
        const allInput = document.querySelectorAll('.data input[type = text]');
        allInput.forEach(function (item) {
            item.setAttribute('disabled', 'true');
        });
        expensesAdd.setAttribute('disabled', 'true');
        incomeAdd.setAttribute('disabled', 'true');
        cancel.style.display = "block";
        start.style.display = "none";

        this.budget = +salaryAmount.value;

        this.getExpInc();       
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();        
        this.getInfoDeposit();
        this.getBudget();        
        this.getStatusIncome();        
        this.showResult();
        this.blocked();
        this.checkDepositPersent();
    }
    showResult() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('change', function () {
            incomePeriodValue.value = _this.calcSavedMoney();
        });
    }
    getExpInc() {
        const count = item => {
            let startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }

        };
        expensesItems.forEach(count);
        incomeItems.forEach(count);

        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    addExpensesBlock() {
        const expensesItems = document.querySelectorAll('.expenses-items');
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);

        if (expensesItems.length === 2) {
            expensesAdd.style.display = 'none';
        }
    }
    addIncomeBlock() {
        const incomeItems = document.querySelectorAll('.income-items');
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);

        if (incomeItems.length === 2) {
            incomeAdd.style.display = 'none';
        }
    }
    /* AppData.prototype.addExpIncBlock = function() {
        let item;
        let startStr = item.className.split('-')[0];
        const expIncItems = document.querySelectorAll(`.${startStr}-items`);
        const cloneExpIncItems = expIncItems[0].cloneNode(true);
            expIncItems[0].parentNode.insertBefore(cloneExpIncItems, expensesAdd);
            expIncItems[0].parentNode.insertBefore(cloneExpIncItems, incomeAdd);
    
            if (expIncItems.length === 2) {
                expensesAdd.style.display = 'none';
                incomeAdd.style.display = 'none';
            }
    
    }; */
    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }
    getExpensesMonth() {
        let result = 0;
        for (const key in this.expenses) {
            result += +this.expenses[key];
        }
        this.expensesMonth = result;
        return result;
    }
    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth() + monthDeposit;
        this.budgetDay = Math.ceil(Math.floor(this.budgetMonth / 30));
    }
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }
    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay > 0 && this.budgetDay < 600) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }
    }    
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }
    reset() {
        const inputTextData = document.querySelectorAll('.data input[type = text]'),
            resultInputAll = document.querySelectorAll('.result input[type = text]');

        inputTextData.forEach(function (elem) {
            elem.value = '';
            elem.removeAttribute('disabled');
            periodSelect.value = '0';
            periodAmount.innerHTML = periodSelect.value;
        });
        resultInputAll.forEach(function (elem) {
            elem.value = '';
        });

        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].parentNode.removeChild(incomeItems[i]);
            incomeAdd.style.display = 'block';
        }

        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.removeChild(expensesItems[i]);
            expensesAdd.style.display = 'block';
        }

        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.expensesMonth = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.addExpenses = [];

        cancel.style.display = "none";
        start.style.display = "block";
        expensesAdd.removeAttribute('disabled');
        incomeAdd.removeAttribute('disabled');
        checkBox.checked = false;
    }
    blocked() {
        document.querySelectorAll('.data input[type = text]').forEach((item) => {
            item.disabled = true;
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
    } 
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
            
        }
    }  
    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {   
            depositPercent.style.display = 'inline-block';                           
        } else {
            depositPercent.value = valueSelect;
        }       
    } 
    checkDepositPersent() {      
        this.percentDeposit.value = alert('Введите корректное значение в поле проценты');
            while (isNumber(this.percentDeposit) || this.percentDeposit.trim() === '' || this.percentDeposit === null) {
                this.percentDeposit.value = alert('Введите корректное значение в поле проценты');
            }  
        if(this.depositPercent.value >= 100 && this.depositPercent.value < 0) {
            alert('Введите корректное значение в поле проценты');
        }
    }
    depositHandler() {
        if(checkBox.checked) { // если чекбокс-галка установлен, будем выводить Установлен
            depositAmount.style.display = 'inline-block';
            depositBank.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositAmount.style.display = 'none';
            depositBank.style.display = 'none';
            depositAmount.value = '';
            depositBank.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }
    eventListeners() {
        start.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));
        expensesAdd.addEventListener('click', this.addExpensesBlock);
        incomeAdd.addEventListener('click', this.addIncomeBlock);
        salaryAmount.addEventListener('keyup', this.check);
        checkBox.addEventListener('change', this.depositHandler.bind(this));

        periodSelect.addEventListener('change', function () {
            periodAmount.innerHTML = periodSelect.value;
        });
    }    
    
}

const appData = new AppData();
appData.eventListeners(); 
/* console.log(appData); */

const myLesson = [
    {lesson: 1, type: 'basic', points: 2},
    {lesson: 2, type: 'additional', points: 4},
    {lesson: 3, type: 'basic', points: 6},
    {lesson: 4, type: 'additional', points: 3},
    {lesson: 5, type: 'basic', points: 4},
    {lesson: 6, type: 'basic', points: 2},
    {lesson: 7, type: 'additional', points: 2},
    {lesson: 8, type: 'basic', points: 6},
    {lesson: 9, type: 'basic', points: 4},
    {lesson: 10, type: 'basic', points: 6},
    {lesson: 11, type: 'additional', points: 5}, 
    {lesson: 12, type: 'basic', points: 2}, 
    {lesson: 13, type: 'additional', points: 2}, 
    {lesson: 14, type: 'basic', points: 4},
    {lesson: 15, type: 'additional', points: 1},
    {lesson: 16, type: 'additional', points: 7},
    ];
    
    function newMyLesson(...arr) {
        console.log(arr);
    }

    newMyLesson(...myLesson);      

    /*  newMyLesson(...myLesson).querySelectorAll("type: 'additional'").forEach(() => {
        console.log(newMyLesson);
    }); */

