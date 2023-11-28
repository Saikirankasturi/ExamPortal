import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  qid: any;
  questions: any;
  

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;

  timer: any;

  constructor(
    private location: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;
        
      
        this.startTimer();
        console.log(this.questions);
        Swal.fire('Success !!', 'Questions loaded successffuly', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, 'null', window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, 'null', location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      // denyButtonText: `Don't save`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        //calculation
        this.evalQuiz();
      }
    });
  }
  evalQuiz() {
    // calling to sever to evaluate questions
    this._question.evalQuiz(this.questions).subscribe(
      (data: any) => {
        console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;

        this.isSubmit = true;
      },
      (error) => {
        console.log(error);
      }
    );

    //   this.isSubmit = true;
    //   this.questions.forEach((q: any) => {
    //     if (q.givenAnswer == q.answer) {
    //       this.correctAnswers++;
    //       //100/50 = 2
    //       let marksSingle =
    //         this.questions[0].quiz.maxMarks / this.questions.length;
    //       this.marksGot += marksSingle;
    //     }
    //     if (q.givenAnswer.trim() != '') {
    //       this.attempted++;
    //     }

    //   });
    console.log('Correct Answers :' + this.correctAnswers);
    console.log('Marks got ' + this.marksGot);
    console.log('Attempted' + this.attempted);
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.submitQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    // Calculate hours by dividing the total seconds (this.timer) by 3600 (60 seconds * 60 minutes)
    let hours = Math.floor(this.timer / 3600);
    // Calculate minutes by taking the remaining seconds after calculating hours, and dividing by 60
    let minute = Math.floor((this.timer % 3600) / 60);

     // Calculate seconds by taking the remaining seconds after calculating hours and minutes
    let sec = this.timer % 60
    return `${hours} hr : ${minute} min : ${sec} sec`;
  }

  printPage() {
    window.print();
  }
}
