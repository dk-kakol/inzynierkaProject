var express = require('express');
var router = express.Router();
var Rotation = require('../models/rotation');

router.post('/one', function (req, res, next) {
    var rotation = new Rotation({
        date: req.body.date,
        idOriginWarehous: req.body.idOriginWarehous,
        OriginWarehousName: req.body.OriginWarehousName,
        idDestinationWarehous: req.body.idDestinationWarehous,
        DestinationWarehousName: req.body.DestinationWarehousName,
        amount: req.body.amount,
        status: req.body.status
    });
    rotation.save(function(err, result){
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        res.status(201).json({
            rotation: 'Saved rotation',
            obj: result
        });
    });
});

router.post('/many', function (req, res, next) {
    var rotations = [];
    for (var i = 0; i< req.body.length; i++){
        var rotation = new Rotation({
            date: req.body[i].date,
            idOriginWarehous: req.body[i].idOriginWarehous,
            OriginWarehousName: req.body[i].OriginWarehousName,
            idDestinationWarehous: req.body[i].idDestinationWarehous,
            DestinationWarehousName: req.body[i].DestinationWarehousName,
            amount: req.body[i].amount,
            status: req.body[i].status
        });
        rotations.push(rotation);
    }
    Rotation.create(rotations, function(err, result){
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(201).json({
                rotation: 'Saved rotations',
                obj: result
            });
        });
});

router.get('/all', function(req, res, next){
    Rotation.find()
        .exec(function(err, rotations){
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Successs',
                obj: rotations
            });
        });
});

router.get('/:date', function(req, res, next){
    var time = req.params.date;
    Rotation.find({"date": time})
        .exec(function(err, rotations){
            console.log(rotations);
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Success',
                date: time,
                date2: req.params.date,
                obj: rotations
            });
        });
    
});

router.delete('/:id', function(req, res, next){
    Rotation.findById(req.params.id, function(err, rotation) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if (!rotation) {
            return res.status(500).json({
                title: 'No rotation found!',
                error: {rotation: 'Rotation not found'}
            });
        }
        rotation.remove(function(err, result){
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted rotation',
                obj: result
            });
        });
    });
});

router.patch('/update/:id', function(req,res,next){
    Rotation.findById(req.params.id, function(err, rotation) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if (!rotation) {
            return res.status(500).json({
                title: 'No rotation found!',
                error: {rotation: 'Fotation not found'}
            });
        }
        rotation.amount = req.body.amount;
        rotation.status = req.body.status;
        rotation.save(function(err, result){
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(202).json({
                message: 'Updated rotation',
                obj: rotation
            });
        });
    });
});

module.exports = router;