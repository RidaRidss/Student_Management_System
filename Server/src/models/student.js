/**
 * Created by Administrator on 2/18/2016.
 */
var mongoose = require('mongoose');module.exports = mongoose.model('Student',{name: String, gender: String, className: String, rollNo: Number, id: Date});