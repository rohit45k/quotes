import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './Comments.module.css';
import CommentsList from './CommentsList';
import NewCommentForm from './NewCommentForm';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const params = useParams();
  const quoteId = params.qId;

  const { sendRequest, status, data, error } = useHttp(getAllComments, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  let comment;

  if (status === 'pending') {
    comment = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    comment = <p className='centered focus'>{error}</p>;
  }

  if (status === 'completed' && (!data || data.length === 0)) {
    comment = <p className='centered focus'>Be the first one to comment</p>;
  }

  if (status === 'completed' && (data || data.length > 0)) {
    comment = <CommentsList comments={data} />;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm quoteId={quoteId} onAddedComment={addCommentHandler} />
      )}
      {comment}
    </section>
  );
};

export default Comments;
