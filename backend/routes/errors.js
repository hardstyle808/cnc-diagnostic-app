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

// POST a new error code
router.post('/', async (req, res) => {
  try {
    const newError = {
      code: req.body.code,
      title: req.body.title,
      category: req.body.category,
      severity: req.body.severity,
      description: req.body.description,
      symptoms: req.body.symptoms,
      causes: req.body.causes,
      quickFix: req.body.quickFix,
      estimatedTime: req.body.estimatedTime,
      difficulty: req.body.difficulty,
      toolsRequired: req.body.toolsRequired,
      partsNeeded: req.body.partsNeeded,
      safetyWarnings: req.body.safetyWarnings,
      steps: req.body.steps,
    };
    const docRef = await db.collection('errors').add(newError);
    res.status(201).json({ id: docRef.id, ...newError });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
