import React, { useState, useEffect } from "react";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  // useEffect(() => {
  //   loadBooks()
  // }, [])

  // Loads all books and sets them to books
  function loadBooks(res) {
    //we don't need to read from database we just need to update the list with
    // the response's info. title. name. etc 
    // need to pass this 
    setBooks(res);
    // API.getBooks()
    //   .then(res => 
    //     setBooks(res.data)
    //   )
    //   .catch(err => console.log(err));
  };

  // Saves a book from the api res with a given id
  function saveBook(id) {
    API.saveBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.search) {
      API.searchBooks(formObject.search)
        .then(res => {
          console.log(res.data);
          loadBooks(res.data.items);}
          )
        .catch(err => console.log(err));
    }
  };

    return (
    <Container fluid>
      <Row>
        <Col size="md-12">   
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1>Search for books!</h1>
              </Jumbotron>
              <form>
                <Input
                  onChange={handleInputChange}
                  name="search"
                  placeholder="Search by anything! (required)"
                />
                <FormBtn disabled={!(formObject.search)} onClick={handleFormSubmit}>
                  Search
                </FormBtn>
              </form>    
            </Col>
          </Row> 
          <Jumbotron>
            <h1>Results</h1>
          </Jumbotron>
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book.id}>
                    <Link to={"/books/" + book.id}>
                      <strong>
                        {book.volumeInfo.title} by {book.volumeInfo.authors}
                      </strong>
                    </Link>
                    <SaveBtn onClick={() => saveBook(book.id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
            <h3>No Results to Display</h3>
            )}
        </Col>    
      </Row>                                                                   
    </Container>
    );
  }


export default Books;
