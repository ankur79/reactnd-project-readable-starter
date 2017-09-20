import React from 'react';
import * as moment from 'moment';

const CommentBox = (props) => {
    const { comment, editComment, ondeleteComment } = props;
    const timeStamp = moment(comment.timestamp).format('MMMM DD, YYYY HH:MM');
    return (<div>
                <div className="row">
                    <div>
                        <span className="time-stamp">comment by {comment.author}</span>
                        <p>{comment.body}</p>
                        <span className="time-stamp">On {timeStamp}</span>
                    </div>
                </div>                            
                <div className="row btn-container">
                    <button title="edit" onClick={() => {
                            editComment(comment.id)
                        }} className="btn btn-primary btn-xs">edit</button>
                    <button onClick={() => ondeleteComment(comment.id)} title="delete" className="btn btn-default btn-xs">delete</button>
                </div> 
            </div>)
}

export default CommentBox


