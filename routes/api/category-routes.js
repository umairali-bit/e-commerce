const router = require('express').Router();
const { Category, Product } = require('../../models');

// `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product],
  }).then(dbCategory => res.json(dbCategory))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product],
  })
    .then(dbCategory => {
      if (!dbCategory) {
        res.status(404).json({ message: 'THERE ARE NO CATEGORIES FOUND WITH THAT ID!' });
        return;
      }
      res.json(dbCategory);
    }).catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  Category.create(req.body)
    .then((dbCategory) => {
      res.status(200).json(dbCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategory) => {
      if (dbCategory) {
        res.status(200).json(dbCategory)
        //{ message: 'CATEGORY UPDATED!' });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Category.destroy ({
    where: {
      id: req.params.id
    }
  })
  .then (dbCategory => {
    if (!dbCategory){
      res.status(404).json({ message: 'THERE ARE NO CATEGORIES FOUND WITH THAT ID!'});
      return;
    }
    res.json(dbCategory);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
