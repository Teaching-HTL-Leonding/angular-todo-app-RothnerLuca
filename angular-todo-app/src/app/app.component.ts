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
  private onEdit: boolean = false;
  private currIx: number = 0;
  public displayedColumns: any[] = ['desc', 'person', 'status'];

  constructor(public data: DataService) {
    this.data.currentTodos = this.data.todos;
  }

  public editBtnOnClick(index: number) {
    this.onEdit = true;
    this.currIx = index;
    this.hideInputForm = false;
    this.inputDesc = this.data.currentTodos[index].desc;
    this.inputPerson = this.data.currentTodos[index].person;
  }

  public checkBtnOnClick() {
    if (!this.onEdit) {
      this.data.addTodo(this.inputDesc, this.inputPerson);
    } else {
      this.data.currentTodos[this.currIx].desc = this.inputDesc;
      this.data.currentTodos[this.currIx].person = this.inputPerson;

      let todo = this.data.currentTodos[this.currIx];
      for (let i = 0; i < this.data.todos.length; i++) {
        if (this.data.todos[i] === todo) {
          this.data.todos[i].desc = this.inputDesc;
          this.data.todos[i].person = this.inputPerson;
          break;
        }
      }
    }
    this.hideInputForm = true;
      this.inputDesc = "";
      this.inputPerson = "";
      this.data.fillPersonsToFilter();
      this.onEdit = false;
      this.currIx = 0;
  }

  public cancelBtnOnClick() {
    this.inputDesc = "";
    this.inputPerson = "";
    this.hideInputForm = true;
    this.onEdit = false;
    this.currIx = 0;
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
        break;
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
