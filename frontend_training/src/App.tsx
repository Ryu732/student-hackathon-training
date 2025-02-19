// React Routerに関わる関数をインポート
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route
} from 'react-router-dom';
import './App.css';
// ルーティングで利用するコンポーネントをインポート
import Todo from './views/Todo';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<Todo />} />
			</>
		)
	);

	return <RouterProvider router={router} />
}

export default App
