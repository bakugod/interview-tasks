# ОБЛАСТИ ВИДИМОСТИ И ОСТАЛЬНЫЕ ОСОБЕННОСТИ JS

Сборник задач и их решений с различных собеседований и ресурсов в интернете.

## 1) Контекст вызова функции
Есть функция и объект. Напишите все известные вам способы, чтобы вывести в консоли значение `x` из объекта используя функцию

```javascript
const obj = { x: 'success' };

function f() { 
	console.log(this.x); 
}
```

<details>
  <summary>Показать ответ</summary>
  
```javascript
f.call(obj);
f.apply(obj);
f.apply.call(f, obj, obj);

//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply
Reflect.apply(f, obj, obj);

const f2 = f.bind(obj);
f2();
```
  
</details>


## 2) Контекст объекта
Что произойдёт в результате выполнения следующего кода?
```javascript
	({
  method: function() {
    (
		function() {
			console.log(this);
		}
    )();
  }
}).method();
```

<details>
  <summary>Показать ответ</summary>
  
`this` будет равен `window`

</details>

## 3) Циклы и IIFE
Что будет в консоли?
```javascript
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
```

<details>
  <summary>Показать ответ</summary>
  
```javascript
//Мне нравится данное решение.

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
```
  
</details>

## 4) Цикл с setTimeout
Что выведет в консоль данный код?
```javascript
for (var i = 0; i < 10; i++) { 
  setTimeout(function () { 
    console.log(i); 
  }, 0); 
}
```

<details>
  <br>
    <summary>Показать ответ</summary>
  
Десять десяток, остальные решения не буду приводить

```javascript
for (let i = 0; i < 10; i++) { 
  setTimeout(function () { 
    console.log(i); 
  }, 0); 
}
```

</details>

## 5) Параметры и локальные переменные
В каком случае будет ошибка и почему? Как можно ее исправить, не переименовывая аргумент и переменную?
```javascript
function func(arg) {
    let arg;
}

function func(arg) {
    {
        let arg;
    }
}
```
<details>
  <br>
    <summary>Показать ответ</summary>
  
В первом, можно исправить(ухудшить) так:

```javascript
function func(arg) {
  var arg;
}
```

</details>

## 6) Глобальный объект window
Почему возникает ошибка?
```html
<div id="test">123</div>
```

```javascript
console.log(test);
test.id = 'test2';
console.dir(test); // error
```

Вариант посложнее - нужно понять где какой цвет текста
```html
<div id="test">123</div>
<div id="test">123</div>
```

```css
#test2{
  color: red;
}
#test{
  color: blue;
}
```

```javascript
for(key of test)
	key.id = 'test2'
```
