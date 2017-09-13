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

### Center Modal Vertically

You can use [styled-components](https://github.com/styled-components/styled-components) to make style changes:

```js
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
```

```js
<StyledPortal>
    <VerticallyCenter>
        <Modal>
            Your modal content goes here
        </Modal>
    </VeticallyCenter>
</StyledPortal>
```

## License

MIT
