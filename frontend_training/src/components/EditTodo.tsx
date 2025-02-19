import '../style/Todo.css'
import { useState } from 'react'

// 編集コンポーネントのプロップスの型定義
type EditTodoProps = {
	todoText: string; // 編集するTODOのテキスト
	id: string; // 編集するTODOのID
	updateTodoText: (text: string, id: string) => void; // TODOのテキストを更新する関数
	closeEdit: (id: string) => void; // 編集をキャンセルをする関数
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

export default EditTodo;