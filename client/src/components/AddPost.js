import React from 'react';
import { connect } from 'react-redux'

const AddPost = (props) => {
  console.log(props)
  return (
    <div>
      <h3>ADD</h3>
    </div>
  )
};

function mapStateToProps(state){
  return{
    orderList: state.order
  }
}

function mapDispatchToProps (dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost)
