/* eslint-disable no-undef */
const baseUrl = process.env.REACT_APP_API_BASE_URL || 'https://api.chatmantics.com/dev/'

const composeUrl = (url) => {
  return url.replace('https://api.chatmantics.com/dev/', baseUrl)
}
export const postJSON = function (url, body, token) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token || ''
  }

  return fetch(composeUrl(url), {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(resp => resp.json())
    .catch(_err => {
    })
}

export const getJSON = function (url, token) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token || ''
  }

  return fetch(composeUrl(url), {
    method: 'GET',
    headers: headers
  }).then(resp => resp.json())
  .catch(err => {
    console.log(err);
  })
}

export const getResponse = function (url, token) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token || ''
  }

  return fetch(composeUrl(url), {
    method: 'GET',
    headers: headers
  }).then(resp => resp)
}
