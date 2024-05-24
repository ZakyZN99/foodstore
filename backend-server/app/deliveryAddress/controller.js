const { policyFor } = require('../../utils');
const DeliveryAddress = require('./model')
const{subject} = require('@casl/ability')

const store = async (req, res, next) => {
    try {
        let payload = req.body;
        let user = req.user;

        let address = new DeliveryAddress({...payload, user: user._id});
        await address.save();

        return res.json(address);
    } catch (err) {
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

const update = async (req, res, next) => {
let policy  = policyFor(req.user);
    try {
        let{_id, ...payload} = req.body
        let{id} = req.params;
        let address = await DeliveryAddress.findById(id);
        let subjectAddress = subject('DeliveryAddress', {...address, user_id: address.user});
        let policy = policyFor(req.user);
        if(!policy.can('update', subjectAddress)){
            return res.json({
                error: 1,
                message: `You're not Allowed to modify this resource`
            });
        }
        address = await DeliveryAddress.findByIdAndUpdate(id, payload, {
            new: true
        })
        res.json(address)
    } catch (err) {
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
const destroy = async(req, res, next) => {
    try {
        let{id} = req.params;
        let address = await DeliveryAddress.findById(id);
        let subjectAddress = subject('DeliveryAddress', {...address, user_id: address.user});
        let policy = policyFor(req.user)
        if(!policy.can('update', subjectAddress)){
            return res.json({
                error: 1,
                message: `You're not Allowed to modify this resource`
            });
        }
        address = await DeliveryAddress.findByIdAndDelete(id);
        res.json(address)
    } catch (err) {
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

const index = async(req, res, next) => {
    try {
        let address = await DeliveryAddress.find({user: req.user._id})
        return res.json(address);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    store,
    index,
    update,
    destroy

}