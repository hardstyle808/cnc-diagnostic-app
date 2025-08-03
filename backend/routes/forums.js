const router = require('express').Router();
const admin = require('../firebaseAdmin');
const db = admin.firestore();

// GET all forum posts
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('forums').orderBy('createdAt', 'desc').get();
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST a new forum post
router.post('/', async (req, res) => {
  try {
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      createdAt: new Date(),
    };
    const docRef = await db.collection('forums').add(newPost);
    res.status(201).json({ id: docRef.id, ...newPost });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
