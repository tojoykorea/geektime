import {Component, createElement} from './framework';


export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        this.childContainer = <span />
        this.root = (<div>{this.childContainer}</div>).render();

        return this.root;
    }
    appendChild(child) {
        if(!this.childContainer) {
            this.render();
        }
        this.childContainer.appendChild(child);
    }
}