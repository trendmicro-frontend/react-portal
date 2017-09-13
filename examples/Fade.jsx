import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

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

export default Fade;
