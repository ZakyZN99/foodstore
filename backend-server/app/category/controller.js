const Categories = require('./model');

const store = async(req, res, next) => {
    try {
        let payload = req.body;
        console.log(payload);
        let category = new Categories(payload);
        await category.save();
        return res.json(category);
    } catch (err) {
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err);
    }
}

const update = async (req, res, next) =>{
    try {
        let payload = req.body;
        let {id} = req.params
        console.log(payload);
        let category = await Categories.findByIdAndUpdate(id, payload,{
            new: true,
            runValidators: true
        });
        return res.json(category);
    } catch (err) {
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        let category = await Categories.findByIdAndDelete(req.params.id);
        return res.json(category)
    } catch (err) {
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)
    }
}

const index = async (req, res, next) => {
    try {
        let category = await Categories.find();
        return res.json(category)
    } catch (err) {
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)
    }
}

const search = async (req, res, next) => {
    try {
        let category = await Categories.findOne({_id: req.params.id});
        return res.json(category)
    } catch (err) {
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)
    }
}

module.exports = {
    store,
    index,
    update,
    search,
    destroy
}