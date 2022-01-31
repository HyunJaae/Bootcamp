// let tempt = 20
// while (tempt < 25) {
    // console.log(`${tempt}도 정도면 적당한 온도입니다.`);
    // tempt++
// }

// for (begin; condition; step){조건을 만족할 때 실행할 코드}

for (let tempt = 20; tempt < 25; tempt++) {
    console.log(`${tempt}도 정도면 적당한 온도입니다.`);
}

for (let num = 1; num <=10; num++) {
    if (num % 3 === 0){
        console.log(`${num}는(은) 3으로 나눠서 떨어지는 숫자입니다.`)
    }
}

for (let n = 1; n <= 20; n++) {
    if (n % 2 === 1) {
        console.log(`${n}은 홀수입니다.`)
    } else {
        console.log(`${n}은 짝수입니다.`)
    }
}