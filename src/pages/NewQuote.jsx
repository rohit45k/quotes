import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';
import QuoteForm from '../components/quotes/QuoteForm';

const NewQuote = () => {
  const navigate = useNavigate();

  const { sendRequest, status, error } = useHttp(addQuote);

  useEffect(() => {
    if (status === 'completed' && !error) {
      navigate('/quotes');
    }
  }, [status, navigate, error]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
