import React, { useState, useEffect } from "react";
import SaveBtn from "../components/SaveBtn";
import ViewBtn from "../components/ViewBtn";
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

  // Loads all favorite books when called by the favorites component 
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
  function saveBook(book) {
    API.saveBook({title: book.book.volumeInfo.title,
      author: book.book.volumeInfo.authors[0],
      description: book.book.volumeInfo.description,
      image: book.book.volumeInfo.imageLinks.smallThumbnail,
      url: book.book.selfLink})      
      .catch(err => console.log(err));
    alert("You have saved "+book.book.volumeInfo.title);
  }

  function viewBook(url){
    //<Link to={"/books/" + book.id}></Link>
    //link them to the google url 
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
                    <strong>
                      {book.volumeInfo.title} by {book.volumeInfo.authors}
                    </strong>
                    <Link to={"/books/" + book.id}>
                      <ViewBtn onClick = {() => viewBook(book.id)}/>
                    </Link>      
                    <SaveBtn onClick={() => saveBook({book})} />
                    <Row>
                      <Col size="md-2">
                      <img src={book.volumeInfo.imageLinks.smallThumbnail}/>
                      </Col>  
                      <Col size="md-10">
                        <p>{book.volumeInfo.description}</p>
                      </Col>                     
                    </Row>
                    
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
