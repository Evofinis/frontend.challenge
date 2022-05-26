import React, { ReactElement } from 'react'

import Calendar from 'src/models/Calendar'

import style from './styles.scss'

interface Props {
  calendars: Calendar[]
  selectedCalendar: string
  onCalendarChange: (event: any) => void
}

const CalendarFilter = ({
  calendars,
  selectedCalendar,
  onCalendarChange,
}: Props): ReactElement => {
  return (
    <div className={style.dropdownContainer}>
      <label>Calendar:</label>
      <select value={selectedCalendar} onChange={onCalendarChange}>
        <option value={''}>{'All'}</option>
        {calendars.map((calendar) => {
          return (
            <option key={calendar.id} value={calendar.id}>
              {calendar.color}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default CalendarFilter
