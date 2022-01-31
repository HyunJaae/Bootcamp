// class Notebook {
//     constructor(name, price, company) {
//         this.name = name
//         this.price = price
//         this.company = company
//     }
// }

// const Notebook1 = new Notebook('Mackbook', 2680000, 'apple')

// console.log(Notebook1)
// console.log(Notebook1.name)
// console.log(Notebook1.price)
// console.log(Notebook1.company)

// class product {
//     constructor(name, price) {
//         this.name = name
//         this.price = price
//     }

//     printInfo() {
//         console.log(`상품명: ${this.name}, 가격: ${this.price}원`)
//     }
// }

// const product1 = new product('Mackbook', 2600000)
// product1.printInfo()

// //객체 리터럴(Object Literal)
// const 변수명 = {
//     속성명: 데이터,
//     메소드명: function() {
//         메소드 호출 시 실행할 코드들
//     }
// }
// const computer = {
//     name: 'Mackbook',
//     price: 2600000,
//     printInfo: function() {
//         console.log(`name: ${this.name}, price: ${this.price}`)
//     }
// }

// computer.printInfo()

class shopMall {
    constructor(name, color, size, price) {
        this.name = name
        this.color = color
        this.size = size
        this.price = price
    }
    printInfo() {
        console.log(`상품명: ${this.name}, 색상: ${this.color}, 사이즈: ${this.size}, 가격: ${this.price}원`)
    }
}

const product001 = new shopMall('기모 맨투맨', '그레이', 'XL', 69000)
product001.printInfo()
console.log(product001)