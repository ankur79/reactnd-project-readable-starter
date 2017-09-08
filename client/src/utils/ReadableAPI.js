const api = "http://localhost:5001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getAllPost = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)    

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data) 

export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)     

export const voteChange = (id, vote) =>
    fetch(`${api}/comments/${id}`, { method: 'POST' , body: JSON.stringify(vote), headers })
      .then(res => res.json())
      .then(data => data)         


