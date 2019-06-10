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

Решение для глупых

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

//Решение тру пацанов в три строчки, в 2 вообще не читабельно было

function anagram(str1, str2){
    return [...str1.toLowerCase()].filter(i=>![...str2.toLowerCase()].includes(i))
	    .concat([...str2.toLowerCase()].filter(i=>![...str1.toLowerCase()].includes(i)))
	    .length === 0 ? true : false;
}
