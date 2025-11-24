const API_URL = 'http://localhost:8000'

const checkError = (res) => {
  if (!res.ok) {
    throw Error(String(res.status));
  }
  return res
}

const checkErrorJson = (res) => {
  if (!res.ok) {
    throw Error(String(res.status));
  }
  if (res.status === 204) {
    return {}
  }

  return res.json()
}


const catchError = (err) => {
  if (err.message === '401') {
    window.location.href = "/login"
  } else {
    throw err;
  }
}

export const fetchWithResponse = (resource, options) => fetch(`${API_URL}/${resource}`, options)
  .then(checkErrorJson)
  .catch(catchError)

export const fetchWithoutResponse = (resource, options) => fetch(`${API_URL}/${resource}`, options)
  .then(checkError)
  .catch(catchError)
