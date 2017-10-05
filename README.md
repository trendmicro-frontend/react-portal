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
  ```

## Usage

```js
<Portal>
    This text is transported to the end of document.body.
</Portal>

<Portal node={document.body && document.body.querySelector('#modal-container')}>
    This text is transported to a specified element.
</Portal>
```

## Examples

We recommend using [styled-components](https://github.com/styled-components/styled-components) to make style changes, like so:

```js
import Portal from '@trendmicro/react-portal';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { keyframes } from 'styled-components';

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
```js
<StyledPortal>
    <VerticallyCenter>
        <Modal>
            Your modal content goes here
        </Modal>
    </VeticallyCenter>
</StyledPortal>
```

### Fade-in Animation

```js
<StyledPortal>
    <VerticallyCenter>
        <Fade timeout={150}>
            <Modal>
                Your modal content goes here
            </Modal>
        </Fade>
    </VeticallyCenter>
</StyledPortal>
```

## API

### Properties

#### Dropdown

Name | Type | Default | Description
:--- | :--- | :------ | :----------
node | DOM node | document.body | A root DOM node to render a React element.

## License

MIT
