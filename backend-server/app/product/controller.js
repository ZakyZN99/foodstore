const path = require('path');
const fs = require('fs');
const config = require('../config');
const Product = require('./model');
const Category = require('../category/model');
const Tag = require('../tag/model');
const { ObjectId } = require('mongoose').Types;

const store = async(req, res, next) => {
    try{
        let payload = req.body;

        if(payload.category){
            let category = 
                await Category.findOne({
                    name: {$regex: payload.category, $options: 'i'}});
                    if(category){
                        payload = {...payload, category: category._id};
                    }else{
                        delete payload.category;
                    }
        }
        
        if (payload.tags && Array.isArray(payload.tags) && payload.tags.length > 0) {
            let tagIds = [];
            for (const tagName of payload.tags) {
              let tag = await Tag.findOne({ name: tagName });
              if (tag) {
                tagIds.push(tag._id);
              }
            }
            if (tagIds.length > 0) {
              payload.tags = tagIds; // Assign the array of ObjectIds to payload.tags
            } else {
              delete payload.tags; // Remove tags field if no valid tags found
            }
          }
        


        if(req.file){
            let tmpPath = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let fileName = req.file.filename + '.' + originalExt;
            let targetPath = path.resolve(config.rootPath, `public/images/product/${fileName}`);

            const src = fs.createReadStream(tmpPath);
            const dest = fs.createWriteStream(targetPath);
            src.pipe(dest);

            src.on('end', async () => {
                try{
                    let product = new Product({...payload, image_url: fileName})
                    await product.save();
                    return res.json(product);
                }catch(err){
                    fs.unlinkSync(targetPath);
                    if(err && err.name === 'Validation Error'){
                        return res.json({
                            error: 1,
                            message: err.message,
                            fields: err.errors
                        })
                    }
                    next(err);
                }
            });
            src.on('error', async() => {
                next(err);
            })
        }else{
            let product = new Product(payload);
            await product.save();
            return res.json(product);
        }
    }catch(err){
        if(err && err.name === 'Validation Error'){
            return res.json({
                error:1,
                message: err.message,
                fields: err.errors
                })
            }
        next(err);
    }
}

const update = async(req, res, next) => {
    try{
        let payload = req.body;
        let {id} = req.params
        
        // Update karna ada relasi dengan category
        if(payload.category){
            let category = 
                await Category.findOne({
                    name: {$regex: payload.category, $options: 'i'}});
                    if(category){
                        payload = {...payload, category: category._id};
                    }else{
                        delete payload.category;
                    }
        }

        // Update karna ada relasi dengan tags
        if(payload.tags && payload.tags.length > 0){
            let tags = 
                await Tag.find({
                    name: {$in: payload.tags}});
                    if(tags.length){
                        payload = {...payload, tags: tags.map(tag => tag._id)};
                    }else{
                        delete payload.tags;
                    }
        }        
        
        console.log(payload)
        if(req.file){
            let tmpPath = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let fileName = req.file.filename + '.' + originalExt;
            let targetPath = path.resolve(config.rootPath, `public/images/product/${fileName}`);

            const src = fs.createReadStream(tmpPath);
            const dest = fs.createWriteStream(targetPath);
            src.pipe(dest);

            src.on('end', async () => {
                try{
                    let product = await Product.findById(id);
                    let currentImg = `${config.rootPath}/public/images/product/${product.image_url}`;
                    if(fs.existsSync(currentImg)){
                        fs.unlinkSync(currentImg);
                    }
                    payload.image_url = fileName;
                    product = await Product.findByIdAndUpdate(id, payload,{
                        new: true,
                        runValidators: true    
                            })
                    return res.json(product);
                }catch(err){
                    fs.unlinkSync(targetPath);
                    if(err && err.name == 'Validation Error'){
                        return res.json({
                            error: 1,
                            message: err.message,
                            fields: err.errors
                        })
                    }
                    next(err);
                }
            });
            src.on('error', async() => {
                next(err);
            })
        }else{
            let product =  await Product.findByIdAndUpdate(id, payload,{
                new: true,
                runValidators: true    
                    })
            return res.json(product);
        }
    }catch(err){
        if(err && err.name === 'Validation Error'){
            return res.json({
                error:1,
                message: err.message,
                fields: err.fields
                })
            }
        next(err);
    }
}

const destroy = async (req, res, next) => {
    try {
        let product = await Product.findOneAndDelete({_id: req.params.id});
        let currentImg = `${config.rootPath}/public/images/product/${product.image_url}`;

        if(fs.existsSync(currentImg)){
            fs.unlinkSync(currentImg);
        }
        return res.json(product)

    } catch (err) {
        next(err)
    }
}

const index = async(req, res, next) => {
    try {
        let{skip=0, q= '', category='', tags=[], search} = req.query;

        let criteria = {};
        if(q.length){
            criteria = {
                ...criteria,
                name: {$regex: `${q}`, $options: 'i'}
            }
        }
        
        if(category.length){
            let categoryResult = await Category.findOne({name: {$regex: `${category}`, $options: 'i'}})

            if(categoryResult){
                criteria = {
                    ...criteria, category: categoryResult._id
                }
            }
        }

        if(tags.length){
            let tagResult = await Tag.find({name: {$in: tags}})

            if(tagResult){
                criteria = {
                    ...criteria, tags: {$in: tagResult.map(tag => tag._id)}
                }
            }
        }
        if(search){
            criteria = {
                ...criteria,
                name: { $regex: new RegExp(search, 'i') },
        }}

        let count  = await Product.find().countDocuments();
        let product = await Product.find(criteria)
        .skip(parseInt(skip))
        .populate('category')
        .populate('tags')
        return res.json({
            data: product,
            count
        });
    } catch (err) {
        next(err)
    }
}

const search = async (req, res, next) => {
try {
    const searchTerm = req.query.search;
    let products;
    if (searchTerm) {
        products = await Product.find({
            name: { $regex: searchTerm, $options: "i" }
        });
    } else {
        products = await Product.find();
    }
    return res.json(products);
} catch (err) {
    next(err);
}
};

module.exports = {
    store,
    index,
    update,
    destroy,
    search
}