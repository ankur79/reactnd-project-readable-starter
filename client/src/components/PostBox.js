import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import VoteButton from '././VoteButton';

const PostBox = (props) => {
  let { post, onVoteChange, onDeletePost } = props;
  post = post !== undefined ? post : {};
  const timeStamp = moment(post.timestamp).format('MMMM DD, YYYY HH:MM'); 
  return (
    <div>
        <div className="col-lg-1 col-md-1 col-sm-1">
            <VoteButton id={post.id} onVoteChange={(id, vote) =>{onVoteChange(id, vote)}} score={post.voteScore} /> 
        </div> 
        <div className="col-lg-11 col-md-11 col-sm-11">
            <Link to={`/posts/${post.id}`}><h4>{post.title}</h4></Link>
            <div className="time-stamp">Post by {post.author}</div>
            <div>{post.body}</div>
            <div className="time-stamp">On {timeStamp}</div>
            <div className="btn-container">
                <Link to={"/add/edit/"+post.id} title="edit" className="btn btn-primary btn-xs">edit</Link>
                <button onClick={()=>onDeletePost(post.id)} title="delete" className="btn btn-default btn-xs">delete</button>
            </div>             
        </div>
    </div>
  )
};

export default PostBox
