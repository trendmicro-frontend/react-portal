import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

class Portal extends PureComponent {
    static propTypes = {
        node: PropTypes.any
    };

    defaultNode = null;

    componentDidMount() {
        if (!this.props.node && !this.defaultNode) {
            this.defaultNode = document.createElement('div');
            this.defaultNode.setAttribute('data-reactportal', '');
            document.body.appendChild(this.defaultNode);
        }
        this.componentDidUpdate();
    }
    componentWillUnmount() {
        if (this.props.node) {
            ReactDOM.unmountComponentAtNode(this.props.node);
        } else if (this.defaultNode) {
            ReactDOM.unmountComponentAtNode(this.defaultNode);
            document.body.removeChild(this.defaultNode);
            this.defaultNode = null;
        }
    }
    componentDidUpdate() {
        const props = { ...this.props };
        delete props.node;

        ReactDOM.render(
            <div {...props} />,
            this.props.node || this.defaultNode
        );
    }
    render() {
        return null;
    }
}

export default Portal;
