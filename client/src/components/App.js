import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import * as moment from 'moment';
import './App.css';

class App extends Component {

  state = {
    categories: [],
    posts: [],
    category: "all",
    sortOrder: "voteScore"
  }

  componentDidMount(){
    this.getCategories();
  }

  getCategories(){
    ReadableAPI.getAllCategories().then(catlist => {
      const categories = catlist.categories;
      this.setState({categories});
      this.getPosts();
    });
  }

  getPosts(){
    ReadableAPI.getAllPost().then(posts => {
      this.sortedData(posts, this.state.sortOrder)
    });
  }

  sortedData(posts, sortOrder){
    posts = posts.sort((a, b) => b[sortOrder] - a[sortOrder]);
    this.setState({posts})
  }

  render() {
    return (
      <div className="container">
        <div className="page-header">
            <h1>Readable</h1>
        </div>
          <div className="row">
            <div className="col-md-2">
              <select onChange={e => this.setState({category: e.target.value})} value={this.state.category}>
                <option value="all">All Categories</option>
                {this.state.categories.map(category => 
                    <option key={category.name} value={category.name}>{category.name}</option>
                )}
              </select>
              </div>
            <div className="col-md-3">
              Order By: <select onChange={e => {
                                                this.setState({sortOrder: e.target.value})
                                                this.sortedData(this.state.posts, e.target.value)
                                              }} value={this.state.sortOrder}>
                          <option value="voteScore">Vote Score</option>
                          <option value="timestamp">Time</option>
                        </select>
              </div>
            <div className="col-md-6">
                <button className="btn btn-primary">Add Post</button>
            </div>
          </div>
          <div className="row">
          <div className="col-md-12">
             <ol>
              {
                this.state.posts.map(post => {
                  const timeStamp = moment(post.timestamp).format('MMMM DD, YYYY HH:MM');
                  return <li key={post.id} className="post-container">
                    <h4><span className="badge">{post.voteScore}</span> {post.title}</h4>
                    <div>{post.body}</div>
                    <div className="time-stamp">{timeStamp}</div>
                  </li>
                })
              }
             </ol>
             </div>   
          </div>
        </div>
    );
  }
}

export default App;
