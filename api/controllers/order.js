const orderModel = require('../models/order');
const productModel = require('../models/product');


exports.order_get_all =  (req,res) => {

    orderModel 
        .find()
        .exec()
        .then(docs => {

            const response = {
                count : docs.length,
                orderInfo : docs.map(doc => {
                    return{
                        product : doc.product,
                        qty : doc.qty,
                        id : doc.id,
                        request : {
                            type : "GET",
                            url : "http://localhost:3000/order/" + doc._id
                        }
                    };
                })
            };

            res.json(response)
        })

        .catch(err => {
            res.json({
                msg : err.message

            });
        });
   
};

exports.order_get_detail = (req, res) => {

    const id = req.params.order_id;

    orderModel
        .findById(id)
        .exec()
        .then(doc => {
            res.json({
                msg : "order detail get",
                orderInfo : doc,
                request : {
                    type : "GET",
                    url : "http://localhost:3000/order/"
                }
            });
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

};


exports.order_posting = (req,res) => {

    productModel
        .findById(req.body.productid)
        .exec()
        .then(result => {
            if(!result){
                return res.json({
                    msg : "no product id"
                });
            } else {
                const order = new orderModel({
                    product : req.body.productid,
                    qty : req.body.qty
                });

                order
                    .save()
                    .then(doc => {
                        res.json({
                            msg : "successfull posting order",
                            orderInfo : doc,
                            request : {
                                type : "GET",
                                url : "http://localhost:3000/order/" + doc._id
                            }
                        })
                    })
                    .catch(err => {
                        res.json({
                            msg : err.message
                        });
                    });
            }
        })

        .catch(err => {
            res.json({
                msg : err.message
            });
        });

};

exports.order_update = (req,res) => {

    const id = req.params.order_id;

    const updateOps = {};

    for (ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    orderModel
        .update({_id : id} , {$set : updateOps})
        .exec()
        .then(result => {
            res.json({
                msg : "update order data",
                orderInfo : result,
                request : {
                    type : "GET",
                    url : "http://localhost:3000/order/" + id
                }
            });
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

};

exports.order_delete = (req,res) => {

    const id = req.params.order_id;


    orderModel
        .remove({_id : id })
        .exec()
        .then(result => {
            res.json({
                msg : "deleted",
                request : {
                    type : "GET",
                    url : "http://localhost:3000/order/"
                }
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

};