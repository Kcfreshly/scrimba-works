const revealBtn = document.getElementById('reveal-btn')
const answer = document.getElementById('answer')
const question = document.getElementById('question')

revealBtn.addEventListener('click', function(){
    answer.style.display = 'block'
    question.style.color = 'green'
    question.style.backgroundColor = '#68e1fd'
    revealBtn.style.display = 'none'
});

