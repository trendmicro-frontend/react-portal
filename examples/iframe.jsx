import 'trendmicro-ui/dist/css/trendmicro-ui.css';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import { Button } from '@trendmicro/react-buttons';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Fade from './Fade';
import Portal from '../src';

const StyledPortal = styled(Portal)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: #fff;
    background-color: rgba(0, 0, 0, .7);
    z-index: 1000;
`;

const VerticallyCenter = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Modal = styled.div`
    background-color: #fff;
    min-width: 360px;
    min-height: 240px;
`;

class App extends PureComponent {
    state = {
        open: false
    };

    openModal = () => {
        this.setState({ open: true });
    };
    closeModal = () => {
        this.setState({ open: false });
    };

    persistStyles = () => {
        const parent = window.top;
        if (parent === window) {
            return;
        }

        const parentDocument = parent.document;
        const parentHead = parentDocument.getElementsByTagName('head')[0];

        const parentStyles = Array.prototype.slice.call(parentDocument.getElementsByTagName('style') || []);
        parentStyles.forEach(style => {
            if (style.getAttribute('data-cloned')) {
                style.parentNode.removeChild(style);
            }
        });

        const now = Date.now();
        const styles = document.getElementsByTagName('style');
        for (let i = 0; i < styles.length; ++i) {
            const style = styles[i].cloneNode(true);
            style.setAttribute('data-cloned', true);
            style.setAttribute('data-ctime', now);
            parentHead.appendChild(style);
        }
    };

    componentDidMount() {
        this.persistStyles();

        const target = document.head;
        const config = {
            attributes: true,
            attributeOldValue: false,
            characterData: true,
            characterDataOldValue: false,
            childList: true,
            subtree: true
        };
        this.observer = new MutationObserver(mutations => {
            this.persistStyles();
        });
        this.observer.observe(target, config);
    }
    render() {
        const { open } = this.state;

        return (
            <div style={{ margin: '12px 16px' }}>
                <p>Iframe</p>
                {!open &&
                <Button onClick={this.openModal}>Open</Button>
                }
                {open &&
                <StyledPortal
                    node={window.top.document && window.top.document.querySelector('#modal-container')}
                >
                    <VerticallyCenter>
                        <Fade timeout={150}>
                            <Modal>
                                <VerticallyCenter>
                                    <h1>Modal Content</h1>
                                    <br />
                                    <div style={{ textAlign: 'center' }}>
                                        <Button onClick={this.closeModal}>Close Modal</Button>
                                    </div>
                                </VerticallyCenter>
                            </Modal>
                        </Fade>
                    </VerticallyCenter>
                </StyledPortal>
                }
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
