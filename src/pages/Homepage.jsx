import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/firebase';
import Bookcard from '../components/Bookcard';
import CardGroup from 'react-bootstrap/CardGroup';

const Homepage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listallbooks().then((books) => {
      setBooks(books.docs);
      
    });
  }, [firebase]);
  

  return (
    <div className="mt- 5">
      <CardGroup>
        {books.map((book) => (
          <Bookcard key={book.id} id= {book.id} view="view"  {...book.data()} />
        ))}
      </CardGroup>
    </div>
  );
};

export default Homepage;
