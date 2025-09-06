import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const Bookcard = (props) => {
  const navigate  = useNavigate();

  return (
    <div>
      <Card style={{ width: '18rem', height: '33rem', margin: '5px' }}>
        <Card.Img variant="top" src={props.imageurl} style={{ height: '250px' }} />
        <Card.Body style={{ position: 'relative' }}>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            This book has a title {props.name} and owner is {props.Owner}. Its price is Rs.{props.price}.
          </Card.Text>
          <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            <Button onClick={ (e)=> navigate(`/book/view/${props.id}`)} variant="primary">{props.view}</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Bookcard;
