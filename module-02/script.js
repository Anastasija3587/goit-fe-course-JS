'use strick'

//tack 1

let input;
const numbers = [];
let total = 0;

for (;;) {
    input = Number(prompt('enter number'));
    if (isNaN(input)) {
        alert('Было введено не число, попробуйте еще раз');
    }
    if (input === 0)
        break;
    if (Number(input)) {
        numbers.push(input);
    }
}

for (let key of numbers) {
    total = total += key;
}
console.log(total);





//task 2

// const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
// let attemptsLeft = 3;
// let counter = 0;

// while (counter < attemptsLeft) {
//     const input = prompt('enter password');
//     if (input === null) {
//         break;
//     }
//     if (passwords.indexOf(input) !== -1) {
//         alert('Добро пожаловать!')
//         break;
//     } else {
//         alert(`'Неверный пароль, у вас осталось ${attemptsLeft -= 1} попыток'`)
//         if (counter === attemptsLeft) {
//             alert('У вас закончились попытки, аккаунт заблокирован!');
//         }
//     }
// }