import { useEffect } from 'react';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();

  const {
    sendRequest,
    status,
    data: quote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(params.qId);
  }, [sendRequest, params.qId]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focus'>{error}</p>;
  }

  if (status === 'completed' && !quote) {
    return (
      <div className='centered'>
        <NoQuotesFound />
      </div>
    );
  }

  // if (!quote) {
  //   return (
  //     <HighlightedQuote
  //       text="Don't try to be oversmart! 😎"
  //       author='~Developer'
  //     />
  //   );
  // }

  return (
    <div>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={match.path} exact>
        <div className='centered'>
          <Link to={`${match.url}/comments`} className='btn'>
            Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </div>
  );
};

export default QuoteDetail;
