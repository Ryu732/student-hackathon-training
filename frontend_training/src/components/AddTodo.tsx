import '../style/Todo.css'
import { useState } from 'react'

// propsの型定義
type AddTodoProps = {
	addTodo: (text: string) => void;
}

function AddTodo({ addTodo }: AddTodoProps) {
	const [text, setText] = useState<string>(''); // 入力されたテキストを保持するstate
	function handleAddTodo(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// TODOリストに追加する
		if (!text.trim()) { // 入力が空の場合はアラート
			alert('入力してください');
			return;
		};
		addTodo(text);
		setText('');
	}

	return (
		<>
			<form onSubmit={handleAddTodo} className='addForm' >
				<input type="text" value={text} onChange={(e) => setText(e.target.value)} className='addText' />
				<button type="submit" className='addButton'>追加</button>
			</form>
		</>
	)
}

export default AddTodo;