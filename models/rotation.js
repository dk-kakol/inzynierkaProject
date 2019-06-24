var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    date: {type: Date, required: true},
    idOriginWarehous: {type: Number, required: true},
    OriginWarehousName: {type: String, required: true},
    idDestinationWarehous: {type: Number, required: true},
    DestinationWarehousName: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: Number, required: true}
});

module.exports = mongoose.model('Rotation', schema);