import React from 'react';
import { Link } from 'react-router-dom';

function Company({ company }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            <Link to={`/companies/${company.handle}`}>{company.name}</Link>
          </h5>
          <p className="card-text">{company.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Company;
