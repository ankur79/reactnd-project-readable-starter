import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { addPost, editPost } from '../actions'
import CategorySelect from  './CategorySelect';
class AddPost extends Component {
    state = {
      postContent: {
        id: this.props.match.params.id,
        timestamp: new Date().getTime(),
        title: "",
        body: "",
        owner: "localUser",
        category: ""
      }
    }

    componentDidMount(){
      const current =  this.state.postContent;
      console.log(this.props)
      if(this.props.match.params.kind === "edit"){
        const post = this.props.posts.posts.filter(post => post.id === this.props.match.params.id);
        this.setState({postContent : Object.assign(current, post[0])});
        //this.setState({postContent : {...current, "category":post[0].category}})
      }
    }
    titleChange(e){
      const current =  this.state.postContent;
      this.setState({postContent : {...current, "title":e.target.value}});
    }
    bodyChange(e){
      const current =  this.state.postContent;
      this.setState({postContent : {...current, "body":e.target.value}});
    }
    catSelect(cat){
      const current =  this.state.postContent;
      this.setState({postContent : {...current, "category":cat}});
    }
    submitChange(){
      const method = this.props.match.params.kind === "new" ? "addPost" : "editPost";
      this.props[method](this.state.postContent.id, this.state.postContent);
    }
    render(){
      const {categoryList} = this.props;
      const postKind = this.props.match.params.kind;
      return (
        <div className="col-md-12">
          <div className="form-horizontal">
            <div className="form-group">
              <label htmlFor="inputTitle" className="col-md-2 control-label">Title</label>
              <div className="col-md-10">
                <input type="text" value={this.state.postContent.title} onChange={(e) => this.titleChange(e)} className="form-control" id="inputTitle" placeholder={postKind === "new" ? "New Title" : "Edit Title"}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="bodyTxt" className="col-md-2 control-label">Body</label>
              <div className="col-md-10">
              <textarea value={this.state.postContent.body} onChange={(e) => this.bodyChange(e)} className="form-control" id="bodyTxt" rows="3" placeholder={postKind === "new" ? "New Post" : "Edit Post"}></textarea>
              </div>
            </div>
            <div className="form-group">
            <label className="col-md-2 control-label">Category</label>
            <div className="col-md-10">
              <CategorySelect categories={categoryList.categories} onCategoryChange={(cat) => this.catSelect(cat)} category={this.state.postContent.category} />
            </div>
          </div>

            <div className="form-group">
              <div className="col-sm-offset-2 col-md-10">
                <button onClick={() => this.submitChange()} className="btn btn-primary">Save</button>
                <Link to="/" className="btn btn-default">Cancel</Link>
              </div>
            </div>
          </div>
          </div>
      )
    }
};

function mapStateToProps(state){
  console.log(state)
  return{
    categoryList: state.categories,
    posts: state.posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (id, post) => dispatch(addPost(id, post)),
    editPost: (id, post) => dispatch(editPost(id, post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost)
