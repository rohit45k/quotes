import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';
import QuoteForm from '../components/quotes/QuoteForm';

const NewQuote = () => {
  const history = useHistory();

  const { sendRequest, status, error } = useHttp(addQuote);

  useEffect(() => {
    if (status === 'completed' && !error) {
      history.push('/quotes');
    }
  }, [status, history, error]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
