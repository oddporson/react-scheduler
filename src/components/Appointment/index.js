import React from "react";
import "components/Appointment/styles.scss";

// Displays Appointment
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? <Show student={props.interview.interviewer} interviewer={props.interview.interviewer} /> : <Empty />}
    </article>
  )
}
