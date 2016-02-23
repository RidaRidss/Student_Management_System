/**
 * Created by Administrator on 2/17/2016.
 */
var student = require('./../models/student');module.exports = function(app) {
    // api ---------------------------------------------------------------------
    // application -------------------------------------------------------------
    app.get('/',function(req,res){res.render('index')});        /* load the single view file (angular will handle the page changes on the front-end)}) , when landing on the page, get all students and show them */ app.get('/getStudents',function(req,res){student.find(function(err,data){    /* use mongoose to get all students in the database  */  if(err) res.send(err); /* if there is an error retrieving, send the error. nothing after res.send(err) will execute */     else{console.log(data);res.json(data);     /* return all students in JSON format */   }})}); app.post('/addStudent',function(req,res){   /*  create student and send back all students after creation , when submitting the add form, send the text to the NODE API */ var newStudent = new student(req.body);   /* create a student , information comes from AJAX request from Angular  */console.log(req.body);newStudent.save();student.find(function(err,data){  /* get and return all the students after you create another  */  if(err) res.send(err); else{res.json(data);}})});app.delete('/deleteStudent/:id',function(req,res){ /* delete a student after checking it  */  student.remove({_id: req.params.id},function(){student.find(function(err,data){   /* get and return all the students after you remove another  */  res.json(data);})})});app.all('*', function(req, res, next) {res.header("Access-Control-Allow-Origin", "*");res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');res.header("Access-Control-Allow-Headers", "X-Requested-With,X-Powered-By,Content-Type");console.log(req.method);if (req.method === 'OPTIONS') {res.status(200).end();} else {next();}});}