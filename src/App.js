import { Suspense, useState, useEffect } from 'react';
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
import NoPage from './components/NoPage';
import FavoritesView from './views/FavoritesView';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) ?? defaultValue,
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

function App() {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const addFavorites = movies => {
    if (favorites.find(item => item.id === movies.id)) {
      return setFavorites(favorites.filter(item => item.id !== movies.id));
    }
    const newMovies = [...favorites, movies];
    setFavorites(newMovies);
  };
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
              <MovieDetailsPage
                addFavorites={addFavorites}
                favorites={favorites}
              />
            </Route>
            <Route path="/favorites">
              <FavoritesView movies={favorites} />
            </Route>
            <Route>
              <NoPage />
            </Route>
          </Switch>
        </Suspense>
      </Container>
      <Footer />
    </>
  );
}

export default App;
