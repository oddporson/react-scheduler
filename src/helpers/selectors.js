const getAppointmentsForDay = (state, day) => {

  const findDay = state.days.find(weekDay => (weekDay.name === day ));
  if(!findDay) {
      return [];
  }  
  const arrayReturned = findDay.appointments.map(id => state.appointments[id])
    return arrayReturned; 
  
}

const getInterview = (state, interview) => {

  // getInterview returns null if no interview is booked
  if(!interview) {
    return null;
  }
  
  // getInterview returns an object with the interviewer data 
  const interviewObj = {};
  interviewObj.student = interview.student;
  interviewObj.interviewer = state.interviewers[interview.interviewer];
  return interviewObj;
}

module.exports = { getAppointmentsForDay, getInterview }
