import React from 'react';
import * as moment from 'moment';

const CommentBox = (props) => {
    const { comment, editComment, ondeleteComment } = props;
    const timeStamp = moment(comment.timestamp).format('MMMM DD, YYYY HH:MM');
    return (<div>
                <div className="row">
                    <div className="user-icon" title={comment.author}>
                        <i className="fa fa-user fa-2x"></i>
                    </div>
                    <div>
                        <p>{comment.body}</p>
                        <span className="time-stamp ">On {timeStamp}</span>
                    </div>
                </div>                            
                <div className="row btn-container">
                    <button title="edit" onClick={() => {
                            editComment(comment.id)
                        }} className="btn btn-primary btn-xs"><i className="fa fa-pencil"></i></button>
                    <button onClick={() => ondeleteComment(comment.id)} title="delete" className="btn btn-default btn-xs"><i className="fa fa-trash"></i> </button>
                </div> 
            </div>)
}

export default CommentBox


