import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  catId: any;
  quizes: any;
  constructor(private _route: ActivatedRoute, private _quiz: QuizService) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.catId = params['catId'];
      if (this.catId == 0) {
        console.log('Load all the quiz');
        this._quiz.getActiveQuizes().subscribe(
          (data: any) => {
            this.quizes = data;
            console.log(this.quizes);
          },
          (error) => {
            alert('error on loading all quizes');
          }
        );
      } else {
        console.log('Load specific quiz');
        this._quiz.getActiveQuizesOfCategory(this.catId).subscribe(
          (data: any) => {
            this.quizes = data;
          },
          (error) => {
            alert('error in loading quiz data');
          }
        );
      }
    });
  }
}
