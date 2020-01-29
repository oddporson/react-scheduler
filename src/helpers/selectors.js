export function getAppointmentsForDay(state, day) { // (state, "Monday") < -- from selector.test.js on line 47
  const days = state.days;
  const appointments = state.appointments;
  const result = [];

  for (let weekday of days) {
    if(weekday.name === day) {
      for(let appointment of weekday.appointments) {
        result.push(appointments[appointment])
      }
    }
  }
  return result;
}

export function getInterview (state, interview) {
  const interviewers = state.interviewers;
  const result = {}
  if (!interview) {
    return null;
  }
  result["student"] = interview.student;
  result["interviewer"] = interviewers[interview.interviewer];
  return result;
}


export function getInterviewersForDay (state, day) {
  const days = state.days;
  const interviewers = state.interviewers;
  const result = [];
  
  for (let weekday of days) {
    if(weekday.name === day) {
      for (let interviewersDay of weekday.interviewers) {
        result.push(interviewers[interviewersDay]);
      }
    }
  }
      return result;
}

export default function searchDayByAppointment(id, state) {
  for (let i = 0; i < state.days.length; i++) {
    for (let prop of state.days[i].appointments) {
      if (id === prop) {
        return i;
      }
    }
  }
};
