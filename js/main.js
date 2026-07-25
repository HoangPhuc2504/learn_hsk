document.addEventListener('DOMContentLoaded',()=>{
  const cards = Array.from(document.querySelectorAll('.card'))
  const practiceContainer = document.getElementById('practiceCards')
  const showAllBtn = document.getElementById('showAll')
  const hideAllBtn = document.getElementById('hideAll')

  // Duplicate vocab into practice area
  cards.forEach(c=>{
    const clone = c.cloneNode(true)
    clone.classList.add('practice-card')
    practiceContainer.appendChild(clone)
  })

  function toggleDetail(el){
    if(el.dataset.shown === '1'){
      el.textContent = el.dataset.char || el.textContent.split('\n')[0]
      el.dataset.shown = '0'
      return
    }
    const pinyin = el.dataset.pinyin || ''
    const meaning = el.dataset.meaning || ''
    el.dataset.char = el.textContent
    el.innerHTML = `${el.textContent}<br><span class="meta">${pinyin} — ${meaning}</span>`
    el.dataset.shown = '1'
  }

  // attach click handlers to all card-like elements
  document.querySelectorAll('.card, .practice-card').forEach(el=>{
    el.addEventListener('click', ()=>{
      toggleDetail(el)
    })
  })

  showAllBtn.addEventListener('click', ()=>{
    document.querySelectorAll('.card, .practice-card').forEach(el=>{
      if(el.dataset.shown !== '1') toggleDetail(el)
    })
  })
  hideAllBtn.addEventListener('click', ()=>{
    document.querySelectorAll('.card, .practice-card').forEach(el=>{
      if(el.dataset.shown === '1'){
        const txt = el.dataset.char || el.textContent.split('\n')[0]
        el.textContent = txt
        el.dataset.shown = '0'
      }
    })
  })

  // Simple quiz logic
  const quizChar = document.getElementById('quizChar')
  const quizInput = document.getElementById('quizInput')
  const quizCheck = document.getElementById('quizCheck')
  const quizResult = document.getElementById('quizResult')

  // mapping for quiz (character -> correct pinyin)
  const quizMap = { '你':'nǐ', '我':'wǒ', '好':'hǎo', '你们':'nǐmen' }
  let quizKeys = Object.keys(quizMap)

  function nextQuiz(){
    const k = quizKeys[Math.floor(Math.random()*quizKeys.length)]
    quizChar.textContent = k
    quizChar.dataset.answer = quizMap[k]
    quizInput.value = ''
    quizResult.textContent = ''
  }
  quizCheck.addEventListener('click', ()=>{
    const ans = quizChar.dataset.answer
    const guess = quizInput.value.trim().toLowerCase()
    if(!guess){ quizResult.textContent = 'Please enter an answer.'; return }
    if(guess === ans.toLowerCase()){
      quizResult.textContent = 'Correct!'
      setTimeout(nextQuiz,700)
    } else {
      quizResult.textContent = `Not quite — correct: ${ans}`
    }
  })
  nextQuiz()
})
