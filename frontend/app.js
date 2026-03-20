const nameInput = document.getElementById('nameInput')
const searchBtn = document.getElementById('searchBtn')
const searchView = document.getElementById('searchView')
const resultView = document.getElementById('resultView')
const resultName = document.getElementById('resultName')
const cardsContainer = document.getElementById('cardsContainer')
const downloadBtn = document.getElementById('downloadBtn')
const backBtn = document.getElementById('backBtn')


searchBtn.addEventListener("click",async()=>{
    const name = nameInput.value.trim()
    console.log(name)

    if(!name){
        alert("Please enter a name")
        return
    }
    const response = await fetch("http://localhost:5000/api/translate",{
    method : 'POST',
    headers:{
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify({name})
})

const data = await response.json()
console.log(data)
searchView.style.display ='none'
resultView.style.display = 'block'

resultName.textContent = data.data.name

cardsContainer.innerHTML = ''

const translations = data.data.translations

const languageFlags = {
    hindi: '🕉️',
    urdu: '☪️',
    russian: '❄️',
    arabic: '🌙',
    greek: '🏛️',
    bengali: '🌸',
    punjabi: '⚔️',
    gujarati: '🦁',
    telugu: '🌺',
    kannada: '🌴',
    malayalam: '🌊',
    persian: '🌹',
    tamil: '🌿',
    marathi: '🙏',
    nepali: '🏔️',
    Sanskrit: '📿'
}


Object.entries(translations).forEach(([lang, text]) => {
    const card = document.createElement('div')
    card.className = 'lang-card'
    card.innerHTML = `
        <span class="flag">${languageFlags[lang] || '🌐'}</span>
        <p class="lang-name">${lang}</p>
        <p class="translated">${text}</p>
    `
    cardsContainer.appendChild(card)
})

console.log(name)

})

backBtn.addEventListener("click", () => {
    resultView.style.display = 'none'
    searchView.style.display = 'flex'
    nameInput.value = ''
    cardsContainer.innerHTML = ''
})

downloadBtn.addEventListener("click", () => {
    resultView.classList.add('downloading')
    html2canvas(resultView,{
        backgroundColor: '#0a0a0f',
        scale: 2,  // higher quality image
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a')
        link.download = `namescript-${resultName.textContent}.png`
        link.href = canvas.toDataURL()
        link.click()
    })
})

