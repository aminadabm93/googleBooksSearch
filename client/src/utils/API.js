import axios from "axios";
const key = process.env.REACT_APP_API_KEY;


//here we will use the google api to update our components.  
//save results as react components that then get sent. 
// might need to make another component (probably alreay made )
//url with a given search GET https://www.googleapis.com/books/v1/volumes?q=flowers&projection=lite&key=yourAPIKey
//url to get id https://www.googleapis.com/books/v1/volumes/volumeId

export default {
  //search for books with search 
  searchBooks: function(query){
    console.log(process.env);
    return axios.get("https://www.googleapis.com/books/v1/volumes?q="+query+"&printType=books&maxResults=10&projection=lite&key="+key)
  },
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  // getBook: function(id) {
  //   return axios.get("/api/books/" + id);
  // },
  
  // Saves a book data to the database
  saveBook: function(bookData) {
    console.log(bookData);
    return axios.post("/api/books", bookData);
  },

  deleteBook: function(bookID) {
    return axios.delete("/api/books/"+bookID);
  }

};
