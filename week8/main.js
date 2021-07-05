import {Component, createElement} from './framework.js';


class Carousel extends Component {
    constructor() {
        super();
        this.attributes = Object.create(null);
    }
    render() {
        this.root = document.createElement('div');
        console.log(this.attributes.src)
        for(let src of this.attributes.src) {
            const div = document.createElement('div');
            div.style.backgroundImage = `url(${src})`;
            div.classList.add('children')
            this.root.appendChild(div);
        }
        let children = this.root.children;
        let position = 0;
        this.root.addEventListener('mousedown', function (e){
            let startX = e.clientX;
            const move = (e) => {
                let x = e.clientX - startX;
                let current = position - ((x - x % 890) / 890);
                for(let offset of [-1, 0, 1]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;

                    children[pos].style.transition = 'none';
                    children[pos].style.transform = `translateX(${-pos * 890 + offset * 890 + x % 890}px)`;
                }
            }
            const up = (e) => {
                let x = e.clientX - startX;
                position = position - Math.round(x / 890);
                for(let offset of [0, - Math.sign(Math.round(x / 890) - x + 435 * Math.sign(x))]) {
                    let pos = position + offset;
                    pos = (pos + children.length) % children.length;

                    children[pos].style.transition = '';
                    children[pos].style.transform = `translateX(${-pos * 890 + offset * 890}px)`;
                }
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
            }
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
            e.preventDefault();
        })
        

        // let children = this.root.children;
        // let currentIndex = 0;
        // setInterval(() => {
        //     let nextIndex = (currentIndex + 1) % children.length;
        //     let nextNode = children[nextIndex];
        //     let currentNode = children[currentIndex];
        //     nextNode.style.transition = 'none';
        //     nextNode.style.transform = `translateX(${100 - nextIndex * 100}%)`;

        //     setTimeout(() => {
        //         currentNode.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
        //         nextNode.style.transition = '';
        //         // debugger
        //         nextNode.style.transform = `translateX(-${ nextIndex * 100}%)`;
        //         currentIndex = nextIndex;
        //     }, 16);
            
        // }, 2000);



    //     const move = (e) => {
    //         let x  = e.clientX - startX;
    //         for(let child of children) {
    //             child.style.transition = 'none';
    //             child.style.transform = `translateX(${ -position * 890 + x}px)`;
    //         }
    //         console.log(position);
    //     }
    //     const up = (e) => {
    //         let x  = e.clientX - startX;
    //         console.log('mouseUp', position);
    //         position = position - Math.round(x / 890);
    //         for(let child of children) {
    //             child.style.transition = '';
    //             child.style.transform = `translateX(${-position * 890}px)`;
    //         }
    //         document.removeEventListener('mousemove', move);
    //         document.removeEventListener('mouseup', up);
    //     }
    //     document.addEventListener('mousemove', move)
    //     document.addEventListener('mouseup', up)
        return this.root;
    }


    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    mountTo(parentElement) {
        parentElement.appendChild(this.render());
    }
}



let d = [
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
]

let a = <Carousel src={d} />
// document.body.appendChild(a);
a.mountTo(document.getElementById('root'))




