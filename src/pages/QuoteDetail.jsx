import { Route, useParams } from 'react-router-dom';
import Comments from '../components/comments/Comments';

const QuoteDetail = () => {
  const params = useParams();

  return (
    <div>
      <h1>Quote Detail Page</h1>
      <p>{params.qId}</p>
      <Route path={`/quotes/${params.qId}/comments`}>
        <Comments />
      </Route>
    </div>
  );
};

export default QuoteDetail;
