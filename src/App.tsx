// src/App.tsx
import './App.css'
// CORREÇÃO: Adicionamos explicitamente a extensão do arquivo (.tsx)
import { BookList } from './pages/BookList.tsx' 

function App() {
  return (
    // Como combinamos, aqui está o app-container para centralizar
    <div className="app-container"> 
      <BookList />
    </div>
  )
}

export default App