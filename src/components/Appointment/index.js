import React from "react";
import "components/Appointment/styles.scss";


// Displays Appointment
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

import useVisualMode from "hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // save function that is passed to onSave={save};
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }  
  // delete function for user after they save an appointment
  function deleteAppointment() { // issue?
    // return () => {
      transition(DELETE);
      props.deleteInterview(props.id)
      .then(()=>transition(EMPTY));
    // }
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.interview ? <Show student={props.interview. student} interviewer={props.interview.interviewer} /> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteAppointment} // issue?
        />
      )}
      {mode === CREATE && (
        <Form 
        interviewers={props.interviewers} 
        onSave={save} 
        onCancel={() => back()} 
        />
      )}
      {mode === SAVING && (<Status message="Saving..."/>)}
      {mode === DELETE && (<Status message="Deleting..."/>)}
      {/* issue ^? */}


    </article>
  )
}
