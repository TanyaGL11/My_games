import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Battleship } from './components/pages/Battleship/Battleship'
import { Header } from './components/Header/Header'
import { Catalog } from './components/pages/Catalog/Catalog'
import { NotFound } from './components/pages/NotFound/NotFound'
import { Game } from './components/pages/TicTacToe/TicTacToe'
import Bxnotes from './components/pages/Bxnotes/Bxnotes'

function App() {
   return <>
      <Header />
      <main className="main">
         <Routes>
            <Route path='/' element={<Catalog />} ></Route>
            <Route path='/game/battleship' element={<Battleship />} ></Route>
            <Route path='/game/tictactoe' element={<Game />} ></Route>
            <Route path='/game/newgame' element={<Bxnotes />} ></Route>
            <Route path='/game/*' element={<>Эта игра еще в разработке</>} ></Route>
            <Route path='*' element={<NotFound/>} ></Route>
         </Routes>
      </main>
   </>
}

export default App
