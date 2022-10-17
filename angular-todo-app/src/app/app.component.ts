import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public hideInputForm = true;
  public inputDesc: string = "";
  public inputPerson: string = "";

  constructor(public data: DataService) {
    this.data.currentTodos = this.data.todos;
  }

  public checkBtnOnClick() {
    this.data.addTodo(this.inputDesc, this.inputPerson);
    this.hideInputForm = true;
    this.inputDesc = "";
    this.inputPerson = "";
    this.data.fillPersonsToFilter();
  }

  public cancelBtnOnClick() {
    this.inputDesc = "";
    this.inputPerson = "";
    this.hideInputForm = true;
  }

  public addNewBtnOnClick() {
    this.hideInputForm = false;
  }

  public getData() {
    return this.data.currentTodos;
  }

  public removeTodo(index: number) {
    let remTodo = this.data.currentTodos[index];
    for (let i = 0; i < this.data.todos.length; i++) {
      if (this.data.todos[i] === remTodo) {
        delete this.data.todos[i];
      }
    }
    delete this.data.currentTodos[index];
    this.data.currentTodos = this.data.currentTodos.filter(todo => todo);
    this.data.todos = this.data.todos.filter(todo => todo);
    this.data.fillPersonsToFilter();

    if (this.data.currentTodos.length === 0) {
      this.data.selectedPerson = 'All';
      this.data.selectedStatus = 'DoneAndUndone';
      this.data.currentTodos = this.data.todos;
    }
  }

  public getPersonsToFilter() {
    return this.data.personsToFilter;
  }

  public personFilterOnChange() {
    if (this.data.selectedPerson === 'All') {
      if (this.data.selectedStatus === 'DoneAndUndone') {
        this.data.currentTodos = this.data.todos;
      } else if (this.data.selectedStatus === 'Done') {
        this.data.currentTodos = this.data.todos.filter(todo => todo.status);
      } else {
        this.data.currentTodos = this.data.todos.filter(todo => !todo.status);
      }
    } else {
      if (this.data.selectedStatus === 'DoneAndUndone') {
        this.data.currentTodos = this.data.todos
        .filter(todo => todo.person === this.data.selectedPerson);
      } else if (this.data.selectedStatus === 'Done') {
        this.data.currentTodos = this.data.todos
        .filter(todo => todo.person === this.data.selectedPerson && todo.status);
      } else {
        this.data.currentTodos = this.data.todos
        .filter(todo => todo.person === this.data.selectedPerson && !todo.status);
      }
    }
  }

  public statusFilterOnChange() {
    if (this.data.selectedStatus === 'DoneAndUndone') {
      if (this.data.selectedPerson === 'All') {
        this.data.currentTodos = this.data.todos;
      } else {
        this.data.currentTodos = this.data.todos
          .filter(todo => todo.person === this.data.selectedPerson);
      }
    } else {
      if (this.data.selectedPerson === 'All') {
        this.data.currentTodos = this.data.todos
        .filter(todo => todo.status ===
          this.data.convertStringStatusToBoolean(this.data.selectedStatus));
      } else {
        this.data.currentTodos = this.data.todos
          .filter(todo => todo.person === this.data.selectedPerson
            && todo.status === this.data.convertStringStatusToBoolean(this.data.selectedStatus));
      }
    }
  }
}
