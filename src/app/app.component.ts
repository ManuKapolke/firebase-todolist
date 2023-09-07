import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  todos$: Observable<any>;
  todos: Array<any> = [];

  constructor() {
    const todosCollection = collection(this.firestore, 'todos');
    this.todos$ = collectionData(todosCollection);

    this.todos$.subscribe(newTodos => {
      console.log('Neue Todos sind:', newTodos);
      this.todos = newTodos;
    });
  }
}
