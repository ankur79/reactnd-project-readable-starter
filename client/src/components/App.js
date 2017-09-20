import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeOrder, changeCategory, categoryFetchData, postsFetchData, postsFetchCatData, postVote, deletePost } from '../actions';
import CategorySelect from  './CategorySelect';
import OrderSelect from  './OrderSelect';
import PostBox from './PostBox';
import './App.css';

class App extends Component {

  componentDidMount(){
    this.initData();
  }

  initData(){
    if(this.props.match.url === "/"){
      this.props.oncategoryFetchData();
      this.props.onpostsFetchData();
    }else{
      this.props.onpostsFetchCatData(this.props.match.params.id);
    }
  }

  getGuid(){
    return "a"+new Date().getTime();
  }

  sortedData(){
    const { posts, categoryList, orderList } = this.props
    let allPosts = posts.posts === undefined ? [] : posts.posts;
    allPosts = allPosts.sort((a, b) => b[orderList.sortOrder] - a[orderList.sortOrder]);
    allPosts = categoryList.category !== "all" ? allPosts.filter(post => post.category === categoryList.category) : allPosts;
    allPosts = allPosts.filter(item => !item.deleted);
    return allPosts
  }

  render() {
    const {match, orderList, onOrderChange, categoryList, onCategoryChange, loadreducer, onVoteChange, onDeletePost} = this.props;
    return (
      <div>
        <div>
          {
            loadreducer.isLoading ? 
              <div className="pre-loader">
                <i className="fa-li fa fa-spinner fa-spin"></i>
              </div> : ""
          }
        </div>        
        <div>
          <div className="row">
            {
              match.url === "/" ? 
                <div className="col-md-2">
                    <CategorySelect 
                      categories={categoryList.categories} 
                      category={categoryList.category} 
                      onCategoryChange={category => {
                        onCategoryChange({category})
                      }}/> 
                </div> : ""
            }
            <div className="col-md-3">
                <OrderSelect 
                  orderList={orderList.all}
                  onOrderChange={sortOrder => {
                    onOrderChange({sortOrder})
                }}/>        
            </div>
            <div className="col-md-6">
                <Link to={"/add/new/"+this.getGuid()} className="btn btn-primary">Add Post</Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <ol>
              {
                this.sortedData().map(post => {
                  return <li key={post.id} className="col-md-12 post content-container">
                            <PostBox post={post} onDeletePost={(id) => onDeletePost(id)} onVoteChange={(id, vote) => onVoteChange(id, vote)}/>
                        </li>
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
    onpostsFetchCatData: (data) => dispatch(postsFetchCatData(data)),
    onVoteChange: (id, vote) => dispatch(postVote(id, vote)),
    onDeletePost: (id) => dispatch(deletePost(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

