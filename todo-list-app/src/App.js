import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import LeftSideMenu from './components/LeftSideMenu/LeftSideMenu';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content-wrapper">
        <main className="main-content">
          <div className="main-content__wrapper">
            <div className="agenda-view">
              <Header />
              <Home />
              <LeftSideMenu />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
