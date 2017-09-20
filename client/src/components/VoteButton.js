import React from 'react';

const VoteButton = (props) => {
  const {id, score, onVoteChange} = props;
  return (
    <div className="vote-button">
        <div onClick={()=>onVoteChange(id, "upVote")}><i className="fa fa-caret-up fa-2x"></i></div> 
        <div className="badge badge-success">{score}</div>
        <div onClick={()=>onVoteChange(id, "downVote")}><i className="fa fa-caret-down fa-2x"></i></div>  
    </div>
  )
};

export default VoteButton
