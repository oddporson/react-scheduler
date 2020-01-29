import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {

  const [state, setState] = useState({
    day: "Monday", 
    days: [], 
    appointments: {}, 
    interviewers: {}
  });
  const setDay = day => setState({ 
    ...state, 
    day 
  });

  useEffect(() => {
    const days = axios.get("/api/days")
    const appointments = axios.get("/api/appointments")
    const interviewers = axios.get("/api/interviewers")
    Promise.all([
      Promise.resolve(days),
      Promise.resolve(appointments),
      Promise.resolve(interviewers)
    ]).then((all) => {
      setState( prev => ({ ...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data }));
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
    };g
    //make request to save the appointment
      return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments
        });
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
     setState({
       ...state,
       appointments
     });
   })
 }

 return {
   state,
   setDay,
   bookInterview,
   deleteInterview
 }
}
