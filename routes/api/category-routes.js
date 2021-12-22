const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// BREAD
//make sure they are async
router.get('/', async (req, res) => {
  try{
    // this will include the extra data you want to send
    const categoryData = await Category.findAll({
      include: [{ model: Product}]
    })
    res.status(200).json(categoryData);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock']}]
    })
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
    
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const catData = await Category.update(req.body,
      {
      where: {id: req.params.id}
    })
    const newcatData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    })
    res.status(200).json(newcatData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try{
    const categoryData = await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json(categoryData)
  }
  catch(err) {
    console.log(err);
    res.status(500).json(err)
  }
  // create a new category
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const catData = await Category.destroy({
      where: {
        id: req.params.id
      }
  })
  if (!catData) {
    res.status(404).json({ message: 'No category found with this id!'})
    return;
  }
  res.status(200).json(catData)
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err)}

});

module.exports = router;
