import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import HomeView from './views/HomeView';
import MovieDetailsPage from './views/MovieDetailsPage';
import MoviesSerchView from './views/MoviesSerchView';

function App() {
  return (
    <div className="container">
      <Navigation />
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
    </div>
  );
}

export default App;
