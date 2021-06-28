import { Component, createElement, ATTRIBUTE } from './framework';


export default class List extends Component {
    render() {
        this.children = this[ATTRIBUTE].data.map(this.template);
        this.root = (<div>{this.children}</div>).render();
        return this.root;
    }
   
    appendChild(child) {
        this.template = (child);
    }
}