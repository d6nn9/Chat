// let data = [];

// const { IniLoader } = require("aws-sdk")

// const myFunction = async () => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve([1,2,3]);
//     }, 3000);
//   });
// };

// (async () => {
//     console.log('выполнится позже1');
//   data = await myFunction();
//   console.log('выполнится позже2');
//   console.log('выполнится позже3');
// })();

// console.log('выполнится первым', data);

// function asFunc(ms, num){
//     return new Promise((res,rej)=>{
//         setTimeout(()=>{
//             console.log(num)
//             res()
//         },ms)
//     })
// }

// (async function loader(){
//     await asFunc(5000, 1);
//     console.log('Первый')
//      asFunc(4000, 2);
//     await asFunc(3000, 3);
//     await asFunc(2000, 4);
//     console.log('Последний')
//     await asFunc(1000, 5);
// })()

// console.log('Вне')

// asFunc(5000, 1)

// console.log('ВСЕ')

// ???///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const obj = {};
class Claster{
    constructor(height, width) {
        this.height = height;
        this.width = width;
      }
    };

    // const {Claster} = obj;
    const newClaster = new Claster(10,20);

    console.log(newClaster.height)

