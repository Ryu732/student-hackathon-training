import './App.css'
import { useState } from 'react'

function App() {
	return (
		<>
			<h1>TODOアプリ</h1>
			<InputTodo />
		</>
	)
}

type Todo = {
	id: number;
	text: string;
}

function InputTodo() {
	const [text, setText] = useState<string>(''); // 入力されたテキストを保持するstate
	const [todos, setTodos] = useState<Todo[]>([]); // TODOリストを保持するstate

	function addTodo(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setTodos([...todos, {
			id: todos.length + 1,	// ID
			text: text,	// 入力されたテキスト
		}]);
		setText('');
	}

	return (
		<>
			<form className='addForm' onSubmit={addTodo}>
				<input type="text" className='addText' value={text} onChange={(e) => setText(e.target.value)} />
				<button type="submit" className='addButton'>追加</button>
			</form>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>{todo.text}</li>
				))}
			</ul>
		</>
	)
}

export default App
