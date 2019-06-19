import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Line from './Line';


export default class LineTo extends PureComponent {
    componentWillMount() {

        this.t = setTimeout(() => this.forceUpdate(), true);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.from !== this.props.from) {
            this.t = setTimeout(() => this.forceUpdate(), true);
        }
        if (nextProps.to !== this.props.to) {
            this.t = setTimeout(() => this.forceUpdate(), true);
        }
    }

    componentWillUnmount() {
        if (this.t) {
            clearTimeout(this.t);
            this.t = null;
        }
    }



    findElement(id) {

        return document.getElementById(id);
    }

    detect() {
        const { from, to, within = '' } = this.props;
        const a = this.findElement(from);
        const b = this.findElement(to);

        if (!a || !b) {
            return false;
        }


        const box0 = a.getBoundingClientRect();
        const box1 = b.getBoundingClientRect();

        let offsetX = window.pageXOffset;
        let offsetY = window.pageYOffset;

        if (within) {
            const p = this.findElement(within);
            const boxp = p.getBoundingClientRect();

            offsetX -= boxp.left + (window.pageXOffset || document.documentElement.scrollLeft);
            offsetY -= boxp.top + (window.pageYOffset || document.documentElement.scrollTop);
        }

        const x0 = box0.left + box0.width * 0.5 + offsetX;
        const x1 = box1.left + box1.width * 0.5 + offsetX;
        const y0 = box0.top + box0.height * 0.5 + offsetY;
        const y1 = box1.top + box1.height * 0.5 + offsetY;

        return { x0, y0, x1, y1 };
    }

    render() {
    
        const points = this.detect();

        return points ? (
            <Line {...points} {...this.props} />
        ) : null;
    }
}

LineTo.propTypes ={
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    within: PropTypes.string,
    fromAnchor: PropTypes.string,
    toAnchor: PropTypes.string,
    delay: PropTypes.bool,
}
