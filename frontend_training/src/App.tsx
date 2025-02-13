import './App.css'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

function App() {
	return (
		<>
			<h1>TODOアプリ</h1>
			<InputTodo />
		</>
	)
}

type Todo = {
	id: string;
	text: string;
	isComplete: boolean;
}

function InputTodo() {
	const [text, setText] = useState<string>(''); // 入力されたテキストを保持するstate
	const [todos, setTodos] = useState<Todo[]>([]); // TODOリストを保持するstate

	function addTodo(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setTodos([...todos, {
			id: uuid(),	// ID
			text: text,	// 入力されたテキスト
			isComplete: false,	// 完了フラグ
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

	return (
		<>
			<form className='addForm' onSubmit={addTodo}>
				<input type="text" className='addText' value={text} onChange={(e) => setText(e.target.value)} />
				<button type="submit" className='addButton'>追加</button>
			</form>
			<ul>
				{todos.filter(todo => (!todo.isComplete)).map((todo) => (
					<div key={todo.id} className='todoItem'>
						<li>{todo.text}</li>
						<button onClick={() => (completeTodo(todo.id))} className='completeButton'>完了</button>
					</div>
				))}
			</ul>
		</>
	)
}

export default App
