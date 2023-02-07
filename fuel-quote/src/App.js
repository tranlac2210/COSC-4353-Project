import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function HomePage() {
  return <h2>Home Page</h2>;
}

function LoginPage() {
  return <h2>Login Page</h2>;
}

function SignUpPage() {
  return <h2>Sign Up Page</h2>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>test</p>
         
      </header>
      <section>
        <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
      <Route path="/" exact component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
    </Router></section>
    </div>
  );
}

export default App;
