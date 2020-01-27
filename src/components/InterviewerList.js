import React from "react";
import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss"



export default function InterviewerList(props) {

  const interviewersListItem = Object.values(props.interviewers).map(interviewer => {
    // props.interviewers was showing undefined. Use object.values to show all objects from fetched data of api/interviewers
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersListItem}</ul>
    </section>
  );
}
