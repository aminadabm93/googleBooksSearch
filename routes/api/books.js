const router = require("express").Router();
const booksController = require("../../controllers/booksController");
//used for the favorites database

// Matches with "/api/books"
router.route("/")
//retrieves all books from favorites DB
  .get(booksController.findAll)
  //create entry in favorites DB 
  .post(booksController.create);

// Matches with "/api/books/:id"
router.route("/:id")
//we get the VolumeID from the url and save it to the database 
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;
