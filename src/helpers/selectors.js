const getAppointmentsForDay = function(state, day) {
  const findDay = state.days.find(weekDay => (weekDay.name === day ));
  // console.log("state days--->:", state.days);
  // console.log("day --->", day);
  if(!findDay) {
      return [];
    }
    
    const arrayReturned = findDay.appointments.map(id => state.appointments[id])
    return arrayReturned; 
  
}

module.exports = { getAppointmentsForDay }

  // console.log("state days--->:", state.days.find)
  // console.log("day -->", day)
  // const foo = state.days;
  // console.log("woah -->", foo)
  // console.log("name -->", foo.name)
