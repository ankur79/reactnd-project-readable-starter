const api = "http://localhost:5001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getAllPost = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data) 
    
export const getCatPost = (cat) =>
  fetch(`${api}/${cat}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)     

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data) 

export const addPost = (id, post) => 
    fetch(`${api}/posts`, { method: "POST" , headers, body: JSON.stringify(post) })
      .then(res => res.json())
      .then(data => data)

export const updatePost = (id, post) => 
    fetch(`${api}/posts/${id}`, { method: 'PUT' , headers, body: JSON.stringify(post) })
      .then(res => res.json())
      .then(data => data)

export const deletePost = (id) => 
    fetch(`${api}/posts/${id}`, { method: 'DELETE' , headers, body: JSON.stringify({"id":id})})
      .then(res => res.json())
      .then(data => data)  

export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)     

export const voteChange = (id, vote, section = 'comments') =>
    fetch(`${api}/${section}/${id}`, { method: 'POST' , headers, body: JSON.stringify({"option":vote}) })
      .then(res => res.json())
      .then(data => data)      

export const updateComment = (id, comment) => 
    fetch(`${api}/comments/${id}`, { method: 'PUT' , headers, body: JSON.stringify({"body":comment, "timestamp":new Date().getTime()}) })
      .then(res => res.json())
      .then(data => data)

export const addComment = (id, comment) => 
    fetch(`${api}/comments`, { method: 'POST' , headers, body: JSON.stringify(comment) })
      .then(res => res.json())
      .then(data => data)      

export const deleteComment = (id) => 
    fetch(`${api}/comments/${id}`, { method: 'DELETE' , headers, body: JSON.stringify({"id":id}) })
      .then(res => res.json())
      .then(data => data)           
      


