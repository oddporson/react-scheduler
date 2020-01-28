import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

import useVisualMode from "hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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
  function deleteAppointment() {
      transition(DELETE);
      props.deleteInterview(props.id)
      .then(()=>transition(EMPTY));
  }

  function confirmDelete() {
    transition(CONFIRM);
  };
  
  console.log("Why is interviewer undefined?-->", props.interviewer)
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty 
          onAdd={() => transition(CREATE)} 
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          onEdit={()=> transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
        interviewers={props.interviewers} 
        onSave={save} 
        onCancel={() => back()}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving..."
        />
      )}
      {mode === DELETE && (
        <Status message="Deleting..."
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          onConfirm={deleteAppointment}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={()=> {back()}}
        />
      )}

    </article>
  )
}
