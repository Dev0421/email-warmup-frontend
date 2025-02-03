import React, { useRef } from 'react';
import ColorfulButton from '../components/Buttons/ColorfulButton';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import './Prestart.css'; // Make sure to create this file for custom styles

function Prestart() {
  const gradientBackground = {
    background: 'linear-gradient(45deg, rgb(254 255 165) 30%, rgb(163 173 255) 90%)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const nodeRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    nodeRef.current.classList.add('fade-out');
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames="fade"
      nodeRef={nodeRef}
    >
      <div style={gradientBackground} ref={nodeRef}>
        <ColorfulButton onClick={handleClick} size="large"> WARM </ColorfulButton>
      </div>
    </CSSTransition>
  );
}

export default Prestart;