import {TimeLine, Animation} from './animation.js';
import {ease, easeIn} from './ease.js';




const tl = new TimeLine();
tl.start();

tl.add(new Animation(document.getElementById('el').style, 'transform', 0, 500, 3000, 0, easeIn, (v) => `translateX(${v}px)`));

document.getElementById('el2').style.transition = 'transform 2s ease-in';
document.getElementById('el2').style.transform = 'translateX(500px)';


document.getElementById('pause').addEventListener('click', function() {
    tl.pause();
})
document.getElementById('resume').addEventListener('click', function() {
    tl.resume();
})
document.getElementById('reset').addEventListener('click', function() {
    tl.reset();
})