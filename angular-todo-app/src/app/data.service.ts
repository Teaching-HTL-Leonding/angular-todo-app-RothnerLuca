import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public selectedPerson: string = 'All';
  public selectedStatus: string = 'DoneAndUndone';
  public todos: Todo[] = [
    new Todo('a', 'me', true),
    new Todo('b', 'josef', false),
    new Todo('c', 'herbert', true),
    new Todo('d', 'josef', false),
  ];
  public personsToFilter: string[] = [];
  public saveTodos: Todo[] = [];
  public currentTodos: Todo[] = [];

  constructor() {
    this.fillPersonsToFilter()
  }

  public fillPersonsToFilter(): void {
    this.personsToFilter = [];
    for (let todo of this.todos) {
      if (todo.person && !this.personsToFilter.includes(todo.person)) {
        this.personsToFilter.push(todo.person);
      }
    }
  }

  public convertStringStatusToBoolean(status: string): boolean {
    return status === 'Done' ? true : false;
  }

  public addTodo(desc: string, person: string) {
    this.todos.push(new Todo(desc, person, false));
  }
}

class Todo {
  constructor(public desc: string,
              public person: string,
              public status: boolean) { }
}
