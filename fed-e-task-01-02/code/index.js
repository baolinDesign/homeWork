const fp = require('lodash/fp')
// 数据
// horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [
  {
    name: 'Ferrari FF',
    horsepower: 660,
    dollar_value: 700000,
    in_stock: true
  },
  {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false
  },
  {
    name: 'Jaguar XKR-S',
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false
  },
  {
    name: 'Audi R8',
    horsepower: 525,
    dollar_value: 114200,
    in_stock: false
  },
  {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true
  },
  {
    name: 'Pagani Huayra',
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false
  },
]
// 练习1，使用函数组合fp.flowRight()重新实现下面这个函数
const f = fp.flowRight(fp.prop('in_stock'),fp.last)
console.log(f(cars))


// 练习2，使用fp.flowRight()\fp.prop()和fp.first()获取·第一个car的name
const f2 = fp.flowRight(fp.prop('name'),fp.first)
console.log(f2(cars))

// 练习3，使用帮助函数_average重构averageDollarValue,使用函数组合的方式实现
let _average = function(xs) {
  // console.log(xs)
  return fp.reduce(fp.add, 0 , xs ) / xs.length
}

const f3 = fp.flowRight(_average, fp.map(fp.prop('dollar_value')))
console.log(f3(cars))

// 练习4,使用flowRight 写一个sansanitizeNames()函数，返回一个下划线链接的小写字符串，把数组中的name转环卫这种形式
const log = val => {
  console.log(val)
  return val
}
let _underscore = fp.replace(/\W+/g, '_')
const sanitizeNames = fp.flowRight(fp.map(fp.flowRight(_underscore, fp.toLower, fp.prop('name'))))
console.log(sanitizeNames(cars))


const { Maybe, Container } = require('./support.js')
// 代码2--练习题1 使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1
// let maybe = Maybe.of([5,6,1])
let ex1 = (x,y)=> Maybe.of(x).map(x = fp.map(x => fp.add(x,y)))
console.log(ex1([5,6,1],2))

// 代码2--练习题2 实现一个函数ex2，能够使用fp.first获取列表的第一个元素
let xs = Container.of(['do','ray','me','fa','so','la','ti','do'])
// let ex2 = fp.first(xs._value)
let ex2 = xs.map(x =>fp.first(x) )
console.log(ex2)

// 代码2 -- 练习题3  实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母
let safeProp = fp.curry(function(x,o){
  return Maybe.of(o[x])
})
let user = { id:2, name: 'Albert'}
let ex3 = safeProp('name',user).map(x => fp.first(x))
console.log(ex3)

// 代码2 -- 练习题4  使用Maybe重写ex4，不要有if语句
let ex4 = s => new Maybe(s)
      .map(s => parseInt(s))

console.log(ex4(2.333))
