const Category = require("../models/categories.model");

function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim whitespace
    str = str.toLowerCase(); // convert to lowercase
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid characters
             .replace(/\s+/g, '-') // replace spaces with dashes
             .replace(/-+/g, '-'); // collapse multiple dashes
    return str;
  }

  const categories = [
    {
        title: "Real Estate",
        slug: "real-estate",
        isAdminAllowed: false,
    },
    {
        title: "Cars",
        slug: "cars",
        isAdminAllowed: false,
    },
    {
        title: "Collectibles",
        slug:"collectibles",
        isAdminAllowed: true,
    }
  ]

  const addAllCategories = async (req, res)=>{
    try{
        for(var i = 0; i < categories.length; i++){
            const content = categories[i]
            content.slug = slugify(content.title);
            const newCategory = new Category(content)
            let category = await newCategory.save()
            console.log(category)
        }
        res.json("Done")
    }
    catch(err){
        res.json(err)
    }
        
  }

const addCategory = async (req, res)=>{
    const content = req.body;
    content.slug = slugify(content.title);
    const newCategory = new Category(content)
    await newCategory.save()
    .then(resp => res.json({message: "Successful"}))
    .catch(err => res.json(err))
}

const getById = async (req, res)=>{
    const {id} = req.params
    await Category.findById(id)
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
}

const editCategory = async (req, res)=>{
    const content = req.body;
    const id = req.params.id;
    await Category.findOneAndUpdate(id, content, {new: true})
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
}

const getAll = async (req, res)=>{
    const user = req.user;
    if(!user.isAdmin){
        await Category.find({isAdminAllowed: false})
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
    }
    else{
        await Category.find()
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
    }
    
}

const deleteCategory = async (req, res)=>{
    const id = req.params.id;
    await Category.findByIdAndDelete(id)
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
}

module.exports = {
    addCategory, editCategory, getAll, deleteCategory, getById, addAllCategories
}