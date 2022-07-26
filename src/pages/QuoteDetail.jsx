import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

const QuoteDetail = () => {
  const params = useParams();

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
      <Outlet />
    </div>
  );
};

export default QuoteDetail;
