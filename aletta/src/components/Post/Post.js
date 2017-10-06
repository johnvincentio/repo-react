import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Post.css'

const Post = (props) => (
  <div>
    <h2 className={styles.title}>
      {props.titleLink
      ? <Link className={styles.link} to={`/post/${props.slug}`}>{props.title}</Link>
      : props.title}
    </h2>
    <p className={styles.content}>{props.excerpt}</p>
  </div>
)

export default Post
