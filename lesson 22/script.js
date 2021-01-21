// 1. Запросить у пользователя его возраст и определить, кем он является: ребенком (0–12), подростком (12–18), взрослым (18_60) или пенсионером (60– ...).

// let age = prompt('Введите свой возраст:');

// if (age <= 12) {console.log('Вы ещё ребёнок!');
// } else if (age <= 18) {console.log('Вы подросток!');
// } else if (age <= 60) {console.log('Вы уже взрослый');
// } else {console.log('Вы пенсионер')}



// 2. Запросить у пользователя число от 0 до 9 и вывести ему спецсимвол, который расположен на этой клавише (1–!, 2–@, 3–# и т. д).

// let number = prompt('Введите число от 0 до 9:');

// switch (number) {
//     case '1': console.log('!'); break;
//     case '2': console.log('@'); break;
//     case '3': console.log('#'); break;
//     case '4': console.log('$'); break;
//     case '5': console.log('%'); break;
//     case '6': console.log('^'); break;
//     case '7': console.log('&'); break;
//     case '8': console.log('*'); break;
//     case '9': console.log('('); break;
//     case '0': console.log(')'); break;
// }



// 3. Запросить у пользователя трехзначное число и проверить, есть ли в нем одинаковые цифры.

// let number = prompt('Введите трёхзначное число:');

// let a = Math.floor(number / 100),
//     b = (Math.floor(number / 10)) % 10,
//     c = number % 10;
// if ((a == b) || (a == c) || (b == c)) {
//     console.log('В числе есть одинаковые цифры');
// } else console.log('В числе НЕТ одинаковых цифр');



// 4. Запросить у пользователя год и проверить, високосный он или нет. Високосный год либо кратен 400, либо кратен 4 и при этом не кратен 100.

let year = prompt('Введите год:');

if ((year % 400 == 0) || ((year % 4 == 0) && (year % 100 !== 0))) {
    console.log('Это високосный год');
} else console.log('Данный год НЕ високосный'); 