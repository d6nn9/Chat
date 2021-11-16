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

// const obj = {};
// class Claster{
//     constructor(height, width) {
//         this.height = height;
//         this.width = width;
//       }
//     };

//     // const {Claster} = obj;
//     const newClaster = new Claster(10,20);

//     console.log(newClaster.height)


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const bar = () => console.log('bar')
// const baz = () => console.log('baz')
// const bag = () => console.log('baghhhhhhhhhhhhhhhhhhhhhhhhhhh')
// const bad = () => console.log('bad')
// const foo = () => {
// console.log('foo')
// setTimeout(bar, 0)
// new Promise((resolve, reject) =>
// resolve('should be right after baz, before bar1')
// ).then(resolve => console.log(resolve))
// new Promise((resolve, reject) =>
// resolve('should be right after baz, before bar2')
// ).then(resolve => console.log(resolve))
// new Promise((resolve, reject) =>
// resolve('should be right after baz, before bar3')
// ).then(resolve => console.log(resolve))
// new Promise((resolve, reject) =>
// resolve('should be right after baz, before ba4')
// ).then(resolve => console.log(resolve))
// process.nextTick(()=>{
//   console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjj')
// })
// bad()
// bad()
// bad()
// bad()
// bad()
// bad()
// bad()
// bad()
// bad()
// bad()
// bad()
// bad()
// bad()
// bad()
// }

// foo()
// new Promise((resolve, reject) =>
// resolve('should be right after baz, before b222222ar')
// ).then(resolve => console.log(resolve))

// ..............................................................................................................................................

// function getThis(){
//   console.log(this)
// }

// const obj={
//   consolz(){
//     getThis();
//     getThis.call(this)
//   } ,
//   node: 'dwdwdw',
// }

// obj.consolz()

// ..................................................................................................................................................
//  let obj = {
//     sum(){
//       return 10
//     }
//  };

//  let obj2 = Object.create(obj, { p: {"value": "John", writable: true, enumerable: false,}});

// console.log(obj2.__proto__)

// for(let key in obj2){
//   console.log(key)
// }

// // let animal = {
// //   eats: true
// // };

// // // создаём новый объект с прототипом animal
// // let rabbit = Object.create(animal);

// // console.log(rabbit.eats)
// ...............................................................................................................................................

console.log(JSON.stringify({ x: 5, y: 55 }));  
console.log(JSON.stringify({ x: undefined, y: Object, z: Symbol('') }));