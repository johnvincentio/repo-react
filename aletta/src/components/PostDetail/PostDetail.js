import React from 'react'

import Post from '../Post/Post'

const PostDetail = (props) => (
  <div>
    <Post {...props.post} />
  </div>
)

export default PostDetail
