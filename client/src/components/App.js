import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { changeOrder, changeCategory, fetchCategory, fetchPosts } from '../actions'
import * as ReadableAPI from '../utils/ReadableAPI';
import NotFound from './NotFound';
import CategorySelect from  './CategorySelect';
import OrderSelect from  './OrderSelect';
import * as moment from 'moment';
import './App.css';

class App extends Component {

  state = {
    allPosts: []
  }

  componentDidMount(){
    this.getCategories();
  }

  getCategories(){
    ReadableAPI.getAllCategories().then(catlist => {
      const categories = catlist.categories;
      this.props.onfetchCategory({categories})
      this.getPosts();
    });
  }

  getPosts(){
    ReadableAPI.getAllPost().then(posts => {
      this.props.onfetchPosts({posts})
    });
  }

  sortedData(){
    const { posts, categoryList, orderList } = this.props
    let allPosts = posts.posts;
    allPosts = allPosts.sort((a, b) => b[orderList.sortOrder] - a[orderList.sortOrder]);
    allPosts = categoryList.category !== "all" ? allPosts.filter(post => post.category === categoryList.category) : allPosts;
    return allPosts
  }

  getComments(id){
    ReadableAPI.getComments(id).then(comments => {
      console.log(comments)
    });
  }

  render() {
    const {orderList, onOrderChange, categoryList, onCategoryChange} = this.props
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
                    categories={categoryList.categories} 
                    category={categoryList.category} 
                    onCategoryChange={category => {
                      onCategoryChange({category})
                    }}/>
                </div>
                <div className="col-md-3">
                    <OrderSelect 
                      orderList={orderList.all}
                      onOrderChange={sortOrder => {
                        onOrderChange({sortOrder})
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
                    this.sortedData().map(post => {
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


function mapStateToProps(state){
  return{
    orderList: state.order,
    categoryList: state.categories,
    posts: state.posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onOrderChange: (data) => dispatch(changeOrder(data)),
    onCategoryChange: (data) => dispatch(changeCategory(data)),
    onfetchCategory: (data) => dispatch(fetchCategory(data)),
    onfetchPosts: (data) => dispatch(fetchPosts(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

