import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

class Portal extends PureComponent {
    portalElement = null;

    componentDidMount() {
        if (!this.portalElement) {
            this.portalElement = document.createElement('div');
            this.portalElement.setAttribute('data-reactportal', '');
            document.body.appendChild(this.portalElement);
        }
        this.componentDidUpdate();
    }
    componentWillUnmount() {
        if (this.portalElement) {
            ReactDOM.unmountComponentAtNode(this.portalElement);
            document.body.removeChild(this.portalElement);
            this.portalElement = null;
        }
    }
    componentDidUpdate() {
        ReactDOM.render(
            <div {...this.props} />,
            this.portalElement
        );
    }
    render() {
        return null;
    }
}

export default Portal;
