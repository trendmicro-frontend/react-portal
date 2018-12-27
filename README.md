# react-portal [![build status](https://travis-ci.org/trendmicro-frontend/react-portal.svg?branch=master)](https://travis-ci.org/trendmicro-frontend/react-portal) [![Coverage Status](https://coveralls.io/repos/github/trendmicro-frontend/react-portal/badge.svg?branch=master)](https://coveralls.io/github/trendmicro-frontend/react-portal?branch=master)

[![NPM](https://nodei.co/npm/@trendmicro/react-portal.png?downloads=true&stars=true)](https://nodei.co/npm/@trendmicro/react-portal/)

React Portal

The `portal` approach that transports its child into a new React component and attaches it to <b>document.body</b>. This is useful for modals or popovers.

Demo: https://trendmicro-frontend.github.io/react-portal

## Installation

1. Install the latest version of [react](https://github.com/facebook/react) and [react-portal](https://github.com/trendmicro-frontend/react-portal):

  ```
  npm install --save react @trendmicro/react-portal
  ```

2. Install [react-portal](https://github.com/trendmicro-frontend/react-portal)` with <b>@trendmicro</b> scope:

  ```js
  import Portal from '@trendmicro/react-portal';

  // Use LegacyPortal if you need cross-frame rendering support.
  import LegacyPortal from '@trendmicro/react-portal/LegacyPortal';
  ```

## Usage

### Portal

```jsx
<Portal>
    This text is transported to the end of document.body.
</Portal>

<Portal node={document.body && document.body.querySelector('#modal-container')}>
    This text is transported to a DOM element.
</Portal>
```

### LegacyPortal

```jsx
<LegacyPortal
    node={window.top.document && window.top.document.querySelector('#modal-container')}
>
    This text is transported to a DOM element within the top window document.
</LegacyPortal>
```

## Examples

We recommend using [styled-components](https://github.com/styled-components/styled-components) to make style changes, like so:

```js
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const Overlay = styled.div`
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

const fadeIn = keyframes`
    from {
        transform: scale(.25);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        transform: scale(1);
        opacity: 1;
    }
    to {
        transform: scale(.25);
        opacity: 0;
    }
`;

const Fade = styled.div`
    display: inline-block;
    visibility: ${props => (props.out ? 'hidden' : 'visible')};
    animation: ${props => (props.out ? fadeOut : fadeIn)} ${props => (props.timeout / 1000).toFixed(2)}s linear;
    transition: visibility ${props => (props.timeout / 1000).toFixed(2)}s linear;
`;
Fade.propTypes = {
    out: PropTypes.bool,
    timeout: PropTypes.number
};
Fade.defaultProps = {
    out: false,
    timeout: 150
};
```

Then you can nest components in the following way:

### Center Modal Vertically

```jsx
<Portal>
    <Overlay>
        <VerticallyCenter>
            <Modal>
                Your modal content goes here
            </Modal>
        </VeticallyCenter>
    </Overlay>
</Portal>
```

### Fade-in Animation

```jsx
<Portal>
    <Overlay>
        <VerticallyCenter>
            <Fade timeout={150}>
                <Modal>
                    Your modal content goes here
                </Modal>
            </Fade>
        </VeticallyCenter>
    </Overlay>
</Portal>
```

## Fullscreen Modal From Within an Iframe

#### Transport children to a DOM element within the top window document

```jsx
<LegacyPortal
    node={window.top.document && window.top.document.querySelector('#modal-container')}
>
    <Overlay>
        <Fade timeout={150}>
            <Modal>
                Your modal content goes here
            </Modal>
        </Fade>
    </Overlay>
</LegacyPortal>
```

#### Implement a `persistStyles()` function to synchronize style changes

```js
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
```

#### Use a mutation observer to observe style changes

```js
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
```

See a complete example at https://github.com/trendmicro-frontend/react-portal/blob/master/examples/iframe.jsx


## API

### Properties

#### Portal

Name | Type | Default | Description
:--- | :--- | :------ | :----------
node | DOM node | document.body | A root DOM node to render a React element.

#### LegacyPortal

Name | Type | Default | Description
:--- | :--- | :------ | :----------
node | DOM node | document.body | A root DOM node to render a React element.

## License

MIT
