//ОБЛАСТИ ВИДИМОСТИ И ТУПЫЕ ЗАДАЧКИ

/**1
* Есть функция и объект
* Напишите все известные вам способы, чтобы вывести в консоли значение x из объекта используя функцию
*/
const obj = { x: 'success' };

function f() { 
	console.log(this.x); 
}

f.call(obj);
f.apply(obj);
f.apply.call(f, obj, obj);

//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply
Reflect.apply(f, obj, obj);

const f2 = f.bind(obj);
f2();



/**2
Что произойдёт в результате выполнения следующего кода?
	-this будет равен window
*/
	({
  method: function() {
    (
		function() {
			console.log(this);
		}
    )();
  }
}).method();


/**3
Что будет в консоли?

var i = 10;
var array = [];

while (i--) {
    array.push(function() {
        return (function(j) {
            return j + j;
        })(i);
    });
}

console.log([
    array[0](),
    array[1](),
])

[-2, -2]
*/

//Мне нравится решение в котором не надо говнокодить при вызове

var i = 10;
var array = [];

while (i--) {
    array.push((function() {
        return (function(j) {
            return j + j;
        })(i);
    })());
}

console.log([
    array[0],
    array[1],
])


/**4
Что выведет в консоль данный код?

for (var i = 0; i < 10; i++) { 
  setTimeout(function () { 
    console.log(i); 
  }, 0); 
}
Десять десяток, ущербные решения не буду приводить
*/

for (let i = 0; i < 10; i++) { 
  setTimeout(function () { 
    console.log(i); 
  }, 0); 
}
