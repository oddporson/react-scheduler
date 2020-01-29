export function getAppointmentsForDay(state, day) { // (state, "Monday") < -- from selector.test.js on line 47
  const days = state.days;
  const appointments = state.appointments;
  const result = [];

  for (let weekday of days) {
    // console.log("should loop through days object -->", days);
    if(weekday.name === day) {
      // console.log("weekday.name -->", weekday.name)
      for(let appointment of weekday.appointments) {
        // console.log("weekday.appointments -->", weekday.appointments)
        result.push(appointments[appointment])
        // console.log("this should be result -->", result)
      }
    }
  }
  return result;
}

export function getInterview (state, interview) {
  const interviewers = state.interviewers;
  // console.log("should show object of interviewers -->", interviewers)
  const result = {}
  if (!interview) {
    return null;
  }
  result["student"] = interview.student;
  // console.log("this is student -->", ["student"]);
  // console.log("name of student -->", interview.student);
  result["interviewer"] = interviewers[interview.interviewer];
  // console.log("interviewer name -->", interviewers[interview.interviewer])

  return result;
}


export function getInterviewersForDay (state, day) {
  const days = state.days;
  const interviewers = state.interviewers;
  // console.log("interviewer id -->", interviewers)
  const result = [];
  

  for (let weekday of days) {
    // console.log("it should loop through key values of days object -->", days);
    if(weekday.name === day) {
      // console.log("day -->", day);
      // console.log("should list each weekday -->", weekday.name) 
      for (let interviewersDay of weekday.interviewers) {
        // console.log("weekday interviewers WHERE ARE YOU!?!?!?!?!? -->", weekday.interviewers)
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
