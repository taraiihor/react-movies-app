import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import HomeView from './views/HomeView';
import MovieDetailsPage from './views/MovieDetailsPage';
import MoviesSerchView from './views/MoviesSerchView';

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <HomeView />
        </Route>
        <Route path="/movies" exact>
          <MoviesSerchView />
        </Route>
        <Route path="/movies/:movieId" exact>
          <MovieDetailsPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;