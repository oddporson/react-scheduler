import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode"

// below are for modes
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

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
    .then(() => transition(SHOW))
    .catch(err => {
      transition(ERROR_SAVE, true);
   console.log("show saving error -->", err);
    })
  } 

  // delete function for user after they save an appointment
  function deleteAppointment() {
      transition(DELETE, true);
      props.deleteInterview(props.id)
      .then(()=>transition(EMPTY))
      .catch(err => {
        transition(ERROR_DELETE, true);
        console.log("show delete error -->", err);
      })
  }

  // delete confirmation function
  function confirmDelete() {
    transition(CONFIRM);
  };
  
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
      {mode === ERROR_SAVE && (
        <Error
          message="Error occured when saving"
          onClose={()=> back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
        message="Error occured when deleting"
        onClose={()=> back()}
        />
      )}
    </article>
  )
}
