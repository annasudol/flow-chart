import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';



export default class Line extends PureComponent {
    componentDidMount() {
        this.within.appendChild(this.el);
    }

    componentWillUnmount() {
        this.within.removeChild(this.el);
    }

    findElement(id) {
      return document.getElementById(id);
    }

    render() {
        const { x0, y0, x1, y1, within="" } = this.props;

    
        this.within = within ? this.findElement(within) : document.body;

        const dy = y1 - y0;
        const dx = x1 - x0;

        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        const length = Math.sqrt(dx * dx + dy * dy);

        const positionStyle = {
            position: 'absolute',
            top: `${y0}px`,
            left: `${x0}px`,
            width: `${length}px`,
            transform: `rotate(${angle}deg)`,
            transformOrigin: '0 0',
        };

        const defaultStyle = {
            borderColor: '#ddd',
            borderTopStyle: 'solid',
            borderTopWidth: '3px',
            zIndex: -1,
        };

        const props = {
            className: this.props.className,
            style: Object.assign({}, defaultStyle, positionStyle),
        }
        return (
                <div>
                    <div
                        ref={(el) => { this.el = el; }}
                        {...props}
                    />
                    </div>
        );
    }
}

Line.propTypes = {
    x0: PropTypes.number.isRequired,
    y0: PropTypes.number.isRequired,
    x1: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    lineTitle: PropTypes.string,
}