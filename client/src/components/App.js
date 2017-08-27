import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as ReadableAPI from '../utils/ReadableAPI';
import NotFound from './NotFound';
import CategorySelect from  './CategorySelect';
import OrderSelect from  './OrderSelect';
import * as moment from 'moment';
import './App.css';

class App extends Component {

  state = {
    categories: [],
    allPosts: [],
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
      this.setState({allPosts: posts})
      this.sortedData(posts, this.state.sortOrder, this.state.category)
    });
  }

  sortedData(posts, sortOrder, category){
    posts = posts.sort((a, b) => b[sortOrder] - a[sortOrder]);
    posts = category !== "all" ? posts.filter(post => post.category === category) : posts;
    this.setState({posts})
  }

  getComments(id){
    ReadableAPI.getComments(id).then(comments => {
      console.log(comments)
    });
  }

  render() {
    return (
        <div className="container">
            <div className="page-header">
                <h1>Readable</h1>
            </div>
        <Switch>
          <Route exact path="/" render={() =>
            <div>
              <div className="row">
                <div className="col-md-2">
                  <CategorySelect 
                    categories={this.state.categories} 
                    category={this.state.category} 
                    onCategoryChange={category => {
                      this.setState({category})
                      this.sortedData(this.state.allPosts, this.state.sortedData, category)
                    }}/>
                </div>
                <div className="col-md-3">
                    <OrderSelect 
                      sortOrder={this.state.sortOrder} 
                      onOrderChange={sortOrder => {
                        this.setState({sortOrder})
                        this.sortedData(this.state.allPosts, sortOrder, this.state.category)
                    }}/>        
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
                      return <li onClick={() => {this.getComments(post.id)}} key={post.id} className="post-container">
                        <h4><span className="badge">{post.voteScore}</span> {post.title}</h4>
                        <div>{post.body}</div>
                        <div className="time-stamp">{timeStamp}</div>
                      </li>
                    })
                  }
                 </ol>
                 </div>   
              </div>
            </div>}
           /> 
          <Route component={NotFound}/>
        </Switch>
        </div>
    );
  }
}

export default App;
