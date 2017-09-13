import 'trendmicro-ui/dist/css/trendmicro-ui.css';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import { Button } from '@trendmicro/react-buttons';
import styled from 'styled-components';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import Portal from '../src';

const StyledPortal = styled(Portal)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: #fff;
    background-color: rgba(0, 0, 0, .7);
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

    render() {
        const name = 'React Portal';
        const url = 'https://github.com/trendmicro-frontend/react-portal';
        const { open } = this.state;

        return (
            <div>
                <Navbar name={name} url={url} />
                <div className="container-fluid" style={{ marginTop: 10 }}>
                    {!open &&
                    <Button onClick={this.openModal}>Open Modal</Button>
                    }
                    {open &&
                    <StyledPortal>
                        <VerticallyCenter>
                            <Modal>
                                <VerticallyCenter>
                                    <h1>Modal Content</h1>
                                    <br />
                                    <div style={{ textAlign: 'center' }}>
                                        <Button onClick={this.closeModal}>Close Modal</Button>
                                    </div>
                                </VerticallyCenter>
                            </Modal>
                        </VerticallyCenter>
                    </StyledPortal>
                    }
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('container')
);
