import React, { Suspense } from 'react';
import { BrowserRouter,Route, Switch } from "react-router-dom";
import './App.css';

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/Loginpage'
import RegisterPage from './components/views/RagisterPage/RegisterPage'
import Auth from './hoc/auth'
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";
import MovieDetail from './components/views/MovieDetail/MovieDetail';
import FavoritePage from './components/views/FavoritePage/FavoritePage';
import PostPage from './components/views/PostPage/PostPage'
import CreatePage  from './components/views/PostPage/CreatePage';
import PostDetailPage from './components/views/PostPage/PostDatilPage'

function App() {
  return (
    <BrowserRouter> 
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage,null)} />
            <Route exact path="/login" component={Auth(LoginPage,false)} />
            <Route exact path="/register" component={Auth(RegisterPage,false)} />
            <Route exact path='/movie/:movieId' component={Auth(MovieDetail,null)}/>
            <Route exact path='/favorite' component={Auth(FavoritePage,true)}/>
            <Route exact path='/post' component={Auth(PostPage,null)}/>
            <Route exact path='/post/createpost' component={Auth(CreatePage,true)}/>
            <Route exact path='/post/:postId' component={Auth(PostDetailPage,null)}/>
            
          </Switch>
        </Switch>
      </div>
      <hr/>
      <Footer />
    </Suspense>
    </BrowserRouter>
  );
}

export default App;
