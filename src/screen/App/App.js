import './App.css';
import Menu from '../../components/menu/Menu'
import CheckCookies from '../../res/CheckCookies';
import Card from '../../components/card/Card';

function App() {

  const loadInformation = () => {
      return {
          name:"Sebastian Tuyu",
          description:"Im a java developer",
          image:"https://starrgate.s3.amazonaws.com:443/users/93a7edd8737345b48d77fafc431ee5d43b88bba8/profile_MmZuhXN.jpg",
          location:"Merida,Yucatán",
          lang:["es","eng"]
      }
  }

  const swipeUser = () => {

  }
  

  const renderCard = () => {
      const data = loadInformation()

      return (
        <Card userData={data} onSwipe={() => swipeUser()}/>
      )
  }

  return (
    <div className="app-main-container">
      <Menu />

      <div className="app-card d-flex center-center">
        { renderCard() }
      </div>
    </div>
  );
}

export default App;
