console.log('my' + 'car')
console.log('1' + 2)
console.log(1 + 2)

const shoesPrice = 200000;
console.log('이 신발의 가격은 '+ shoesPrice + '원입니다.')
console.log(`이 신발의 가격은 ${shoesPrice}원 입니다.`)

console.log(3 * 2)
console.log(10 ** 2)
console.log(10 / 2)
console.log(10 % 3)

let count = 1
const preCount = ++count

console.log(`count: ${count}, preCount: ${preCount}`)

let count_1 = 1
const preCount_1 = count++

console.log(`count: ${count_1}, preCount: ${preCount_1}`)

const shirtsPrice = 100000
const pantsPrice = 80000
let totalPrice = 0

totalPrice += shirtsPrice
console.log(totalPrice)

totalPrice += pantsPrice
console.log(totalPrice)

totalPrice -= shirtsPrice
console.log(totalPrice)

let isOnsale = true
let isDiscountItem = true

console.log(isOnsale && isDiscountItem)
console.log(isOnsale || isDiscountItem)

isOnsale = false
console.log(isOnsale && isDiscountItem)
console.log(isOnsale || isDiscountItem)

isDiscountItem = false
console.log(isOnsale && isDiscountItem)
console.log(isOnsale || isDiscountItem)

console.log(!isDiscountItem);

console.log(1 === 1)
console.log(1 === 2)

console.log('Javascript' === 'Javascript')
console.log('Javascript' === 'javascript')

console.log(1 === "1");
console.log(1 == "1");

let a = 50000;
let b = 30000;
let c = a + b;

console.log(`총 ${c * 0.8}원에 물건을 구입합니다.`);

const walletPrice = 50000
if (walletPrice < 40000) {
    console.log('신발을 사겠습니다.')
} else if (walletPrice <= 50000) {
    console.log('고민 해보겠습니다.')
} else {
    console.log('너무 비싸요. 신발 안살래요')
}

const km = 3
if (km < 2) {
    console.log('걸어가자')
} else if /* (2 <= km < 5) */ (km >= 2 && km < 5) {
    console.log('택시 고고')
} else {
    console.log('가지 말자')
}

