import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Container from './components/Container';
import HomeView from './views/HomeView/HomeView';
import MovieDetailsPage from './views/MovisDetailsPage';
import MoviesSerchView from './views/MoviesSerchView';
import Loader from 'react-loader-spinner';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Container>
        <Header />

        <ToastContainer />
        <Suspense
          fallback={
            <Loader
              className="BallTriangle"
              type="ThreeDots"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={5000} //3 secs
            />
          }
        >
          <Switch>
            <Route path="/" exact>
              <HomeView />
            </Route>
            <Route path="/movies" exact>
              <MoviesSerchView />
            </Route>
            <Route path="/movies/:movieId">
              <MovieDetailsPage />
            </Route>
          </Switch>
        </Suspense>
      </Container>
      <Footer />
    </>
  );
}

export default App;
