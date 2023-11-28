import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private _http: HttpClient) {}

  public quizes() {
    return this._http.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quiz: any) {
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }

  public deleteQuiz(qId: any) {
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }

  //GET THE SINGLE QUIZ
  public getQuiz(qId: any) {
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

  //Update
  public updateQuiz(quiz: any) {
    return this._http.put(`${baseUrl}/quiz/`, quiz);
  }

  //get quizes of category
  public getQuizesOfCategory(cid: any) {
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  //get active quizes
  public getActiveQuizes() {
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  //get active quizes of category
  public getActiveQuizesOfCategory(cid: any) {
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }
}
