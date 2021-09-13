import './App.css';
import { useContext, useState } from 'react';
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
import AuthContext from './context/auth/AuthContext';

function App() {
  const [alert, setAlert] = useState({"type":"", "message":""});
  
  const context = useContext(AuthContext);
  const { loggedin } = context;

  const showAlert = (message, type) => {
    setAlert({
      message:message,
      type:type
    })
    setTimeout(() => {
      setAlert({"type":"", "message":""});
    }, 1500);
  }
  return (
    <>
    <NoteState>
      <Router>
          <Navbar />
          <AlertComponent alert={alert} />
          <Container>
            <Switch>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert} />
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert} />
              </Route>
              {loggedin?(
                <Switch>
                  <Route exact path="/add">
                    <AddNote showAlert={showAlert} />
                  </Route>
                  <Route exact path="/">
                    <Home showAlert={showAlert} />
                  </Route>
                </Switch>
              ):(
                <Redirect to="/login" />
              )}
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
