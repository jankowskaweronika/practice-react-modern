import React from 'react';
import PropTypes from 'prop-types';
import Div from './Div';

const Box = props => {
    const { text } = props;

    const Box = () => {
        return <Div />;
    };
}
Box.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Box;
