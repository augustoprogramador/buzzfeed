import { Component, OnInit } from '@angular/core';
import quizzQuestions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit {

  public titulo: string = '';
  public questions: any[] = [];
  public questionSelected: any = undefined;
  public answers: any[] = [];
  public answerSelected: string = '';
  public questionIndex: number = 0;
  public questionMaxIndex: number = 0;
  public finished: boolean = false;
  public result: string = '';

  constructor() { }

  ngOnInit(): void {
    if(quizzQuestions) {
      this.titulo = quizzQuestions.title;
      this.questions = quizzQuestions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  public playerChoice(alias: string) {
    this.answers.push(alias);
    this.nextStep();
  }

  nextStep() {
    this.questionIndex++;
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
      return;
    }
    this.finished = true;
    this.result = this.checkResult(this.answers);
  }

  checkResult(answers: string[]) {
    const result = answers.reduce((prev, curr, i, arr) => {
      const good = arr.filter((item) => item === 'A').length;
      const evil = arr.filter((item) => item === 'B').length;
      return good > evil ? 'A' : 'B';
    });
    const results = quizzQuestions.results;
    return results[result as keyof typeof quizzQuestions.results];
  }

}
