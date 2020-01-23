const getAppointmentsForDay = function(state, day) {
  const findDay = state.days.find(weekday => (weekday.name === day ));
    if(!findDay) {
      return [];
    }
  const arrayReturned = findDay.appointments.map(id => state.appointments[id])
    return arrayReturned;
}

module.exports = { getAppointmentsForDay }
