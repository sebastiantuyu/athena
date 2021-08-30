import { useState, useEffect} from 'react';
import Menu from '../../components/menu/Menu'
import Card from '../../components/card/Card';
import API from '../../res/API';
import './App.css';
import Loader from '../../components/loader/Loader';

function App() {

  const [state, setState] = useState({
    results:[],
    matches:[],
    position:0,
    loaded:false
  })

  
  const loadInformation = async () => {
      
    const coincidences = await loadCoincidences()
    const [status,matches] = await API.user.getMatches(1)
    setState((prev) => ({...prev,
                          results:coincidences,
                          matches:JSON.parse(matches),
                          loaded:true}))
  }

  useEffect(() => {
      loadInformation()
  },state)


  const nextUser = () => {
    let newPosition = state.position + 1
    if(state.results.length > newPosition){
      setState((prev) => ({...prev,position:prev.position + 1}))
    }
  }

  const swipeUser = async () => {
      let newPosition = state.position + 1
      if(state.results.length > newPosition)
        {
          const [status,data] = await API.user.match(1,state.results[state.position])
          if(status)
          {
            let past_matches = state.matches
            past_matches.push(JSON.parse(data))
            setState((prev) => ({...prev,position:prev.position + 1,matches:past_matches}))
          }
        }
  }
  
  const loadCoincidences = async () => {
    const [status,data] = await API.user.coincidences(1)
    let parsed = JSON.parse(await data)
    return parsed['results']
  }


  const renderCard = () => {
      const data = state.results
      if(data.length > 0)
        return (
          <Card userData={data[state.position]} 
                onSwipe={() => swipeUser()}
                onNextUser={() => nextUser()}/>
        )
  }

  return (
    <div className="app-main-container">
      <Menu matches={state.matches}/>
 
      <div className="app-card d-flex center-center">
        { 
          state.loaded ? 
          renderCard() : 
          <Loader /> 
        }
      </div>
    </div>
  );
}

export default App;
