import { Component, OnInit } from '@angular/core';

import * as fromFiltro from '../../filter/filter.actions'
import * as fromTodo from '../todo.actions';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';
@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtrosValidos: fromFiltro.filtroValidos[] = ['todos','completados', 'pendientes'];
  filtroActual: fromFiltro.filtroValidos;

  pendientes: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.store.subscribe( state => {
      this.contarPendientes(state.todos);
      this.filtroActual = state.filtro;
    });

  }

  cambiarFiltro( nuevoFiltro : fromFiltro.filtroValidos) {
      this.store.dispatch( new fromFiltro.SetFiltroAction(nuevoFiltro));
  }

  contarPendientes(todos: Todo[]) {
    this.pendientes = todos.filter( todo => !todo.completado).length;
  }

  borrarTodo() {
    this.store.dispatch( new fromTodo.BorrarAllTodoAction());
  }
}
