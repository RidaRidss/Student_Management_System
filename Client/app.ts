import { bootstrap } from "angular2/platform/browser" ;
import { Component, EventEmitter } from "angular2/core" ;
import { Http, Response, RequestOptions, Headers } from 'angular2/http';
import { HTTP_PROVIDERS } from 'angular2/http';
class Student {
name: string;gender: string;className: string;rollNo: string;id: Date;
constructor(name: string,gender: string,className: string,rollNo: string,id?: Date){ 
this.name = name;  
this.gender = gender;   
this.className = className;  
this.rollNo = rollNo; 
this.id = new Date();
}
  
}
@Component(
{
selector: 'tbody',
inputs: ['students'], 
outputs:['deleteStudent','UpdateInfo'],
templateUrl: 'Data.html'
  
})
class Data {
student :Student;
public http: Http;
deleteStudent: EventEmitter<newStudent>;
UpdateInfo: EventEmitter<newStudent>;
constructor(){   
this.deleteStudent = new EventEmitter(); 
this.UpdateInfo = new EventEmitter() 
  
}
delete(student){ 
console.log(student);  
this.deleteStudent.emit(student);
}
update(student){ 
this.UpdateInfo.emit(student);
  
}
}
@Component(
{
selector: 'student',
directives:[Data], 
templateUrl: 'Listing.html'
  
}
)
class student{
students: newStudent[] = [];
constructor(public http: Http){ 
this.getStudents()
}
addStudent(name: HTMLInputElement,  gender: HTMLInputElement, className: HTMLInputElement, rollNo: HTMLInputElement){ 
if(name.value == ""){  
document.getElementById('error').innerHTML = "Please Enter Your Name";
}
else {  
var obj = new Student(name.value,gender.value,className.value,rollNo.value); 
let headers: Headers = new Headers();     
headers.append('Content-Type', 'application/json'); 
let opts: RequestOptions = new RequestOptions();  
opts.headers = headers; 
this.http.post('/addStudent',JSON.stringify(obj),opts).subscribe((res: Response) => {  
console.log(res.json()); 
setTimeout(()=>{  
this.students = res.json(); }, 2000)
});  
document.getElementById('error').innerHTML = ""; 
name.value = "";  
gender.value = "";    
className.value = "";    
rollNo.value = "";
} 
}
delete(student){  
this.http.delete('/deleteStudent/'+ student._id).subscribe((res: Response) => {   
for(var i = 0; i < this.students.length; i++){  
if(this.students[i].id == student.id){  
this.students.splice(i,1)
}
}
}
)
}
updateinfo(student){ 
console.log(student);   
document.getElementById('name')['value'] = student.name;  
document.getElementById('gender')['value'] = student.gender;  
document.getElementById('class')['value'] = student.className;  
document.getElementById('rollno')['value'] = student.rollNo;  
this.delete(student) }getStudents(){  
this.http.request('/getStudents').subscribe((res: Response) => { 
this.students = res.json() }
) 
}
  
}
bootstrap(student, [HTTP_PROVIDERS]);
