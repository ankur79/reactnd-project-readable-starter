import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import VoteButton from '././VoteButton';

const PostBox = (props) => {
  let { post, onVoteChange } = props;
  post = post !== undefined ? post : {};
  const timeStamp = moment(post.timestamp).format('MMMM DD, YYYY HH:MM'); 
  return (
    <div>
        <div className="col-md-1">
            <VoteButton id={post.id} onVoteChange={(id, vote) =>{onVoteChange(id, vote)}} score={post.voteScore} /> 
        </div> 
        <div className="col-md-11">
            <div className="user-icon" title={post.author}>
                <i className="fa fa-user fa-2x"></i>
            </div>
            <Link to={`/posts/${post.id}`}><h4>{post.title}</h4></Link>
            <div>{post.body}</div>
            <div className="time-stamp">On {timeStamp}</div>
            <div className="row btn-container">
            <Link to={"/add/edit/"+post.id} title="edit" className="btn btn-primary btn-xs"><i className="fa fa-pencil"></i></Link>
            <button title="delete" className="btn btn-default btn-xs"><i className="fa fa-trash"></i> </button>
        </div>             
        </div>
    </div>
  )
};



export default PostBox
