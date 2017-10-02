import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

class Portal extends PureComponent {
    static propTypes = {
        node: PropTypes.any
    };

    portalNode = null;

    componentDidMount() {
        if (!this.props.node && !this.portalNode) {
            this.portalNode = document.createElement('div');
            this.portalNode.setAttribute('data-reactportal', '');
            document.body.appendChild(this.portalNode);
        }
        this.componentDidUpdate();
    }
    componentWillUnmount() {
        if (this.props.node) {
            ReactDOM.unmountComponentAtNode(this.props.node);
        } else if (this.portalNode) {
            ReactDOM.unmountComponentAtNode(this.portalNode);
            document.body.removeChild(this.portalNode);
            this.portalNode = null;
        }
    }
    componentDidUpdate() {
        ReactDOM.render(
            <div {...this.props} />,
            this.props.node || this.portalNode
        );
    }
    render() {
        return null;
    }
}

export default Portal;
