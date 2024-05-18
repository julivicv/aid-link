import ReactDOM from 'react-dom/client'
import './index.css'
import './output.css'
import AuthProvider from './provider/AuthProvider.tsx'
import Routes from './routes/Routes.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
	<AuthProvider>
		<Routes />
	</AuthProvider>
)
