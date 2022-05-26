import React, { ReactElement } from 'react'

import { AgendaItem } from '../Agenda/index'
import List from '../Agenda/List'
import EventCell from '../Agenda/EventCell'

import style from './styles.scss'

interface Props {
  department: string | null
  events: AgendaItem[]
}

const DepartmentCell = ({ department, events }: Props): ReactElement => {
  return (
    <div className={style.outer}>
      <div className={style.titleContainer}>
        <div className={style.title}>
          <span>{department || 'No Department'}</span>
        </div>
      </div>
      <List>
        {events
          .filter(({ event }) => event.department === department)
          .map(({ calendar, event }) => (
            <EventCell key={event.id} calendar={calendar} event={event} />
          ))}
      </List>
    </div>
  )
}

export default DepartmentCell
