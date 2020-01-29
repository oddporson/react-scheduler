import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const DELETE_INTERVIEW = "DELETE_INTERVIEW";
// const SPOT_AVAILABLE = "SPOT_AVAILABLE"; 

function reducer(state, action) {
  // console.log(action)
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day  }

    case SET_APPLICATION_DATA:
      return { ...state, days:action.days, appointments:action.appointments, interviewers:action.interviewers }

    case SET_INTERVIEW: {
      return {...state, appointments: action.appointments}
    }

    case DELETE_INTERVIEW: {
      return { ...state, appointments: action.appointments}
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData(initial) {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday", 
    days: [], 
    appointments: {}, 
    interviewers: {}
  });
  
  const setDay = (day) => { 
    dispatch({type: SET_DAY, day})
  };

  useEffect(() => {
    const days = axios.get("/api/days")
    const appointments = axios.get("/api/appointments")
    const interviewers = axios.get("/api/interviewers")
    Promise.all([
      Promise.resolve(days),
      Promise.resolve(appointments),
      Promise.resolve(interviewers)
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, days:all[0].data, appointments:all[1].data, interviewers:all[2].data })
      }
    )
  }, [])

  function bookInterview(id, interview) {
    // copies specific appointment object with id, as well as the interview object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //Now we have a single appointment object, update this appointment in the appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //make request to save the appointment
      return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, appointments })
        // dispatch({ type: SPOT_AVAILABLE, id:id})
      })
  }

  function deleteInterview(id) {
    //set appointment interview to null
   const appointment = {
     ...state.appointments[id],
     interview: null
   };
   const appointments ={
     ...state.appointments,
     [id]: appointment
   };
   return axios.delete(`/api/appointments/${id}`)
   .then(()=> {
    dispatch({ type: DELETE_INTERVIEW, appointments })
    // dispatch({ type: SPOT_AVAILABLE, id:id})
   })
 }

 return {
   state,
   setDay,
   bookInterview,
   deleteInterview
 }
}
