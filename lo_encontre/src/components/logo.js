import * as React from 'react';
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";

const Logo = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "../home";
    navigate(path);
  }

  return (
    <Container>
      <Title>
        <Span>Lo</Span> Encontre<Span>.</Span>
        <p className="para">"I Found It!"</p>
        <button className='btn' onClick={routeChange}>Continue as guest &gt;&gt;&gt;</button>
      </Title>
    </Container>
  );
};

// Logo style
const Container = styled.div`
  width: 100vw;
`
const Title = styled.h1`
  font-family: 'Abril Fatface', cursive;
  font-size: 8em;
  text-align: center;
  color: #212121;
  padding: 2%;
`
const Span = styled.span`
  color: #212121;
  font-size: 1em;
  text-shadow: -10px -10px #fff9c4, 10px -10px #f48fb1, -10px 10px #90caf9;
`

export default Logo;