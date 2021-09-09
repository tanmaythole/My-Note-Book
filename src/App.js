import './App.css';
import Navbar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import AlertComponent from './components/AlertComponent';
import NoteState from './context/notes/NoteState';
import { Container } from 'react-bootstrap';
import AddNote from './components/AddNote';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

function App() {
  return (
    <>
    <NoteState>
      <Router>
          <Navbar />
          <AlertComponent type="" />
          <Container>
            <Switch>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/add">
                <AddNote />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/logout">
                {localStorage.getItem('auth-token')?(localStorage.removeItem('auth-token')):<Redirect to="/" />}
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route>
                <h1>No Route</h1>
              </Route>
            </Switch>
          </Container>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
