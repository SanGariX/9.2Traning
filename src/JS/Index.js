// Дока
// https://swapi.dev/
// https://www.weatherapi.com/
// weatherapi
// #region train
// console.log("1");

// setTimeout(() => {
//     console.log("2");
// }, 0)

// Promise.resolve("3").then(value => console.log(value))
// Promise.reject("5").then((value) => console.log(value)).catch(err => console.log(err))
// console.log("4");

// const promise = new Promise((res,rej)=>{
//     setTimeout(()=>{
//         const val = Math.random()
//         if(val > 0.5){
//             res("YEEES")
//         }else{
//             rej("NOOOO")
//         }

//     }, 3000)
// })
// console.log(promise);

// promise
// .then((value)=>{
//     return value + ":-)"
// })
// .then(()=>{

// })
// .catch((err)=> {console.log(err);})
// .finally()
// const promises = fetch("Link")
// console.log(promises);
// promises
// .then((resp) => resp.json())
// .then((data)=> console.log(data))
// .catch((err)=> console.log(err))
// #endregion train
// ! Гра на рандом
// #region Гра на рандом
// const start = document.querySelector(".js-start");
// const container = document.querySelector(".js-container");

// start.addEventListener("click", onStart)

// function onStart() {
//     const result = [];
//     [...container.children].forEach((box, i)=>{
//         if(box.textContent){
//             console.log("Noo");
//             return
//         }
//         createPromise(i)
//         .then((X)=>{
//             box.textContent = X
//             result.push(1)
//         })
//         .catch((O)=>{
//             box.textContent = O
//         })
//         .finally(()=>{
//             setTimeout(()=>{
//                 if(i === container.children.length - 1){
//                     if (!result.length || result.length === container.children.length) {
//                         alert("Win money")
//                     }else{
//                         alert("lost money")
//                     }
//                 }
//             }, 500)
//         })
//     })}

// function createPromise(delay) {
//     return new Promise((res, rej)=>{
//     setTimeout(()=>{
//             const random = Math.random()
//             if(random > 0.5){
//                 res("X")
//             }else{
//                 rej("O")
//             }
//         }, 1000 * delay)
    
//     })
// }
// #endregion Гра на рандом
// ! Гра на рандом вище
// #region Граf на рандом
// const start = document.querySelector(".js-start");
// const container = document.querySelector(".js-container");

// start.addEventListener("click", onStart)

// function onStart() {
//     let counter = 0

//     const promises = [...container.children].map((_, i)=>
//         createPromise(i)
//     )

//     Promise.allSettled(promises)
//     .then((results)=>{
//         results.forEach((item, i)=> {
//         if(item.status === "fulfilled"){
//             counter += 1
//         }
//         setTimeout(()=>{
//             container.children[i].textContent = item.value || item.reason
//             if(i === [...container.children].length - 1){
//                 setTimeout(()=>{
//                 if(counter === 0 || counter === 3){
//                     alert("Winner")
//                 }else{
//                     alert("Lost")
//                 }
//                 }, 1000)
//             }
//         }, 1000 * i)
//     })
//     })


//     // .catch((result)=>{})
//     // .finally(()=>{})
// }
//                         1
// function createPromise(delay) {
//     return new Promise((res, rej)=>{
//         const random = Math.random()
//         if(random < 0.5){
//             res("X")
//         }else{
//             rej("O")
//         }
//     })
// }

// #endregion Граf на рандом

// next

const list = document.querySelector(".js-list");
const search = document.querySelector(".js-search");
search.addEventListener('submit', onSearch)

function onSearch(evt) {
    evt.preventDefault()
    const {query, days} = evt.currentTarget.elements
    query.value.toLowerCase().trim()
    if(query.value === "kyiv"){
        query.value = "Kiev"
    }
    getWeather(query.value,days.value)
    .then(data => {
        list.innerHTML = createMurkup(data.forecast.forecastday)
    })
    .catch(err=>list.innerHTML = err)
}

function getWeather(city, days) {
    const BASE_USL = "http://api.weatherapi.com/v1"
    const API_KEY = "0e64155eede244b99f9170552241210"

    return fetch(`${BASE_USL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&lang=uk`)
    .then(resp=>{
        if(!resp.ok){
            throw new Error(resp.statusText)
        }
        return resp.json()
    })
}
function createMurkup(arr) {
    return arr.map(({date, day:{avgtemp_c, condition:{icon, text}}}) => 
        `
            <li class="list__item">
                <img src="${icon}" alt="${text}">
                <h2> Дата: ${date}</h2>
                <p>${text}</p>
                <p> Середня температура: ${avgtemp_c} Цельсій</з>
            </li>
        `).join("")
}