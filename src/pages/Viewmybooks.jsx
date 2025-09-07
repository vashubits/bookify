import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/firebase';
import CardGroup from 'react-bootstrap/CardGroup';
import Bookcard from '../components/Bookcard';

const Viewmybooks = () => {
  const firebase = useFirebase();
  const [mybook, setmybook] = useState([]);

  useEffect(() => {
    if (firebase.isLogin) {
      firebase.Viewmybooks()
        .then((bookSnapshot) => {
          if (bookSnapshot) {
            setmybook(bookSnapshot.docs);
            bookSnapshot.forEach((doc) => {
              
            });
          } else {
            
          }
        })
        .catch((error) => {
         
        });

    }
   if(mybook) {}
  }, [firebase]);
   
  

  return (
    <div className="mt- 5">
      <CardGroup>
       {mybook.map((book) => {
  return (
    <Bookcard 
      key={book.id} 
      id={`myorders/${book.id}`} 
      view="My Orders" 
      {...book.data()} 
    />
  );
})}

      </CardGroup>
    </div>
  );
};

export default Viewmybooks;
