//АЛГОРИТМИЧЕСКИЕ ЗАДАЧКИ


/**1
Напишите код, который сделает из массива объект
	на входе массив arr
	на выходе объект {width: 10, height: 20}
*/

const arr = [
	{name: 'width', value: 10}, 
	{name: 'height', value: 20}
];

const res = arr.reduce((acc, item) =>{
	acc[item.name] = item.value;
	return acc;
}, {})

console.log(res);


/**2
Дана строка - AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB
Нужно написать функцию RLE, которая на выходе даст строку вида:
A4B3C2XYZD4E3F3A6B28

Обязательно проверять приходит ли валидная строка без чисел
*/

function rle(str) {
	if (/\d/.test(str)) {
		throw "Include numbers";
	}
	let res = "";
	let lastChar = "";
	let counter = 1;

	[...str].forEach(char => {
		if (char !== lastChar) {
	    	if (counter > 1) {
	        	res += counter;
	        }
	        res += char;
	        lastChar = char;
	        counter = 1;
	    } 
	    else {
			counter += 1;
	    }
	});
	if (counter > 1) {
		res += counter;
	}
	return res;
}

console.log(rle('AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB'));
console.log(rle('AAAABBBCCXYZ2'));


/**3
Напишите функцию, проверяющую, являются ли две строки анаграммами друг друга (регистр букв не имеет значения).
Важны только символы, пробелы или знаки препинания не учитываются. Пример:

anagram('finder', 'Friend') //--> true
anagram('hello', 'bye') //--> false

Долгое решение

Вспомогательная функция, которая создаёт объект для хранения данных
const buildCharObject = str => {
  const charObj = {}
  for(let char of str.replace(/[^\w]/g).toLowerCase()) {
     Если объект уже содержит пару ключ-значение равную значению в цикле,
     увеличиваем значение на 1, в противном случае добавляем букву в качестве ключа
     и 1 в качестве значения
    charObj[char] = charObj[char] + 1 || 1
  }
  return charObj
}

const anagram = (strA, strB) => {
  Создаём объект для хранения strA
  const aCharObject = buildCharObject(strA)
  Создаём объект для хранения strB
  const bCharObject = buildCharObject(strB)
  Сравниваем количество ключей в обоих объектах 
  (анаграммы должны иметь одинаковое количество букв)
  if(Object.keys(aCharObject).length !== Object.keys(bCharObject).length) {
    return false
  }
  Если оба объекта имеют одинаковое количество ключей, мы можем быть уверены,
  что обе строки имеют одинаковое количество символов. Теперь мы можем сравнить
  оба объекта, чтобы увидеть, имеют ли они одинаковые буквы в одинаковом количестве
  for(let char in aCharObject) {
    if(aCharObject[char] !== bCharObject[char]) {
      return false
    }
  }
  Если проверка успешна, строки являются анаграммами — возвращаем true
  return true
}
*/

//Исправлено исключение anagram("e", "eee") --> true

function anagram(str1, str2){
    if(str1.length !== str2.length) return false;
    return [...str1.toLowerCase()].filter(i=>![...str2.toLowerCase()].includes(i))
	    .concat([...str2.toLowerCase()].filter(i=>![...str1.toLowerCase()].includes(i)))
	    .length === 0 ? true : false;
}


/**4
Написать метод/функцию, который на вход принимает массив городов. 
Выводит их через запятую и в конце ставит точку.

Например:
withDot([Москва, Санкт-Петербург, Воронеж]) --> «Москва, Санкт-Петербург, Воронеж.»
*/

const arr = ['Москва', 'Симферополь', 'Лондон'];

function withDot(arr){ 
    return arr.toString() + '.'; 
} 

console.log(withDot(arr)) 


/**5
Написать метод/функцию, которая на вход принимает число с плавающей точкой, а на выходе получает число
округленное до пятерок. Например, 27 => 25, 27.8 => 30, 41.7 => 40
*/


//Решение работает корректно с любым значением, ввод NaN, Infinity, BigInt - учтен
function roundFive(num){ 
    if ( !Number.isFinite(num)){ 
        throw new Error("Not a valid number"); 
    } 
    return (num / 5).toFixed() * 5; 
}


/**6
Написать метод/функцию, которая на вход принимает целое число, а на выходе возвращает
является ли число простым.
*/

//Похожая задача, где обработаны все исключения
function isPrime(num){ 
    if ( !Number.isFinite(num) || 
	num < 1 
    ){ 
	throw new Error("Not a valid number"); 
    } 
    if (num === 1) return true;
	
    for(let i = 2;i < Math.sqrt(num)+1; i++){ 
	if ((num % i) == 0) return false; 
    return true; 
    } 
} 


/**7
const items = [{
  position: 2,
  name: 'Яблоки',
}, {
  position: 1,
  name: 'Груши',
}, {
  position: 2,
  name: 'Помидоры',
}];

items.sort(...);
           
console.log(items);
// должно получится (сортировка по position)
[{
  position: 1,
  name: 'Груши',
}, {
  position: 2,
  name: 'Помидоры',
}, {
  position: 2,
  name: 'Яблоки', 
}];

const normalizeItems = items.map(...);
                                 
console.log(items);
// должно получится
[{
  position: 1,
  name: 'Груши',
}, {
  position: 2,
  name: 'Помидоры',
}, {
  position: 3,
  name: 'Яблоки', 
}];
*/

items.sort((prev, next) => prev.position - next.position);

const normalizeItems = items.map((item, i) => item.position = i+1);
//замечаем ошибку сразу, переписываем теперь нормально
const normalizeItems = items.map((item, i) => ({ ...item, position: i + 1 }))


/**8
const values = [753, 643, 975, 615];

const sum = values => {
  ... написать 2-3 реализации
};

console.log(sum(values));
*/

const sum = values => values.reduce((output, curVal) => output + curVal);
//Логично
const sum2 = values => values.reduceRight((output, curVal) => output + curVal);
//Функциональный вариант
const sum3 = ([head, ...tail]) => head ? head + sum(tail) : 0;


/**9
Аналог get из Lodash
const data = {
  user: {
    firstName: 'Lev',
    lastName: 'Tolstoy',
  }
};

const get = (path, object) => {
  // ... написать реализацию
};

console.log(get('user.firstName', data)); // Lev
console.log(get('user.firstBook.title', data)); // undefined
*/

//Это не мое решение, но оно очень крутое
const get = (path, obj) => path.split('.').reduce((o, k) => o && o[k], obj);


/**10
Нужно написать myDelay так, чтобы в консоли вывелось 1 2 3 (т.е. по порядку вызова)
delay нельзя менять

const delay = (t) => new Promise(resolve => setTimeout(resolve, t));

const myDelay = (...args) => delay(...args);

myDelay(50).then(() => console.log(1));
myDelay(10).then(() => console.log(2));
myDelay(30).then(() => console.log(3));
*/

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

const myDelay = async () => await delay()

myDelay(50).then(() => console.log(1));
myDelay(10).then(() => console.log(2));
myDelay(30).then(() => console.log(3));

//Либо через промисы
let q = Promise.resolve();
const myDelay = (...args) => q = q.then(() => delay(...args));














