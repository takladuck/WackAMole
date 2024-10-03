const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')]
let score = 0;
let miss_count = 0;
const scoreEl = document.querySelector('.score span');
const sound = new Audio('Assets/smash.mp3');

function run(){
    console.log(miss_count);
    if (miss_count > 3) {
        alert('Game Over! Your score is: ' + score);
        score = 0;
        scoreEl.textContent = score;
        miss_count = 0;
    }
    let timer = null
    
    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];

    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'Assets/mole.png';

    img.addEventListener('click', () => {
        sound.play();
        miss_count = 0;
        score++;
        scoreEl.textContent = score;
        img.src='Assets/mole-whacked.png';
        clearTimeout(timer);
        setTimeout(() => {
            hole.removeChild(img);
            run();
        }, 300);
    });

    hole.appendChild(img);

    timer = setTimeout(() => {
        hole.removeChild(img);
        miss_count++;
        run();
    }, 900);
}
run();
window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});
window.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});