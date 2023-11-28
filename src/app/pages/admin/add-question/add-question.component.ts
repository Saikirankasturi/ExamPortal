import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
interface Quiz {
  qId: any;
  
  // Add other properties if needed
}
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;

  qId: any;
  qTitle: any;
  question = {
    quiz:  {} as Quiz,
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    explanation: '',
  };

  constructor(
    private _router: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.qId = this._router.snapshot.params['qid'];
    this.qTitle = this._router.snapshot.params['title'];
    //console.log(this.qId);
    this.question.quiz['qId'] = this.qId;

    // this.question.quiz['qId'] = this.qId;
  }
  formSubmit() {
    // alert("testing");
    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }

    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
    }
    if (this.question.option3.trim() == '' || this.question.option3 == null) {
      return;
    }
    if (this.question.option4.trim() == '' || this.question.option4 == null) {
      return;
    }

    //form submit
    this._question.addQuestion(this.question).subscribe(
      //callback functions
      (data: any) => {
        Swal.fire('Success', 'Question Added', 'success');
      },
      (error) => {
        Swal.fire('Error', 'Error in adding question', 'error');
      }
    );
  }
}
