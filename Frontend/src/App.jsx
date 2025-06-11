import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/global/NavBar.jsx';
import { Login } from './views/Login.jsx';
import { Users } from './views/Users.jsx';
import { CreateTeam } from './views/CreateTeam.jsx';
import { Home } from './views/Home.jsx';
import { NotFound } from './components/global/404Error.jsx';
import { CreateTournament } from './views/CreateTournament.jsx';
import TournamentDetail from './views/TournamentDetails.jsx';
import PositionsTable from './views/PositionTable.jsx';
import { Toaster } from 'sonner'


function App() {
  return (
    <Router>
      <Toaster richColors />
      <section className='h-[100vh]'>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/users' element={<Users />} />
          <Route path='/create-team' element={<CreateTeam />} />
          <Route path='/create-tournament' element={<CreateTournament />} />
          <Route path='/tournaments/:tournamentId' element={<TournamentDetail />} />
          <Route path='/positions' element={<PositionsTable />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </section>
    </Router>
  )
}

export default App