const router = require('express').Router();
const admin = require('../firebaseAdmin');
const db = admin.firestore();

// GET all error codes
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('errors').get();
    const errors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(errors);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET a specific error code by id
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('errors').doc(req.params.id).get();
    if (!doc.exists) {
      res.status(404).send('No such document!');
    } else {
      res.json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
