import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getselectedPost, getComments, voteChange, editComments, commentChange, addComment, changeOrder, deleteComment, postVote } from '../actions'

import VoteButton from './VoteButton';
import OrderSelect from  './OrderSelect';
import CommentBox from './CommentBox';
import PostBox from './PostBox';
class SelectedPost extends Component {
    state = {

    }
    componentDidMount(){
        this.props.ongetselectedPost(this.props.match.params.id);
        this.props.ongetComments(this.props.match.params.id);
    }
    getCommentID(){
        return Math.random().toString(36).substr(-8)
    }
    editComment(id){
        const comments = [...this.props.comments]
        const dataSet = comments.map(item => {
            if(item.id === id){
              item.editable = !item.editable;
            }
            return item;
        });
        this.props.oneditComment(dataSet)
    }
    sortedComments(){
        const { comments, orderList } = this.props
        let allComments = comments;
        allComments = allComments.sort((a, b) => b[orderList.sortOrder] - a[orderList.sortOrder]);
        allComments = allComments.filter(comment => !comment.deleted);
        return allComments
    }    
    render(){
        const {posts, loadreducer, onPostVote, onVoteChange, oncommentChange, onaddComment, orderList, onOrderChange, ondeleteComment} = this.props;
        return(
            <div>
            {
              loadreducer.isLoading ? 
                <div className="pre-loader">
                  <i className="fa-li fa fa-spinner fa-spin"></i>
                </div> :
                <div >
                <div className="col-md-12 post content-container">
                    <PostBox post={posts.post} onVoteChange={(id, vote) => onPostVote(id, vote)}/>
                </div>
                <div className="col-md-12 content-container comment">
                    <div className="row">
                        <div className="col-md-12">
                            <textarea className="form-class" placeholder="New Comment" style={{"padding":"3","width":"100%","resize":"none","border":"none"}} type="text" ref="newbodytxt"></textarea>
                            <button onClick={() => {
                                const comment = {"id":this.getCommentID(), "parentId":this.props.match.params.id, "body": this.refs.newbodytxt.value, "author": "thingtwo", "timestamp": new Date().getTime()}
                                onaddComment(this.getCommentID(), comment)}
                            } className="btn btn-primary btn-xs" ><i className="fa fa-check "></i> </button>
                            <button onClick={() => this.setState({newComment:!this.state.newComment})} className="btn btn-default btn-xs"><i className="fa fa-times"></i> </button>   
                        </div>
                    </div>
                </div>
                <div>
                    <OrderSelect 
                        orderList={orderList.all}
                        onOrderChange={sortOrder => {
                        onOrderChange({sortOrder})
                    }}/> 
                </div>
                {this.sortedComments().map(comment => {
                    return  <li className="col-md-12 comment" key={comment.id}>
                                <div className="col-md-1">
                                    <VoteButton id={comment.id} onVoteChange={(id, vote) =>{onVoteChange(id, vote)}} score={comment.voteScore} /> 
                                </div>    
                                {comment.editable ?
                                <div  className="col-md-11 content-body">
                                    <textarea style={{"width":"100%","resize":"none"}} ref="bodytxt" defaultValue={comment.body}></textarea>
                                    <button title="save" onClick={() => oncommentChange(comment.id, this.refs.bodytxt.value)} className="btn btn-primary btn-xs"><i className="fa fa-check"></i> </button>
                                    <button title="cancel" onClick={() => this.editComment(comment.id)} className="btn btn-xs btn-default"><i className="fa fa-times"></i> </button>
                                </div> :
                                <div className="col-md-11">
                                    <CommentBox editComment={() => this.editComment(comment.id)} ondeleteComment={() => ondeleteComment(comment.id)} comment={comment}/>
                                </div>    
                                }
                            </li>
                    })
                }  
                </div >             
                
            }
            </div> 
        )
    }
};


function mapStateToProps(state){
    return{
        posts: state.posts,
        loadreducer: state.loadreducer,
        comments: state.comments.comments,
        orderList: state.order
    }
}

function mapDispatchToProps (dispatch) {
    return {
        ongetselectedPost: (id) => dispatch(getselectedPost(id)),
        onPostVote: (id, vote) => dispatch(postVote(id, vote, "post")),
        ongetComments: (id) => dispatch(getComments(id)),
        onVoteChange: (id, vote) => dispatch(voteChange(id, vote)),
        oneditComment: (comments) => dispatch(editComments(comments)),
        oncommentChange: (id, comments) => dispatch(commentChange(id, comments)),
        onaddComment: (id, comments) => dispatch(addComment(id, comments)),
        onOrderChange: (data) => dispatch(changeOrder(data)),
        ondeleteComment: (id) => dispatch(deleteComment(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedPost)


