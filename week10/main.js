import Carousel from './Carousel.js';
import {createElement} from './framework.js';
import Button from './Button.js';
import List from './List.js';


let d = [
    {
        img: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
        href: 'www.baidu.com',
        title: '红猫'
    },
    {
        img: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
        href: 'www.baidu.com',
        title: '蓝兔'
    }, {
        img: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
        href: 'www.baidu.com',
        title: '白猫'
    }, {
        img: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
        href: 'www.baidu.com',
        title: '橙猫'
    },
]

// let a = <Carousel data={d} onClick={(event) => window.location.href = event.detail.data[event.detail.position].href} onChange={(event) => console.log(event.detail.position)} />

const a = <List data={d}>
    {(socep) => (
        <div>
            <img src={socep.img} />
            <div>
                <a href={socep.img}>{socep.title}</a>
            </div>
        </div>
    )}
</List>

a.mountTo(document.getElementById('box'))




