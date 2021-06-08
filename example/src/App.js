import React from 'react'

import { Calender, useNepaliNUmber } from 'nepali-calendar-react'
import 'nepali-calendar-react/index.css'

const App = () => {
  // console.log(useNepaliNUmber(55))

  return (
    <Calender
      language='nepali'
      onDateClicked={(result) => console.log(result)}
      dayClickBehaviour='single'
      mode='monthly'
      // startDate='2020/10/21'
    />
  )
}

export default App
