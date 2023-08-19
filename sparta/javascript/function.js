function calculateAvg(price1, price2) {
    const sum = price1 + price2
    console.log(`두 상품의 가격 총합은 ${sum}입니다.`)
    const avg = sum / 2
    return avg
}

const priceA = 1000
const priceB = 2000
const avg1 = calculateAvg(priceA, priceB)
console.log(`A와 B의 평균은 ${avg1}입니다.`)

// calculateAvg(2000, 3000);

function calAvg(p1, p2, p3) {
    let sum0 = p1 + p2 + p3
    console.log(`세 상품 가격의 총합은 ${sum0}원 입니다.`)
    const avg0 = sum0 / 3
    return avg0
}

const p11 = 25000
const p22 = 32000
const p33 = 3000
const avg00 = calAvg(p11, p22, p33)
console.log(`세 상품의 평균 가격은 ${avg00}원 입니다.`)