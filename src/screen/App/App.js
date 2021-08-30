import { useState, useEffect} from 'react';
import Menu from '../../components/menu/Menu'
import Card from '../../components/card/Card';
import API from '../../res/API';
import './App.css';
import Loader from '../../components/loader/Loader';
import Waiting from '../../assets/svgs/woman.svg'

function App() {

  const [state, setState] = useState({
    id:0,
    results:[],
    matches:[],
    position:0,
    loaded:false
  })

  
  const loadInformation = async () => {
    
    const id = parseInt(API.user.getId())
    let status = false
    if (id == true){
      status = true
    } else {
      status = await API.user.logAsGuest()
    }

    if(status == true){
      await API.langs.setLocalLangs()
      const coincidences = await loadCoincidences()
      const [status,matches] = await API.user.getMatches(id)
      setState((prev) => ({...prev,
        id:id,
        results:coincidences,
        matches:JSON.parse(matches),
        loaded:true}))
      }
  }

    
   useEffect(() => {
       loadInformation()
   },state.id)
  

  const reLoadCoincidences = async () => {
     // Do not call this as the top function 
     setState((prev) => ({...prev,loaded:false}))
     const coincidences = await loadCoincidences()
     setState((prev) => ({
       ...prev,
       results:coincidences,
       loaded:true
     }))
  }

  const nextUser = () => {
    let newPosition = state.position + 1
    if(state.results.length > newPosition){
      setState((prev) => ({...prev,
                              position:prev.position + 1, 
                              results:deleteConicidence(state.position)}))
    } else {
      setState((prev) => ({...prev,position:0}))
    }

    console.log(state.results.length)
  }


  const deleteConicidence = (position) => {
      return state.results.filter((item,index) => index !== position)
  }


  const swipeUser = async () => {
      let newPosition = state.position + 1
      if(state.results.length > newPosition)
        {
          const [status,data] = await API.user.match(state.id,state.results[state.position])
          if(status)
          {
            const updatedResults = deleteConicidence(state.position)
            let past_matches = state.matches
            past_matches.push(JSON.parse(data))
            setState((prev) => ({...prev,position:prev.position + 1,matches:past_matches,results:updatedResults}))
          }
        }


    console.log(state.results.length)
  }
  
  const loadCoincidences = async () => {
    const [status,data] = await API.user.coincidences()
    let parsed = JSON.parse(data)
    if(data !== null)
      return parsed['results']
    else return []
  }


  const renderCard = () => {
      const data = state.results
      if(data.length > 0)
        return (
          <Card userData={data[state.position]} 
                onSwipe={() => swipeUser()}
                onNextUser={() => nextUser()}/>
        )
      else 
          return (  <div className="empty-result d-flex f-column a-center">
                      <p className="e-title">¡Bienvenido a Torre Match!</p>
                      <p className="e-description">
                        Aqui podrás conocer socios o cofundadores de acuerdo
                        con tus intereses.
                      </p>
                      <img src={Waiting} alt="" className="empty"/>
                      <span className="call-to-action">
                        ¡Añade preferencias para comenzar a buscar gente!
                      </span>
                    </div>)
  }

  return (
    <div className="app-main-container">
      <Menu matches={state.matches} 
            idProfile={state.id} 
            onSet={() => reLoadCoincidences()}
            loaded={state.loaded}
            />
 
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
