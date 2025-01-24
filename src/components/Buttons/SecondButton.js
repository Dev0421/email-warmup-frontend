import React from 'react';
import { Button } from '@mui/material';

function SecondButton({ onClick, children }) {
  return (
    <Button 
      variant="outlined" 
      color="error"
      onClick={onClick}
    >
      {children} {/* Render the text passed as children */}
    </Button>
  );
}

export default SecondButton;