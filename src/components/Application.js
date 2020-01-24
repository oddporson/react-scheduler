import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  { 
    id:3,
    time: "2pm"
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Bruce Wayne",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Talia al Ghul",
      interviewer: {
        id: 3,
        name: "Mildred Nazir", 
        avatar: "https://i.imgur.com/T2WwVfS.png"
      }
    }
  }
];


export default function Application(props) {
 
  const [state, setState] = useState({day: "Monday", days: [], appointments: {}})
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));


  useEffect(() => {

    const days = axios.get("/api/days")
    const appointments = axios.get("/api/appointments")
    
    Promise.all([
      Promise.resolve(days),
      Promise.resolve(appointments)
    ]).then((all) => 
      console.log(all)
    )
  }, [])

  const ScheduleList = appointments.map((appointment) => (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
      />
  ));
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
              days={state.days}
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
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {ScheduleList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
