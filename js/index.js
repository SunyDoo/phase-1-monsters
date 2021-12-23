let currentPage = 1
const container = ()=> document.getElementById('monster-container')
document.addEventListener('DOMContentLoaded', ()=>{
    getAllMonsters(currentPage)
    const forwardBtn = document.getElementById('forward') 
    const backBtn = document.getElementById('back')    
//fetch request to upload monsters
    function getAllMonsters(page){
        fetch (`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then (res=>res.json())
// .then (mons=>mons.forEach(addMonster(item)))
        .then (monsData=>{
            clearScreen()
            monsData.forEach(mon=>addMonster(mon))
        })
    }
    function clearScreen(){
        container().innerHTML = ''
    }
//function that adds monsters to DOM
    function addMonster(mon){        
        const monsterList = document.createElement('li')
        container().appendChild(monsterList)
        monsterList.innerHTML = `
            <h2>${mon.name}</h2>
            <h3>${mon.age}</h3>
            <p>${mon.description}</p>
        `
    }
// event listener to create new monster
    const monsterCreater = document.querySelector('.add-monster')
    monsterCreater.addEventListener('submit', createMonster)
    // console.log(monsterCreater)
//post new monster to server
    function updateMonsterList(monObj){
        fetch ('http://localhost:3000/monsters',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:JSON.stringify(monObj)
    })
    .then(res=>res.json())
    .then(monster=>console.log(monster))
    }
//monster creating function
    function createMonster(e){
        e.preventDefault()        
        let monObj = {
            name:e.target.name.value,
            age:e.target.age.value,
            description:e.target.description.value
        }
        monsterCreater.reset()        
    addMonster(monObj)
    updateMonsterList(monObj)
    // console.log(monObj)        
    }
//event listener for forward button to bring up next list of 50 monsters
    forwardBtn.addEventListener('click', ()=>{
        currentPage++
        getAllMonsters(currentPage)
    })
    backBtn.addEventListener('click', ()=>{
        currentPage--
        getAllMonsters(currentPage)
    })
})