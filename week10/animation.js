const STICK = Symbol('stick');

const ANIMATION = Symbol('animation');
const STARTTIME= Symbol('start-time');
const TICK_HANDLER = Symbol('tick-handler');

const PAUSE_START = Symbol('pause-start');
const PAUSE_TIME= Symbol('pause-time');


export class TimeLine {
    constructor() {
        this.state = 'inited';
        this[ANIMATION] = new Set();
        this[STARTTIME] = new Map();
    }

    pause() {
        if(this.state !== 'inited')
            return
        this.state = 'paused'
        cancelAnimationFrame(this[TICK_HANDLER]);
        this[PAUSE_START] = Date.now();
    }
    resume() {
        if(this.state !== 'paused')
            return
        this.state = 'inited'
        this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
        this[STICK]();
    }
    reset() {
        this.pause();
        this[ANIMATION] = new Set();
        this[STARTTIME] = new Map();
        this[PAUSE_START] = 0;
        this[PAUSE_TIME] = 0;
        this[TICK_HANDLER] = null;
        this.state = 'inited'
    }
    
    start() {   
        let startTime = Date.now();
        this[PAUSE_TIME] = 0;
        this[STICK] = () => {
            let now = Date.now();
            for(let animation of this[ANIMATION]) {
                let t;
                if(this[STARTTIME].get(animation) < startTime) {
                    t = now - startTime - this[PAUSE_TIME] - animation.delay;
                }else {
                    t = now - this[STARTTIME].get(animation) - this[PAUSE_TIME] - animation.delay;
                }

                if(animation.duration < t) {
                    // t0 = animation.duration;
                    this[ANIMATION].delete(animation);
                    t = animation.duration 
                }
                // t要大于零才开始
                if(t > 0) {
                    animation.receive(t);
                }
            }
            this[TICK_HANDLER] = requestAnimationFrame(this[STICK]);
        }
        this[STICK]();
    }
    add(animation, startTime) {
        if(arguments.length < 2) {
            startTime = Date.now();
        }
        this[ANIMATION].add(animation);
        this[STARTTIME].set(animation, startTime);
    }
}

export class Animation {
    constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
        timingFunction = timingFunction || (v => v);
        template = template || (v => v);
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction;
        this.template = template;
    }
    receive(time) {
        let range = (this.endValue - this.startValue);
        let progress = this.timingFunction(time / this.duration);
        this.object[this.property] = this.template(this.startValue + range * progress);
    }
}