import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css'],
})
export class ViewQuizesComponent {
  quizes = [] as any;

  quizData={
    active: true,
  }
  
  // quizData = {
  //   active: true,
  // };

  constructor(private _quiz: QuizService) {}

  ngOnInit(): void {
    this._quiz.quizes().subscribe(
      (data: any) => {
        this.quizes = data;
        // this.quizData = data;
        console.log(this.quizes);
        Swal.fire('Loaded Successfully', 'Quiz is loaded', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading data', 'error');
      }
    );
  }

  //delete
  deleteQuiz(qId: Int16Array) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete
        this._quiz.deleteQuiz(qId).subscribe(
          (data: any) => {
            this.quizes = this.quizes.filter((quiz: any) => quiz.qId != qId);
            Swal.fire('Success', 'Quiz Deleted', 'success');
          },
          (error) => {
            console.log();
            Swal.fire('Error', 'Error in deleting Quiz', 'error');
          }
        );
      }
    });
  }
}
