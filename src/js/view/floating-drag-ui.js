import UI from 'utils/ui';
import { style } from 'utils/css';

function preventDefault(e) {
    e.preventDefault();
}

export default class FloatingDragUI {
    constructor(element) {
        this.element = element;
    }

    disable() {
        this.ui.destroy();
    }

    enable() {
        let playerLeft;
        let playerTop;
        let innerHeight;
        let innerWidth;
        const auto = 'auto';
        const { element } = this;
        const ui = this.ui = new UI(element)
            .on('dragStart', () => {
                playerLeft = element.offsetLeft;
                playerTop = element.offsetTop;
                innerHeight = window.innerHeight;
                innerWidth = window.innerWidth;
                element.addEventListener('touchmove', preventDefault);
            })
            .on('drag', (e) => {
                let left = Math.max(playerLeft + e.pageX - ui.startX, 0);
                let top = Math.max(playerTop + e.pageY - ui.startY, 0);
                let right = Math.max(innerWidth - (left + element.clientWidth), 0);
                let bottom = Math.max(innerHeight - (top + element.clientHeight), 0);

                if (right === 0) {
                    left = auto;
                } else {
                    right = auto;
                }
                if (top === 0) {
                    bottom = auto;
                } else {
                    top = auto;
                }

                style(element, {
                    left,
                    right,
                    top,
                    bottom,
                    margin: 0
                });
            })
            .on('dragEnd', () => {
                element.removeEventListener('touchmove', preventDefault);
                playerLeft = playerTop = innerWidth = innerHeight = null;
            });
    }
}
