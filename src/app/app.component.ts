import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  todos$: Observable<any>;
  todoinput = '';

  constructor() {
    const todosCollection = collection(this.firestore, 'todos');
    this.todos$ = collectionData(todosCollection);

    this.todos$.subscribe(newTodos => {
      console.log('Neue Todos sind:', newTodos);
      // alert('Todos wurden geändert!')
    });
  }

  addTodo() {
    const todosCollection = collection(this.firestore, 'todos');
    const newTodo = { name: this.todoinput };

    setDoc(doc(todosCollection), newTodo);
    this.todoinput = '';
  }
}
