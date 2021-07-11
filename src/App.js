import { Route, Switch } from 'react-router-dom';
import './App.css';
import AuthRouter from './components/AuthRouter';
import Login from './components/Login';
import PrivateRouter from './components/PrivateRouter';
import PublicRouter from './components/PublicRouter';
import MainLayout from './layouts/MainLayout';
import AllNews from './pages/AllNews';
import DetailCountry from './pages/DetailCountry';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      {/* <GlobalLoading /> */}
      le thanh vinh
      <Switch>
        <PrivateRouter exact path="/" component={Home} />
        <PrivateRouter exact path="/profile" component={Profile} />
        <PrivateRouter exact path="/countries/:countryName" component={DetailCountry} />
        <AuthRouter exact path="/login" component={Login} />
        <PublicRouter exact path="/news" component={AllNews} />
        <PublicRouter exact path="/register" component={Register} />
        <Route component={MainLayout} />
      </Switch>
    </div>
  );
}

export default App;
