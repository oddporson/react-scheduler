import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
 
  const [state, setState] = useState({day: "Monday", days: [], appointments: {}, interviewers: {}});
  const setDay = day => setState({ ...state, day });
 



  useEffect(() => {
    const days = axios.get("/api/days")
    const appointments = axios.get("/api/appointments")
    const interviewers = axios.get("/api/interviewers")
    Promise.all([
      Promise.resolve(days),
      Promise.resolve(appointments),
      Promise.resolve(interviewers)
    ]).then((all) => {
      // console.log(all)
      setState( prev => ({ ...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data }));
      }
    )
  }, [])

 
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview); 
    // console.log("lhl ",interview);

    function bookInterview(id, interview) {
      return new Promise((resolve, reject) => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        return axios.put(`/api/appointments/${id}`, { interview })
        .then(() => {
          setState({
            ...state,
            appointments
          });
          resolve();
        })
      })
    }

   

    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img 
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days} // this is not an object. this is property-value pairs. similarity to key-value pairs in object.
              day={state.day}
              setDay={setDay}
            />
          </nav>
          <img 
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" interviewers={ state.interviewers } />
      </section>
    </main>
  );

} // ends Application function
