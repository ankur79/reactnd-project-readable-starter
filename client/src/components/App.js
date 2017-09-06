import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { changeOrder, changeCategory, categoryFetchData, postsFetchData, fetchPost } from '../actions'
import * as ReadableAPI from '../utils/ReadableAPI';

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
    this.props.oncategoryFetchData();
    this.props.onpostsFetchData();
  }

  getPosts(){
    this.props.onpostsFetchData();
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

  getselectedPost(id){
    const len = Object.keys(this.props.selectedPost.post).length;
    if(len === 0){
      ReadableAPI.getPost(id).then(post => {
        this.props.onfetchPost({post})
      });
    }
  }

  render() {
    const {orderList, onOrderChange, categoryList, onCategoryChange, loadreducer} = this.props

    return (
      <div >
        <div >
          {
            loadreducer.isLoading ? 
              <div className="pre-loader">
                <i className="fa-li fa fa-spinner fa-spin"></i>
              </div> : ""
          }
        </div>        

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
                    <Link to="/posts/add" className="btn btn-primary">Add Post</Link>
                </div>
              </div>
              <div className="row">
              <div className="col-md-12">
                 <ol>
                  {
                    this.sortedData().map(post => {
                      const timeStamp = moment(post.timestamp).format('MMMM DD, YYYY HH:MM');
                      return <Link key={post.id} to={`/posts/${post.id}`}>
                        <li className="post-container">
                          <h4><span className="badge">{post.voteScore}</span> {post.title}</h4>
                          <div>{post.body}</div>
                          <div className="time-stamp">{timeStamp}</div>
                        </li>
                      </Link>
                    })
                  }
                 </ol>
                 </div>   
              </div>
            </div>
        </div>
    );
  }
}


function mapStateToProps(state){
  return{
    orderList: state.order,
    categoryList: state.categories,
    posts: state.posts,
    selectedPost: state.selectedPost,
    loadreducer: state.loadreducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onOrderChange: (data) => dispatch(changeOrder(data)),
    onCategoryChange: (data) => dispatch(changeCategory(data)),
    oncategoryFetchData: () => dispatch(categoryFetchData()),
    onpostsFetchData: () => dispatch(postsFetchData()),
    onfetchPost: (data) => dispatch(fetchPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

