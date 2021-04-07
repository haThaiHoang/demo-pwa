import moment from 'moment'
import React from 'react'

export default class Format {
  static numeric = (number) => (number || 0).toLocaleString(
    undefined, { minimumFractionDigits: 0 }
  )

  static DATE = {
    SHORT_DATE: 'YYYY-MM-DD'
  }

  static date = (date, format) => (date ? moment(date).format(format) : '')

  static time = (time, format) => (time ? moment(time, 'HH:mm:ss').format(format || 'HH:mm') : '')

  static dateNormal = (date) => moment(date).format('YYYY年MM月DD日')

  static dateFull = (date) => moment(date).format('YYYY年MM月DD日 dd')

  static dateNoYear = (date) => `${moment(date).format('MM月DD日 (ddd)')}`

  static combineDateTimes = (startDateTime, endDateTime, dateFormat, timeDivideLetter = ' 〜 ') => {
    dateFormat = dateFormat || 'YYYY年MM月DD日（ddd）'

    if (
      moment(startDateTime).format(Format.DATE.SHORT_DATE)
        === moment(endDateTime).format(Format.DATE.SHORT_DATE)
    ) {
      return startDateTime ? moment(startDateTime).format(`${dateFormat}HH:mm${timeDivideLetter}`) + (
        endDateTime ? moment(endDateTime).format('HH:mm') : ''
      ) : (
        <>
          -
          <br />
          -
        </>
      )
    }

    return (
      <>
        {startDateTime ? moment(startDateTime).format(`${dateFormat}HH:mm 開始`) : '-' }
        <br />
        {endDateTime ? moment(endDateTime).format(`${dateFormat}HH:mm 終了`) : '-'}
      </>
    )
  }
}
