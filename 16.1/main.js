function Student(name, surname, birthYear, grades) {
  this.name = name;
  this.surname = surname;
  this.birthYear = birthYear;
  this.grades = grades;
  this.attendance = new Array(25).fill(null);
  this.attendanceIndex = 0;

  this.getAge = function () {
    const currentYear = new Date().getFullYear();
    return currentYear - this.birthYear;
  };

  this.getAverageGrade = function () {
    if (this.grades.length === 0) return 0;
    const sum = this.grades.reduce((acc, mark) => acc + mark, 0);
    return sum / this.grades.length;
  };

  this.present = function () {
    if (this.attendanceIndex < 25) {
      this.attendance[this.attendanceIndex++] = true;
    } else {
      console.log("вже 25 записів відвідуваності!");
    }
  };

  this.absent = function () {
    if (this.attendanceIndex < 25) {
      this.attendance[this.attendanceIndex++] = false;
    } else {
      console.log("Вже 25 записів відвідуваності!");
    }
  };

  this.summary = function () {
    const attended = this.attendance.filter(x => x === true).length;
    const total = this.attendance.filter(x => x !== null).length;
    const avgAttendance = total ? attended / total : 0;
    const avgGrade = this.getAverageGrade();

    if (avgGrade > 90 && avgAttendance > 0.9) {
      return "Молодець!";
    } else if (avgGrade > 90 || avgAttendance > 0.9) {
      return "Добре але можна краще";
    } else {
      return "Редиска!";
    }
  };
}
const student1 = new Student("Іван", "Іваненко", 2000, [95, 92, 98]);
student1.present();
student1.present();
student1.absent();
console.log(student1.getAge());
console.log(student1.getAverageGrade()); 
console.log(student1.summary()); 
const student2 = new Student("Олена", "кАніч", 2001, [85, 88, 90]);
student2.absent();
student2.absent();
student2.present();
console.log(student2.summary());

const student3 = new Student("Максим", "Сидоренко", 1999, [60, 70, 65]);
for (let i = 0; i < 25; i++) student3.absent();
console.log(student3.summary());
