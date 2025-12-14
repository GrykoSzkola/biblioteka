const express = require('express');
const { ObjectId } = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
  const books = await req.app.locals.db.collection('books').find().toArray();
  res.render('books/index', { books });
});

router.get('/books/new', (req, res) => {
  res.render('books/new');
});

router.post('/books', async (req, res) => {
  await req.app.locals.db.collection('books').insertOne(req.body);
  res.redirect('/');
});

router.get('/books/:id', async (req, res) => {
  const book = await req.app.locals.db.collection('books').findOne({
    _id: new ObjectId(req.params.id)
  });
  res.render('books/show', { book });
});

router.get('/books/:id/edit', async (req, res) => {
  const book = await req.app.locals.db.collection('books').findOne({
    _id: new ObjectId(req.params.id)
  });
  res.render('books/edit', { book });
});

router.post('/books/:id/edit', async (req, res) => {
  await req.app.locals.db.collection('books').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.redirect('/');
});

router.post('/books/:id/delete', async (req, res) => {
  await req.app.locals.db.collection('books').deleteOne({
    _id: new ObjectId(req.params.id)
  });
  res.redirect('/');
});

module.exports = router;
