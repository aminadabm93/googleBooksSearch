import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";
import ViewBtn from "../components/ViewBtn";

function Favorites(props) {
  const [books, setBooks] = useState([]);

  // When this component mounts, grab all the books
  // e.g. localhost:3000/books/
  // const {id} = useParams()
  useEffect(() => {
    loadBooks();
  }, [])

  function loadBooks(){
    API.getBooks()
      .then(res => {
        //we need to go through the array of books. and map it to the state
        setBooks(res.data);
        console.log("This is the favorites data "+ JSON.stringify(res.data));
      })
      .catch(err => console.log(err));
  }
  function deleteBook(bookID) {
    API.deleteBook(bookID)      
      .catch(err => console.log(err))
      .then(loadBooks());
    ;
  }
  return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Favorite Books
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book._id}>                    
                    <strong>
                      {book.title} by {book.author}
                    </strong>
                    <Link to={book.url}>
                      <ViewBtn/>
                    </Link>      
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                    <Row>
                      <Col size="md-2">
                      <img src={book.image}/>
                      </Col>  
                      <Col size="md-10">
                        <p>{book.description}</p>
                      </Col>                     
                    </Row>
                    
                  </ListItem>
                  
                ))}
              </List>
            ) : (
            <h3>No Results to Display</h3>
            )}    
      </Container>
    );
  }


export default Favorites;
