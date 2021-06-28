import {Component, createElement, STATE, ATTRIBUTE} from './framework.js';
import {enableGesture} from './gesture/gesture.js';
import {TimeLine, Animation} from './animation.js';
import {ease} from './ease.js';

export {STATE} from './framework.js';
export default class Carousel extends Component {
    constructor() {
        super();
    }
    render() {
        this.root = document.createElement('div');
        for(let data of this[ATTRIBUTE].data) {
            const div = document.createElement('div');
            div.style.backgroundImage = `url(${data.img})`;
            div.classList.add('children')
            this.root.appendChild(div);
        }
        enableGesture(this.root);
        let timeLine = new TimeLine();
        timeLine.start();
        let children = this.root.children;

        this[STATE].position = 0;
        let handler = null;
        let t = 0;
        let ax = 0;

        this.root.addEventListener('start', (event) => {
            timeLine.pause();
            let progress = 0;

            clearInterval(handler);
            progress = (Date.now() - t) / 1500;
            ax = ease(progress) * 890 - 890;

            if(t === 0) {
                ax = 0;
            }
            // debugger
        })
        this.root.addEventListener('tap', () => {
            this.triggerEvent('click', {
                position: this[STATE].position,
                data: this[ATTRIBUTE].data
            });
            console.log('tap')
        })

        this.root.addEventListener('pan', (event) => {
            let x = event.clientX - event.startX - ax;
            let current = this[STATE].position - ((x - x % 890) / 890);

            for(let offset of [-2,-1, 0, 1, 2]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;

                children[pos].style.transition = 'none';
                children[pos].style.transform = `translateX(${-pos * 890 + offset * 890 + x % 890}px)`;
            }
        })
        
        this.root.addEventListener('end', (event) => {
           timeLine.reset();
           timeLine.start();
            handler = setInterval(nextPictrue, 3000);

           
           let x = event.clientX - event.startX - ax;
            let current = this[STATE].position - ((x - x % 890) / 890);
            let direction = Math.round((x % 890) / 890)

            if(event.isFlick) {
            console.log(event.isVertical)
                if(event.isVertical < 0) {
                    direction = Math.ceil((x % 890) / 890)
                } else {
                    direction = Math.floor((x % 890) / 890)
                }
            }
            for(let offset of [-2,-1, 0, 1, 2]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;

                children[pos].style.transition = 'none';    

                timeLine.add(new Animation(children[pos].style, 'transform', 
                -pos * 890 + offset * 890 + x % 890,
                 -pos * 890 + offset * 890 + direction * 890,
                  500, 0, ease, v => `translateX(${v}px)`
                ))
                this[STATE].position = this[STATE].position - ((x - x % 890) / 890) - direction;
                this[STATE].position = (this[STATE].position % children.length + children.length) % children.length;
                this.triggerEvent('change', {position: this[STATE].position});

            }
            ax = 0;
            t = 0;
        })

        const nextPictrue = () => {
            let nextIndex = (this[STATE].position + 1) % children.length;
            let nextNode = children[nextIndex];
            let currentNode = children[this[STATE].position];
            
            t = Date.now();
          
            timeLine.add(new Animation(currentNode.style, 'transform', 
            - this[STATE].position * 890, -890 - this[STATE].position * 890, 500, 0, ease, v => `translateX(${v}px)`
            ))
            timeLine.add(new Animation(nextNode.style, 'transform', 
            890 - nextIndex * 890, - nextIndex * 890, 500, 0, ease, v => `translateX(${v}px)`
            ))
            this[STATE].position = nextIndex;
            this.triggerEvent('change', {position: this[STATE].position});
        }
        handler = setInterval(nextPictrue, 3000);
        return this.root;
    }
   
}