const userModel = require('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.user_register = (req,res) => {

    userModel
        .findOne({email : req.body.email})
        .exec()
        .then(result => {
            if(result){
                return res.json({
                    msg : "mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.json({
                            msg : err.message
                        });
                    } else {
                        const user = new userModel ({
                            name : req.body.username,
                            email : req.body.email,
                            password : hash
                        });

                        user
                            .save()
                            .then(result => {
                                res.json({
                                    msg : "registered user",
                                    userInfo : result

                                });
                            })
                            .catch(err => {
                                res.json({
                                    msg : err.message
                                });
                            });
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

};

exports.user_login = (req,res) => {

    userModel
        .findOne({email : req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.json({
                    msg : "not found registered email"
                });
            } else {
                console.log(user.password);

                bcrypt.compare(req.body.password, user.password, (err,result)=> {
                    if(err) {
                        return res.json({
                            msg : "input again password"
                        });
                    }
                    if(result) {

                        const token = jwt.sign({
                            email : user.email,
                            userId : user._id
                        },
                        'secret', {expiresIn : '1h'}
                        );

                        res.json({
                            msg : "successfull login",
                            tokenInfo : token
                        });
                    }
                    res.json({
                        msg : "login failed"
                    });
                })
            }
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

};

exports.user_delete = (req,res) => {

    const id = req.params.user_id;

    userModel
        .remove({_id: id })
        .exec()
        .then(result => {
            res.json({
                msg : "deleted user",
            });
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

};