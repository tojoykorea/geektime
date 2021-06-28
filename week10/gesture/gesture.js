// const element = document.documentElement;
// element.addEventListener('contextmenu', (e) => e.preventDefault());






// let startX, startY;
// let handle;
// let isPan = false, isPress = false, isTap = true;



export class Listener {
    constructor(recognizer, element) {
        let contexts = new Map();
        let isListeningMouse = false;
        element.addEventListener('mousedown', (e) => {
            const context = Object.create(null);
            contexts.set('mouse' + (1 << e.button), context);
            recognizer.start(e, context);
            // console.log((1 << e.button))
        
            const mousemove = (e) => {
                let button = 1;
                while(button <= e.buttons) {
                    if(button & e.buttons) {
                        let key;
                        if(button === 2)
                            key = 4;
                        else if(button === 4)
                            key = 2;
                        else 
                            key = button;
        
                        const context = contexts.get('mouse' + key);
                        recognizer.move(e, context);
                    }
                    button = button << 1;
                }
            }
        
            const up = (e) => {
                
                // console.log('up', e.clientX, e.clientY);
                const context = contexts.get('mouse' + (1 << e.button));
                recognizer.end(e, context);
                contexts.delete('mouse' + (1 << e.button));
                if(e.buttons === 0) {
                    document.removeEventListener('mousemove', mousemove);
                    document.removeEventListener('mouseup', up);
                    isListeningMouse = false;
                }
               
            }
        
        
            if(!isListeningMouse) {
                document.addEventListener('mousemove', mousemove);
                document.addEventListener('mouseup', up);
                isListeningMouse = true;
            }
           
        })
        
        
        element.addEventListener('touchstart', (e) => {
            for(let tauch of e.targetTouches) {
                const context = Object.create(null);
                contexts.set(tauch.identifier, context);
                recognizer.start(tauch, context);
                // console.log('touchstart', tauch.clientX, tauch.clientY);
            }
        });
        
        element.addEventListener('touchmove', (e) => {
            for(let tauch of e.targetTouches) {
                const context = contexts.get(tauch.identifier);
                recognizer.move(tauch, context);
                // console.log('touchmove', tauch.clientX, tauch.clientY);
            }
        });
        
        element.addEventListener('touchend', (e) => {
            // 取end事件
            for(let tauch of e.changedTouches) {
                const context = contexts.get(tauch.identifier);
                recognizer.end(tauch, context);
                contexts.delete(tauch.identifier);
                //console.log('touchcancel', tauch.clientX, tauch.clientY);
            }
        });
        
        element.addEventListener('touchcancel', (e) => {
            // 取touchcancel事件
            for(let tauch of e.changedTouches) {
                const context = contexts.get(tauch.identifier);
                recognizer.cancel(tauch, context);
                constexts.delete(tauch.identifier);
                //console.log('touchcancel', tauch.clientX, tauch.clientY);
            }
        });
    }
}

export class Recognizer {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }
    start(point, context) {
        context.startX = point.clientX, context.startY = point.clientY;

        this.dispatcher.dispatch('start', {
            clientX: point.clientX,
            clientY: point.clientY,
        })
        context.isPan = false;
        context.isTap = true;
        context.isPress = false;
        context.points = [
            {
                t: Date.now(),
                x: point.clientX,
                y: point.clientY
            }
        ]
    
        context.handle = setTimeout(() => {
            context.isPan = false;
            context.isTap = false;
            context.isPress = true;
            context.handle = null;
            this.dispatcher.dispatch('press', {
            })
        }, 500);
    
        // console.log('start', point.clientX, point.clientY)
    }

    move(point, context) {
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
    
        if(!context.isPan && dx ** 2 + dy ** 2 > 100) {
            context.isPan = true;
            context.isTap = false;
            context.isPress = false;
            context.isVertical = Math.abs(dx) < Math.abs(dy);
            clearTimeout(context.handle);
            // handle = null
        }
        if(context.isPan) {
            this.dispatcher.dispatch('pan', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical
            })
        }
        context.points = context.points.filter(point => Date.now() - point.t < 500);
        context.points.push({
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        });
       // console.log('move', point.clientX, point.clientY)
    }

    end(point, context) {
        if(context.isTap) {
           // console.log('tapEnd');
           this.dispatcher.dispatch('tap', {});
            clearTimeout(context.handle);
        }
        if(context.isPress) {
            this.dispatcher.dispatch('pressend', {});
        }
       
        // 计算速度和距离
        context.points = context.points.filter(point => Date.now() - point.t < 500);
        let d, v;
        if(context.points.length) {
            d = Math.sqrt((point.clientX - context.points[0].x) ** 2 +
                (point.clientY - context.points[0].y) ** 2
             );
            v = d / (Date.now() - context.points[0].t);
        } else {
            v = 0;
        }
    
        if(v > 1.5) {
            this.dispatcher.dispatch('flick', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: d,
                isFlick: context.isFlick
            });
            context.isFlick = true;
        } else {
            context.isFlick = false;
        }

        if(context.isPan) {
            this.dispatcher.dispatch('panend', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: v,
                isFlick: context.isFlick
            });
        }
        this.dispatcher.dispatch('end', {
            startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: v,
                isFlick: context.isFlick
        });
       // console.log('end', point.clientX, point.clientY)
    }

    cancel(point, context) {
        clearTimeout(context.handle);
        this.dispatcher.dispatch('cansel', {});
    }
    
   
}
export class Dispatcher {
    constructor(element) {
        this.element = element;
    }  
    dispatch(type, properties) {
        const event = new Event(type);
        for(let name in properties) {
           event[name] = properties[name];
        }
        this.element.dispatchEvent(event);
    } 
}

export function enableGesture(element) {
    new Listener(new Recognizer(new Dispatcher(element)), element);
}
