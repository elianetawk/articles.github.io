import React from 'react';
import classes from './ArticleItem.module.css';

const ArticleItem = (props) => {
  return (
    <li className={classes.article}>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </li>
  );
};

export default ArticleItem;
