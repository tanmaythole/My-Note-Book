import './App.css';
import Navbar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import AlertComponent from './components/AlertComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import { Container } from 'react-bootstrap';
import AddNote from './components/AddNote';

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
