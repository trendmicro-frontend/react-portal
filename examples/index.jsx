import 'trendmicro-ui/dist/css/trendmicro-ui.css';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import { Button } from '@trendmicro/react-buttons';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Section from './Section';
import Fade from './Fade';
import Navbar from './Navbar';
import Portal from '../src';

const Overlay = styled.div`
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
        modal1: false,
        modal2: false
    };

    render() {
        const name = 'React Portal';
        const url = 'https://github.com/trendmicro-frontend/react-portal';

        return (
            <div>
                <Navbar name={name} url={url} />
                <div className="container-fluid" style={{ marginTop: 10 }}>
                    <div className="row">
                        <div className="col-md-6">
                            <Section className="row-md-5">
                                <h2>Modal Window</h2>
                                <Button
                                    onClick={() => {
                                        this.setState({ modal1: true, modal2: false });
                                    }}
                                >
                                    Open
                                </Button>
                                {this.state.modal1 &&
                                <Portal>
                                    <Overlay>
                                        <VerticallyCenter>
                                            <Fade timeout={150}>
                                                <Modal>
                                                    <VerticallyCenter>
                                                        <h1>Modal #1</h1>
                                                        <br />
                                                        <div style={{ textAlign: 'center' }}>
                                                            <Button
                                                                onClick={() => {
                                                                    this.setState({
                                                                        modal1: false,
                                                                        modal2: true
                                                                    });
                                                                }}
                                                            >
                                                                Close Modal
                                                            </Button>
                                                        </div>
                                                    </VerticallyCenter>
                                                </Modal>
                                            </Fade>
                                        </VerticallyCenter>
                                    </Overlay>
                                </Portal>
                                }
                                {this.state.modal2 &&
                                <Portal>
                                    <Overlay>
                                        <VerticallyCenter>
                                            <Fade timeout={150}>
                                                <Modal>
                                                    <VerticallyCenter>
                                                        <h1>Modal #2</h1>
                                                        <br />
                                                        <div style={{ textAlign: 'center' }}>
                                                            <Button
                                                                onClick={() => {
                                                                    this.setState({
                                                                        modal1: false,
                                                                        modal2: false
                                                                    });
                                                                }}
                                                            >
                                                                Close Modal
                                                            </Button>
                                                        </div>
                                                    </VerticallyCenter>
                                                </Modal>
                                            </Fade>
                                        </VerticallyCenter>
                                    </Overlay>
                                </Portal>
                                }
                            </Section>
                        </div>
                        <div className="col-md-6">
                            <Section className="row-md-5">
                                <h2>Fullscreen Modal From Within an Iframe</h2>
                                <p>Parent Window</p>
                                <iframe
                                    style={{
                                        border: '1px dashed #ccc'
                                    }}
                                    src="iframe.html"
                                    title="iframe"
                                />
                            </Section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
