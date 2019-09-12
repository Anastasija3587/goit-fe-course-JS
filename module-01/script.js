'use strick'

//tack 1

const ADMIN_PASSWORD = 'm4ng0h4ckz';
let message;

const password = prompt('input password');

if (password === ADMIN_PASSWORD){
    message = 'Добро пожаловать!';
} else if (password === null){
    message = 'Отменено пользователем!';
} else {
    message = 'Доступ запрещен, неверный пароль!';
}

alert(message);



//task 2

// const credits = 23580;
// const pricePerDroid = 3000;

// const droid = Number(prompt('How many droid?'));
// let message;
// let totalPrice;

// if (droid !== 0) {
//     totalPrice = pricePerDroid * droid;
//     if (totalPrice > credits) {
//         message = 'Недостаточно средств на счету!';
//     } else {
//         message = `"Вы купили ${droid} дроидов, на счету осталось ${credits-totalPrice} кредитов."`;
//     }

// } else {
//     alert('Отменено пользователем!');
    
// }

// console.log(totalPrice);
// console.log(message);


//task 3

// const Country = prompt('What country?');
// let message;
// let value;

// if (Country !== null && Country !== '') {
//     switch (Country.toLowerCase()) {
//         case 'китай':
//             value = '100';
//             message = `'Доставка в ${Country} будет стоить ${value} кредитов.'`;
//             break;
//         case 'южная америка':
//             value = '250';
//             message = `'Доставка в ${Country} будет стоить ${value} кредитов.'`;
//             break;
//         case 'австралия':
//             value = '170';
//             message = `'Доставка в ${Country} будет стоить ${value} кредитов.'`;
//             break;
//         case 'индия':
//             value = '80';
//             message = `'Доставка в ${Country} будет стоить ${value} кредитов.'`;
//             break;
//         case 'ямайка':
//             value = '120';
//             message = `'Доставка в ${Country} будет стоить ${value} кредитов.'`;
//             break;
//         default:
//             message = 'В вашей стране доставка не доступна.'
//     }
// } else {
//     console.log('Попробуйте ещё!')
// }

// console.log(value);
// console.log(message);