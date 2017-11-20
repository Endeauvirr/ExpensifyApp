import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <p>This is not the page you're looking for <span role="img" aria-label="oh noes 404">😱</span></p>
    <p>Go to <Link to="/">Main Page</Link></p>
  </div>
);

export default NotFoundPage;
