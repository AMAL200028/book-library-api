// src/routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /books - get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// POST /books - add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const book = new Book({ title, author, year });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add book' });
  }
});

// DELETE /books/:id - delete book by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

module.exports = router;
