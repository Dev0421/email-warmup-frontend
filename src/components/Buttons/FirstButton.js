import React from 'react';
import { Button } from '@mui/material';

function FirstButton({ onClick, children }) {
  return (
    <Button 
      variant="contained" 
      color="success"
      onClick={onClick}
    >
      {children} {/* Render the text passed as children */}
    </Button>
  );
}

export default FirstButton;