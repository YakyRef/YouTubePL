import './App.scss';

function App() {
  return (
    <div className="container">
      <div className="container__list_pannel">
        <div className="container__list_pannel__searchbar">
          <input type="text" />
          <button>Add</button>
        </div>
        <ul className="container__list_pannel__songs">
          <li>Song 1</li>
        </ul>
      </div>
      <div className="container__video_pannel">container__video_pannel</div>
    </div>
  );
}

export default App;
