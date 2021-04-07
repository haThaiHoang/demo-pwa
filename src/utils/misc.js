import lodash from 'lodash'
import { toFullwidthKana, toFullwidth, toAscii, toHalfwidthKana } from 'japanese-string-utils'

import { LESSON_TYPES } from '@/constants/common'
import Configs from '@/configs'

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

function isFetchError(error) {
  return !!error && lodash.hasIn(error, 'status') && lodash.isFunction(error.json)
}

async function getFetchError(error) {
  try {
    return await error.json()
  } catch (e) {
    return null
  }
}

export default class Misc {
  static IS_MOBILE = isMobile

  static trimObjectProperties = (obj, properties) => {
    const data = lodash.cloneDeep(obj)

    if (lodash.isArray(properties)) {
      properties.forEach((property) => {
        data[property] = data[property]?.trim()
      })
    } else {
      lodash.keys(obj).forEach((key) => {
        data[key] = data[key]?.trim()
      })
    }

    return data
  }

  static getImageURL = (name) => name && `${Configs.API_URL}/${name}`

  static getUrlVars() {
    const vars = {}
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
      vars[key] = value
    })
    return vars
  }

  static getErrorJsonBody = async (error) => {
    if (isFetchError(error)) {
      error = await getFetchError(error)
    }

    return error
  }

  static getName = (person) => {
    const name = `${person.lastname || ''}${person.firstname ? ` ${person.firstname}` : ''}`
    const nameKana = `${person.lastnameKana || ''}${person.firstnameKana ? ` ${person.firstnameKana}` : ''}`
    return `${name || ''}${nameKana ? ` (${nameKana})` : ''}`
  }

  static getPhone = ({ phoneNumber1, phoneNumber2, phoneNumber3 }) => (
    `${phoneNumber1 || ''}${phoneNumber2 ? `-${phoneNumber2}` : ''}${phoneNumber3 ? `-${phoneNumber3}` : ''}`
  )

  static getNameLessonType = (idLesson) => {
    // eslint-disable-next-line no-shadow
    const item = LESSON_TYPES.filter((item) => item.type === idLesson)
    return item && item[0].name
  }

  static checkExitFieldInData = (field, data) => {
    const index = data.findIndex((item) => String(item.value) === String(field))
    if (index !== -1) return field
    return ''
  }

  static checkExistenceOfData = (values) => {
    let fieldErrors = []
    // eslint-disable-next-line no-restricted-syntax
    for (const property in values) {
      if (!values[property]) {
        fieldErrors.push(property)
      }
    }
    return fieldErrors
  }

  static removeNullPropsFromObj = (obj) => lodash.pickBy(obj, (field) => field ?? false)

  static toFullWidth = (string) => (
    toFullwidth(toFullwidthKana(string))
  )

  static toHalfWidth = (string) => (
    toAscii(toHalfwidthKana(string))
  )

  static scrollTo = (element, offset = 200) => {
    const page = document.getElementById('scrollable-page')

    if (element) {
      const { y } = element.getBoundingClientRect()

      page.scroll({
        top: page.scrollTop + y - offset,
        behavior: 'smooth'
      })
    }
  }
}
