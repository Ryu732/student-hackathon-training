import '../style/Todo.css'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import EditTodo from '../components/EditTodo'
import AddTodo from '../components/AddTodo'

// TODOリストの型定義
type Todo = {
	id: string; // ID(unique)
	text: string; // TODOの内容
	isComplete: boolean; // 完了フラグ
	isEdit: boolean; // 編集フラグ
}

function Todo() {
	const [todos, setTodos] = useState<Todo[]>([]); // TODOリストを保持するstate
	const [filter, setFilter] = useState<string>('incomplete'); // ToDoの表示フィルターを保持するstate

	function addTodo(text: string) {
		setTodos([...todos, {
			id: uuid(),
			text: text,
			isComplete: false,
			isEdit: false
		}]);
	}

	function completeTodo(id: string) {
		// TODOリストを完了済みにする
		setTodos(todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, isComplete: true };
			} else {
				return todo;
			}
		}));
	}

	function startEdit(id: string) {
		// 編集を開始する
		setTodos(todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, isEdit: true };
			} else {
				return todo;
			}
		}));
	}

	function updateTodoText(text: string, id: string) {
		// TODOリストを編集する
		setTodos(todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, text: text, isEdit: false };
			} else {
				return todo;
			}
		}));
	}

	function closeEdit(id: string) {
		// 編集を終了する
		setTodos(todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, isEdit: false };
			} else {
				return todo;
			}
		}));
	}

	function filterTodos(todos: Todo[], filter: string) {
		// フィルターをかけたTODOリストを返す
		switch (filter) {
			case 'incomplete':
				return todos.filter(todo => (!todo.isComplete));
			case 'complete':
				return todos.filter(todo => (todo.isComplete));
			case 'all':
				return todos;
			default:
				return todos;
		}
	}

	return (
		<>
			<h1>
				ToDoリスト
			</h1>
			<AddTodo addTodo={addTodo} />
			<label>
				<select value={filter} onChange={(e) => setFilter(e.target.value)} className='filterSelect'>
					<option value="incomplete">未完了</option>
					<option value="complete">完了</option>
					<option value="all">全て</option>
				</select>
			</label>
			<ul >
				{filterTodos(todos, filter).map((todo) => (
					<div key={todo.id} >
						<div className='todoItem'>
							<li onClick={() => startEdit(todo.id)} className={todo.isComplete ? "completeText" : ""}>{todo.text}</li>
							{
								!todo.isComplete &&
								<button onClick={() => (completeTodo(todo.id))} className='completeButton'>完了</button>
							}
						</div>
						{
							todo.isEdit &&
							<EditTodo todoText={todo.text} id={todo.id} updateTodoText={updateTodoText} closeEdit={closeEdit} />
						}
					</div>
				))}
			</ul>
		</>
	)
}

export default Todo;