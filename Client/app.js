System.register(["angular2/platform/browser", "angular2/core", 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1, http_1, http_2;
    var Student, Data, student;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            }],
        execute: function() {
            Student = (function () {
                function Student(name, gender, className, rollNo, id) {
                    this.name = name;
                    this.gender = gender;
                    this.className = className;
                    this.rollNo = rollNo;
                    this.id = new Date();
                }
                return Student;
            })();
            Data = (function () {
                function Data() {
                    this.deleteStudent = new core_1.EventEmitter();
                    this.UpdateInfo = new core_1.EventEmitter();
                }
                Data.prototype.delete = function (student) { console.log(student); this.deleteStudent.emit(student); };
                Data.prototype.update = function (student) { this.UpdateInfo.emit(student); };
                Data = __decorate([
                    core_1.Component({ selector: 'tbody', inputs: ['students'], outputs: ['deleteStudent', 'UpdateInfo'], templateUrl: 'Data.html' }), 
                    __metadata('design:paramtypes', [])
                ], Data);
                return Data;
            })();
            student = (function () {
                function student(http) {
                    this.http = http;
                    this.students = [];
                    this.getStudents();
                }
                student.prototype.addStudent = function (name, gender, className, rollNo) {
                    var _this = this;
                    if (name.value == "") {
                        document.getElementById('error').innerHTML = "Please Enter Your Name";
                    }
                    else {
                        var obj = new Student(name.value, gender.value, className.value, rollNo.value);
                        var headers = new http_1.Headers();
                        headers.append('Content-Type', 'application/json');
                        var opts = new http_1.RequestOptions();
                        opts.headers = headers;
                        this.http.post('/addStudent', JSON.stringify(obj), opts).subscribe(function (res) { console.log(res.json()); setTimeout(function () { _this.students = res.json(); }, 2000); });
                        document.getElementById('error').innerHTML = "";
                        name.value = "";
                        gender.value = "";
                        className.value = "";
                        rollNo.value = "";
                    }
                };
                student.prototype.delete = function (student) {
                    var _this = this;
                    this.http.delete('/deleteStudent/' + student._id).subscribe(function (res) { for (var i = 0; i < _this.students.length; i++) {
                        if (_this.students[i].id == student.id) {
                            _this.students.splice(i, 1);
                        }
                    } });
                };
                student.prototype.updateinfo = function (student) { console.log(student); document.getElementById('name')['value'] = student.name; document.getElementById('gender')['value'] = student.gender; document.getElementById('class')['value'] = student.className; document.getElementById('rollno')['value'] = student.rollNo; this.delete(student); };
                student.prototype.getStudents = function () {
                    var _this = this;
                    this.http.request('/getStudents').subscribe(function (res) { _this.students = res.json(); });
                };
                student = __decorate([
                    core_1.Component({ selector: 'student', directives: [Data], templateUrl: 'Listing.html' }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], student);
                return student;
            })();
            browser_1.bootstrap(student, [http_2.HTTP_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=app.js.map
