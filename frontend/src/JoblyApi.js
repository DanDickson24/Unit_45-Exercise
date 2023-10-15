import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class JoblyApi {

  static token;
  static setToken(newToken) {
    this.token = newToken;
  }

  static async request(endpoint, data = {}, method = "get", token = null) {
    console.debug("API Call:", endpoint, data, method);
    const headers = { Authorization: `Bearer ${token || JoblyApi.token}` };
    const params = (method === "get") ? data : {};

    try {
        return (await axios({ url: `${BASE_URL}/${endpoint}`, method, data, params, headers })).data;
    } catch (err) {
        console.error("API Error:", err.response);
        let message = err.response?.data?.error?.message;
        throw Array.isArray(message) ? message : [message];
    }
}

  // Method to get details of a specific company by its handle.
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // Method to get a list of all companies.
  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  // Method to get a list of all jobs.
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  static async getJobById(jobId) {
    let res = await this.request(`jobs/${jobId}`);
    return res.job;
  }
  
  // Method to get all jobs for a specific company identified by its handle.
  static async getJobsByCompany(handle) {
    try {
      let res = await this.request(`companies/${handle}`);
      console.log('API Response:', res);  

      if (res.company && res.company.jobs && Array.isArray(res.company.jobs)) {
        return res.company.jobs;
      }

      throw new Error("Invalid format for jobs data received from API.");
    } catch (error) {
      console.error("Error fetching jobs: ", error);
      throw error;
    }
  }

  // Method to authenticate a user and obtain an authentication token.
  static async authenticate(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }
  static async applyToJob(username, id) {
    try {
      console.log("Applying to job with ID:", id);
      await this.request(`${username}/jobs/${id}`, {}, "post");
      console.log("Successfully applied to job with ID:", id);
    } catch (err) {
      console.error('Error applying to job:', err);
    }
  }
  
  
}



export default JoblyApi;


