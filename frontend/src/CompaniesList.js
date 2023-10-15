import React, { useState, useEffect } from "react";
import Company from "./Company";
import JoblyApi from "./JoblyApi";

function CompaniesList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      try {
        let companies = await JoblyApi.getCompanies();
        setCompanies(companies);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    }
    getCompanies();
  }, []);

  return (
    <div>
      {companies.map(company => (
        <Company key={company.handle} company={company} />
      ))}
    </div>
  );
}

export default CompaniesList;
