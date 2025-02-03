import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ size }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 50,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: size === 'large' ? 144 : size === 'medium' ? 96 : 48,
  padding: size === 'large' ? '0 90px' : size === 'medium' ? '0 60px' : '0 30px',
  fontSize: size === 'large' ? '2rem' : size === 'medium' ? '1.5rem' : '1rem',
  '&:hover': {
    boxShadow: '0 0 10px 5px rgba(255, 105, 135, .5)',
  },
  '&:active': {
    boxShadow: '0 0 20px 10px rgba(255, 105, 135, .7)',
  },
}));

const ColorfulButton = ({ onClick, size, children }) => {
  return <StyledButton onClick={onClick} size={size}>{children}</StyledButton>;
};

ColorfulButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  children: PropTypes.node.isRequired,
};

ColorfulButton.defaultProps = {
  size: 'large',
};

export default ColorfulButton;