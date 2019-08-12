/* eslint-disable no-useless-escape */
export function isContainUpperCase (str) {
  const regEx = /^[A-Z]/

  for (let i = 0; i < str.length; i++) {
    if (regEx.test(str[ i ])) return true
  }
  return false
}

export function isContainLowerCase (str) {
  const regEx = /^[a-z]/

  for (let i = 0; i < str.length; i++) {
    if (regEx.test(str[ i ])) return true
  }

  return false
}

export function isContainSpecialCharacter (str) {
  const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

  return format.test(str)
}

export function isContainNumber (str) {
  const regEx = new RegExp('[0-9]+')

  for (let i = 0; i < str.length; i++) {
    if (regEx.test(str[ i ])) return true
  }

  return false
}

export function isEmailValid (str) {
  const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return regEx.test(str)
}
