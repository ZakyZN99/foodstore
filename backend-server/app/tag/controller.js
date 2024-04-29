const Tag = require('./model');

const store = async(req, res, next) => {
    try {
        let payload = req.body;
        console.log(payload);
        let tag = new Tag(payload);
        await tag.save();
        return res.json(tag);
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
        let tag = await Tag.findByIdAndUpdate(id, payload,{
            new: true,
            runValidators: true
        });
        return res.json(tag);
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
        let tag = await Tag.findByIdAndDelete(req.params.id);
        return res.json(tag)
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
        let tag = await Tag.find();
        return res.json(tag)
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
        let tag = await Tag.findOne({_id: req.params.id});
        return res.json(tag)
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