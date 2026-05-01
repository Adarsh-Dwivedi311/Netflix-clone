import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name:"",
    key: "",
    published_at: "",
    typeof: ""
  });

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGQwODMyOTg2NzQxMjYzNDdmMzMzN2MzYjBhODg1MyIsIm5iZiI6MTc3NzU0OTM2MC44NzIsInN1YiI6IjY5ZjM0MDMwNDg0Njg3MGVjNWI3MWZlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E8zCRsQUKvdAMuTh5GK31IDgQxknN7F6iBZCrmTMlg0'
  }
};

useEffect(()=>{
  
fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
},[] )




  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%'
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
        </div>
      </div>
  )
}

export default Player
