import { useEffect } from 'react';

import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';

import QuoteList from '../components/quotes/QuoteList';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: quotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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

  if (status === 'completed' && (!quotes || quotes.length === 0)) {
    return (
      <div className='centered'>
        <NoQuotesFound />
      </div>
    );
  }

  return <QuoteList quotes={quotes} />;
};

export default AllQuotes;
