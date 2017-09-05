import React, { Component } from 'react';

class SelectedPost extends Component {
    componentWillReceiveProps(nextProps){
        if(nextProps!==this.props){
            this.props.getselectedPost(nextProps.match.params.id)
        }
    }
    render(){
        const {post} = this.props;
        console.log(post)
        return(
            <div className="post-container">
                <h4><span className="badge">{post.post.voteScore}</span> {post.title}</h4>
                <div>{post.post.body}</div>
                <div className="time-stamp">{post.post.timeStamp}</div>
                <div className="time-stamp">{post.post.author}</div>
            </div>
        )
    }
};

export default SelectedPost
