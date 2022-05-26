import React, {
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { DateTime } from 'luxon'

import greeting from 'lib/greeting'

import Calendar from 'src/models/Calendar'
import Event from 'src/models/Event'
import AccountContext from 'src/context/accountContext'

import List from './List'
import EventCell from './EventCell'

import style from './style.scss'

import Dropdown from '../Dropdown'
import DepartmentFilter from '../DepartmentFilter'

export type AgendaItem = {
  calendar: Calendar
  event: Event
}

const compareByDateTime = (a: AgendaItem, b: AgendaItem) =>
  a.event.date.diff(b.event.date).valueOf()

/**
 * Agenda component
 * Displays greeting (depending on time of day)
 * and list of calendar events
 */

const Agenda = (): ReactElement => {
  const account = useContext(AccountContext)

  /**
   * Lvl 3 & 4 Add Calendar & Department Filter
   * Detect change in calendar selection
   * Detect change in department toggle
   */
  const [selectedCalendar, setSelectedCalendar] = useState('')
  const [departmentView, setDepartmentView] = useState(false)

  const events: AgendaItem[] = useMemo(
    () =>
      account.calendars
        .filter(
          (calendar) => !selectedCalendar || calendar.id === selectedCalendar,
        )
        .flatMap((calendar) =>
          calendar.events.map((event) => ({ calendar, event })),
        )
        .sort(compareByDateTime),
    [account, selectedCalendar],
  )

  /**
   * Lvl 3 Add Calendar Filter
   * Handle calendar change
   */
  const onCalendarChange = useCallback(
    (e) => {
      setSelectedCalendar(e.target.value)
    },
    [account.calendars],
  )

  /**
   * Lvl 4 Add Department Filter
   * Handle department toggling
   */
  const deptFilter = useMemo(() => {
    const departments = events.map(({ event }) => event.department)
    return departments.filter((department, index) => {
      return departments.indexOf(department) === index
    })
  }, [events])

  /**
   * Lvl 1 Bugfix
   * useMemo was missing its dependency
   */
  const title = useMemo(
    () => greeting(DateTime.local().hour),
    [DateTime.local().hour],
  )

  return (
    <div className={style.outer}>
      <div className={style.container}>
        <div className={style.header}>
          <span className={style.title}>{title}</span>

          <Dropdown
            calendars={account.calendars}
            selectedCalendar={selectedCalendar}
            onCalendarChange={onCalendarChange}
          />
        </div>
        <div className={style.header}>
          <button onClick={() => setDepartmentView(!departmentView)}>
            Toggle View
          </button>
        </div>
        {departmentView ? (
          <List>
            {deptFilter.map((department, index) => (
              <DepartmentFilter
                key={index}
                department={department}
                events={events}
              />
            ))}
          </List>
        ) : (
          <List>
            {events.map(({ calendar, event }) => (
              <EventCell key={event.id} calendar={calendar} event={event} />
            ))}
          </List>
        )}
      </div>
    </div>
  )
}

export default Agenda
