import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getselectedPost, getComments, voteChange} from '../actions'
import * as moment from 'moment';
import VoteButton from '././VoteButton';

class SelectedPost extends Component {
    componentDidMount(){
        this.props.ongetselectedPost(this.props.match.params.id);
        this.props.ongetComments(this.props.match.params.id);
    }
    render(){
        const {post, loadreducer, comments, onVoteChange} = this.props;
        console.log(comments)
        return(
            <div >
            {
              loadreducer.isLoading ? 
                <div className="pre-loader">
                  <i className="fa-li fa fa-spinner fa-spin"></i>
                </div> :
                <div >
                <div className="content-container post">
                    <h4><span className="badge">{post.post.voteScore}</span> {post.post.title}</h4>
                    <div>{post.post.body}</div>
                    <div className="time-stamp">{}</div>
                </div>
                {comments.map(comment => {
                    const timeStamp = moment(comment.timestamp).format('MMMM DD, YYYY HH:MM');
                    return <div key={comment.id} className="col-md-offset-1 col-lg-offset-1 col-xs-offset-1 col-sm-offset-1 content-container comment">
                            <VoteButton id={comment.id} onVoteChange={(id, vote) =>{onVoteChange(id, vote)}} score={comment.voteScore} /> 
                            <div>{comment.body}</div>
                            <div className="time-stamp"><i className="fa fa-clock-o"></i> {timeStamp}</div>
                            <div className="time-stamp"><i className="fa fa-user"></i> {comment.author}</div>
                        </div>
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
        post: state.selectedPost,
        loadreducer: state.loadreducer,
        comments: state.comments.comments
    }
}

function mapDispatchToProps (dispatch) {
    return {
        ongetselectedPost: (id) => dispatch(getselectedPost(id)),
        ongetComments: (id) => dispatch(getComments(id)),
        onVoteChange: (id, vote) => dispatch(voteChange(id, vote))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedPost)


