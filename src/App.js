import './App.css';
import { useState } from 'react';
import Navbar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import AlertComponent from './components/AlertComponent';
import { Container } from 'react-bootstrap';
import AddNote from './components/AddNote';
import Login from './components/Login';
import Signup from './components/Signup';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from './state';
import { bindActionCreators } from 'redux';

function App() {
  const [alert, setAlert] = useState({"type":"", "message":""});

  // progress using redux
  const progress = useSelector(state => state.progress);
  const dispatch = useDispatch();
  const { setProgress } = bindActionCreators(actionCreators, dispatch);


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
      <Router>
          <LoadingBar color="red" progress={progress} onLoaderFinished={() => setProgress(0) } />
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
              {localStorage.getItem('access_token')?(
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
    </>
  );
}

export default App;
