import './App.css'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

function App() {
	return (
		<>
			<h1>TODOアプリ</h1>
			<Todo />
		</>
	)
}

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
		if (!text.trim()) return; // 入力が空の場合は何もしない
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

type EditTodoProps = {
	todoText: string;
	id: string;
	updateTodoText: (text: string, id: string) => void;
	closeEdit: (id: string) => void;
}

function EditTodo({ todoText, id, updateTodoText, closeEdit }: EditTodoProps) {
	const [text, setText] = useState<string>(todoText); // TODOの編集内容を保持するstate

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { // 編集内容を保存する
		e.preventDefault();
		if (!text.trim()) return;
		updateTodoText(text, id);
	};

	return (
		<>
			<form onSubmit={handleSubmit} className='editForm'>
				<input type='text' value={text} onChange={(e) => setText(e.target.value)} className='editText'></input>
				<button type='submit' className='updateButton'>更新</button>
				<button type='button' onClick={() => closeEdit(id)} className='editCancelButton'>キャンセル</button>
			</form>
		</>
	)
}

export default App
