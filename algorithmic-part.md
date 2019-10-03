# АЛГОРИТМИЧЕСКИЕ ЗАДАЧКИ

Сборник задач и их решений с различных собеседований и  ресурсов в интернете.

## 1) rebuild

Напишите код, который сделает из массива объект 
на входе массив

```javascript
const arr = [
	{name: 'width', value: 10}, 
	{name: 'height', value: 20}
];
```

на выходе объект `{width: 10, height: 20}`

<details>
  <summary>Показать ответ</summary>
  
```javascript
  const res = arr.reduce((acc, item) =>{
    acc[item.name] = item.value;
    return acc;
  }, {})
```
  
</details>

## 2) rle

Дана строка - `AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB`.
Нужно написать функцию rle, которая на выходе даст строку вида:
`A4B3C2XYZD4E3F3A6B28`
Обязательно проверять приходит ли валидная строка без чисел

<details>
  <summary>Показать ответ</summary>
  
```javascript
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
```
  
</details>

## 3) anagram

Напишите функцию, проверяющую, являются ли две строки анаграммами друг друга (регистр букв не имеет значения).
Важны только символы, пробелы или знаки препинания не учитываются. Пример:
```javascript
anagram('finder', 'Friend') //--> true
anagram('hello', 'bye') //--> false
```

<details>
 <br>
    <summary>Показать ответ</summary>

Личное решение с использованием нестандартного алгоритма
```javascript
function anagram(str1, str2){
    if(str1.length !== str2.length) return false;
    return [...str1.toLowerCase()].filter( i => ![...str2.toLowerCase()].includes(i))
	       .length === 0 ? true : false;
}
```

Решение в одну строку с использованием рекурсии
```javascript
const isAnagram = (s1, s2) => [...s1].map(char => char.toLowerCase()).sort().toString() === [...s2].map(char => char.toLowerCase()).sort().toString()
```

По заверению одного человека - самое эффективное решение
```javascript
function isAnagram(word1, word2) {
 if (word1.length !== word2.length) return false;
 
 const chars = new Map();
 
 for (let letter of word1) {
    letter = letter.toLowerCase();
    if (!chars.has(letter)) chars.set(letter, 0);
    chars.set(letter, chars.get(letter) + 1);
 }
 
 for (let letter of word2) {
    letter = letter.toLowerCase();
    if (!chars.has(letter) || chars.get(letter) === 0) return false;
    chars.set(letter, chars.get(letter) - 1);
 }
 
 return true;
}
 ```
</details>

## 4) withDot

Написать метод/функцию, который на вход принимает массив городов. 
Выводит их через запятую и в конце ставит точку.

Например:`withDot(['Москва', 'Санкт-Петербург', 'Воронеж']) --> «Москва, Санкт-Петербург, Воронеж.»`

<details>
  <summary>Показать ответ</summary>
  
```javascript
const arr = ['Москва', 'Симферополь', 'Лондон'];

function withDot(arr){ 
    return arr.toString() + '.'; 
} 

console.log(withDot(arr)) 
```

</details>

## 5) toRoundFive

Написать метод/функцию, которая на вход принимает число с плавающей точкой, а на выходе получает число
округленное до пятерок. Например: `27 => 25 | 27.8 => 30 | 41.7 => 40`

<details>
  <br>
    <summary>Показать ответ</summary>
  
Решение работает корректно с любым значением, ввод `NaN`, `Infinity`, `BigInt` - выбросит исключение `Not a valid number`
```javascript
function roundFive(num){ 
    if ( !Number.isFinite(num)){ 
        throw new Error("Not a valid number"); 
    } 
    return (num / 5).toFixed() * 5; 
}
```

</details>

## 6) isPrime
Написать метод/функцию, которая на вход принимает целое число, а на выходе возвращает
является ли число простым.

<details>
  <br>
    <summary>Показать ответ</summary>

Похожая задача, где обработаны все исключения
```javascript
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
```

</details>

## 7) sortByPosition
На входе массив:
```javascript
const items = [{
  position: 3,
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
```           
на выходе массив отсортированный по позициям.
<br>

Реализовать функцию -
```javascript
const normalizeItems = items.map(...);
```  
чтобы на выходе мы получили данный массив:
```javascript
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
```  

<details>
  <br>
    <summary>Показать ответ</summary>
  
Простая сортировка по позиции
```javascript
items.sort((prev, next) => prev.position - next.position);
```

Сортировка с изменением позиции
```javascript
const normalizeItems = items.map((item, i) => item.position = i+1);
//замечаем ошибку, переписываем теперь нормально
const normalizeItems = items.map((item, i) => ({ ...item, position: i + 1 }))
```

</details>

## 8) summary
```javascript
const values = [753, 643, 975, 615];
const sum = values => {
  ... написать 2-3 реализации
};
console.log(sum(values)) --> 2986
```

<details>
  <summary>Показать ответ</summary>
  
```javascript
const sum = values => values.reduce((output, curVal) => output + curVal);
//Логично, что можно и так:
const sum2 = values => values.reduceRight((output, curVal) => output + curVal);
//Функциональный вариант
const sum3 = ([head, ...tail]) => head ? head + sum(tail) : 0;
```

</details>

## 9) get
Написать аналог get из lodash
```javascript
const data = {
  user: {
    firstName: 'Lev',
    lastName: 'Tolstoy',
  }
};
const get = (path, object) => {
  // ... написать реализацию
};

console.log(get('user.firstName', data)); --> Lev
console.log(get('user.firstBook.title', data)); --> undefined
```

<details>
  <summary>Показать ответ</summary>
  
```javascript
const get = (path, obj) => path.split('.').reduce((o, k) => o && o[k], obj);
```

</details>

## 10
Нужно написать myDelay так, чтобы в консоли вывелось 1 2 3 (т.е. по порядку вызова), delay нельзя менять

```javascript
const delay = (t) => new Promise(resolve => setTimeout(resolve, t));
const myDelay = (...args) => delay(...args);
myDelay(50).then(() => console.log(1));
myDelay(10).then(() => console.log(2));
myDelay(30).then(() => console.log(3));
```

<details>
  <summary>Показать ответ</summary>
  
```javascript
const myDelay = async () => await delay();

//Вспоминаем правило eslint @no-return-await и пишем правильно
//https://eslint.org/docs/rules/no-return-await

const myDelay = async () => delay();

//Либо через промисы
let q = Promise.resolve();
const myDelay = (...args) => q = q.then(() => delay(...args));
```

</details>

## 11
Нужно написать функцию, которая проверит является ли строка палиндромом

<details>
  <summary>Показать ответ</summary>
  
```javascript
function isPalindrom(
	input,
  string = input.toLowerCase(),    
  comparator = string.split('').reverse().join(''),
  ){
  const midStr = mid(string);
  const midCom = mid(comparator)
  
  if(string.includes(' ')){
  	return string.split(' ').join('') === comparator.replace(/\s+/g, '')
  }
  else{
  	if(string[0] !== comparator[0]) return false
    if(string !== comparator) return false
  }
  
  return true
}

isPalindrom('А роза упала на лапу Азора') //true
isPalindrom('a') //true
isPalindrom('ab') //false
isPalindrom('aa') //true
isPalindrom('aab') //false
isPalindrom('aba') //true
isPalindrom('aaa') //true
isPalindrom('neilarmstronggnortsmralien') //true
isPalindrom('neilarmstrongxgnortsmralien') //true
isPalindrom('neilarmstrongxsortsmralien') //false
```

</details>
