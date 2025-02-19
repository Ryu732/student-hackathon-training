import '../style/Todo.css'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import EditTodo from '../components/EditTodo'

// TODOリストの型定義
type Todo = {
	id: string; // ID(unique)
	text: string; // TODOの内容
	isComplete: boolean; // 完了フラグ
	isEdit: boolean; // 編集フラグ
}

function Todo() {
	const [text, setText] = useState<string>(''); // 入力されたテキストを保持するstate
	const [todos, setTodos] = useState<Todo[]>([]); // TODOリストを保持するstate

	function addTodo(e: React.FormEvent<HTMLFormElement>) {
		// TODOリストに追加する
		if (!text.trim()) { // 入力が空の場合はアラート
			alert('入力してください');
			return;
		};
		e.preventDefault();
		setTodos([...todos, {
			id: uuid(),
			text: text,
			isComplete: false,
			isEdit: false
		}]);
		setText('');
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

	return (
		<>
			<h1>
				ToDoリスト
			</h1>
			<form onSubmit={addTodo} className='addForm' >
				<input type="text" value={text} onChange={(e) => setText(e.target.value)} className='addText' />
				<button type="submit" className='addButton'>追加</button>
			</form>
			<ul >
				{todos.filter(todo => (!todo.isComplete)).map((todo) => (
					<div key={todo.id} >
						<div className='todoItem'>
							<li onClick={() => startEdit(todo.id)}>{todo.text}</li>
							<button onClick={() => (completeTodo(todo.id))} className='completeButton'>完了</button>
						</div>
						{todo.isEdit && <EditTodo todoText={todo.text} id={todo.id} updateTodoText={updateTodoText} closeEdit={closeEdit} />}
					</div>
				))}
			</ul>
		</>
	)
}



export default Todo;