import { createElement } from "./framework.js";
import Carousel from "./Carousel.js";
import { Timeline, Animation } from "./animation.js";

let imgs = [
  "http://5b0988e595225.cdn.sohucs.com/images/20200319/0cc144e803d045239c1e8540787f3195.png",
  "https://img1.baidu.com/it/u=2420312407,3335904517&fm=26&fmt=auto&gp=0.jpg",
  "https://img2.baidu.com/it/u=207744090,2561906675&fm=26&fmt=auto&gp=0.jpg",
  "https://img0.baidu.com/it/u=3035595938,2953780862&fm=26&fmt=auto&gp=0.jpg",
];

let a = <Carousel src={imgs} />;

a.mountTo(document.body);

let tl = new Timeline();

window.tl = tl;
window.animation = new Animation(
  {
    set a(v) {
      console.log(v);
    },
  },
  "a",
  0,
  100,
  1000,
  null
);

tl.start();
