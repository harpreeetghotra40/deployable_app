import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import Authentication from './Authentication'
import Login from './components/Login'
import SignUp from './components/SignUp'
import DeployContainer from './containers/DeployContainer'
import './stylesheets/App.css';

function localCreds() {
  let newAuth = new Authentication()
  return newAuth.fromLocalStorage();
}

class App extends Component {

  state = {
    currentUser: localCreds()
  }

  setCurrentUser = (currentUser) => {
    // console.log("currentUser: ", currentUser)
    this.setState({currentUser: currentUser}); 
    this.renderLoginOrHome()
  }

  renderLoginOrHome = () => {
    if (this.state.currentUser === null) {
      console.log('from App: no cached creds, redirecting to signup page')
      return (
        this.props.history.push("/login")
      )
    }
    
    this.props.history.push("/home")
  }

  logout = (event) => {
    event.preventDefault();
    this.setState({currentUser: null});
    localStorage.clear();
    this.props.history.push("/login")
  }

  componentDidMount() {
    if (this.state.currentUser ===  null) {
      const newAuth = new Authentication()
      const locallyStoredUser = newAuth.fromLocalStorage();
      if (locallyStoredUser !== null) {
        this.setState({currentUser: locallyStoredUser})
      }
    }
  }

  render(){
    return (
      <div className="App">
            <Route exact path='/login' render={()=> <Login setCurrentUser = {this.setCurrentUser}/>}/>
            <Route exact path='/signup' render={() =><SignUp setCurrentUser = {this.setCurrentUser}/>} />
            <Route exact path='/home' render={() => <DeployContainer user ={this.state.currentUser} logout = {this.logout}/>}/>
            <Route exact path='/'  render = {this.renderLoginOrHome} />
      </div>
    );
  }
}

export default withRouter(App);
