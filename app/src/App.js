import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import { Paper, Button, Avatar, MenuList, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Bookmarks, LocalActivity, ConfirmationNumberOutlined, AddCircle, CheckBox, RotateLeft } from '@material-ui/icons'

import './App.css';
import Eventos from './pages/Eventos'
import CriarEvento from './pages/CriarEvento';
import Inscricoes from './pages/Inscricoes';
import Salvos from './pages/Salvos';

function App() {

  const [activePage, setActivePage] = useState({
    eventos: '',
    inscricoes: '',
    salvos: '',
    criar: ''
  })

  async function resetData() {
    await fetch('http://localhost:5000/reset-data')
      .then(async res => {
        const resp = await res.json()
        alert('Dados reiniciados com sucesso!')
        window.location.reload()
      })
      .catch(err => { console.log(err) })
  }

  return (
    <div className="App">
      <Router>
        {/*NAVBAR*/}
        <Paper className="sidebar-container">
          <ConfirmationNumberOutlined className="logo" />
          <div className="profile-container">
            <Button>
              <Avatar className="profile" />
            </Button>
          </div>
          <MenuList className="menu">
            <Link to="/eventos">
              <MenuItem className={"menu-item " + activePage.eventos}>
                <ListItemIcon>
                  <LocalActivity className={activePage.eventos + "-icon"} />
                </ListItemIcon>
                <ListItemText className="menu-item-txt" primary="Eventos" />
              </MenuItem>
            </Link>
            <Link to="/minhas-inscricoes">
              <MenuItem className={"menu-item " + activePage.inscricoes}>
                <ListItemIcon className={activePage.inscricoes + "-icon"}>
                  <CheckBox />
                </ListItemIcon>
                <ListItemText className="menu-item-txt" primary="Inscrições" />
              </MenuItem>
            </Link>
            <Link to="/eventos-salvos">
              <MenuItem className={"menu-item " + activePage.salvos}>
                <ListItemIcon className={activePage.salvos + "-icon"}>
                  <Bookmarks />
                </ListItemIcon>
                <ListItemText className="menu-item-txt" primary="Eventos Salvos" />
              </MenuItem>
            </Link>
            <Link to="/criar-evento">
              <MenuItem className={"menu-item " + activePage.criar}>
                <ListItemIcon className={activePage.criar + "-icon"}>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText className="menu-item-txt" primary="Criar evento" />
              </MenuItem>
            </Link>
            <div className={"last"}>
              <MenuItem onClick={resetData} className="menu-item">
                <ListItemIcon>
                  <RotateLeft />
                </ListItemIcon>
                <ListItemText className="menu-item-txt" primary="Limpar dados" />
              </MenuItem>
            </div>
          </MenuList>
        </Paper>

        {/*CONTENT*/}
        <Switch>
          <div className="content-container">
            <Route exact path="/" component={Eventos}>
              <Redirect to="/eventos"></Redirect>
            </Route>
            <Route exact path="/eventos">
              <Eventos setActivePage={setActivePage} />
            </Route>
            <Route exact path="/minhas-inscricoes">
              <Inscricoes setActivePage={setActivePage} />
            </Route>
            <Route exact path="/eventos-salvos">
              <Salvos setActivePage={setActivePage} />
            </Route>
            <Route exact path="/criar-evento">
              <CriarEvento setActivePage={setActivePage} />
            </Route>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;