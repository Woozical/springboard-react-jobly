import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class
 * 
 *  Static class grouping together methods used to interact with the Jobly backend API.
 *  All API-aware code should be contained here.
 */

class JoblyAPI {
  // Auth Token for API interaction
  static token;

  // Wrapper method to include auth token, params, error handling, etc in axios requests.
  static async request(endpoint, data={}, method = "get"){
    console.debug("API CALL:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyAPI.token}`};
    const params = (method === "get") ? data : {};
    try {
      return await axios({ url, method, data, params, headers });
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // API routes

  /** Get details on a company with given handle */
  static async getCompany(handle){
    try {
      let res = await this.request(`companies/${handle}`);
      return res.data.company;
    } catch (err) {
      console.error(err);
    }
  }

  /** Get full list of company data, with optional search query
   *  query should be an  object in adherence with the following interface:
   *  {
   *    minEmployees: number (must be < maxEmployees, if present),
   *    maxEmployees: number,
   *    name: string
   *  }
   *  The query object does not require all of the above propertites to be present. Only include
   *  what should be used in the search.
   */
  static async getCompanies(query={}){
    try {
      let res = await this.request(`companies`, query);
      return res.data.companies;
    } catch (err) {
      console.error(err);
    }
  }

  /** Get details on a job with given ID */
  static async getJob(id){
    try {
      let res = await this.request(`jobs/${id}`);
      return res.data.job;
    } catch (err) {
      console.error(err);
    }
  }

  /** Get full list of jobs, with optional search query
   *  query should be an object in adherence with the following interface:
   *  {
   *    minSalary : number,
   *    hasEquity : boolean,
   *    title: string
   *  }
   *  The query object does not require all of the above properties to be present. Only include
   *  what should be used in the search.
   */
  static async getJobs(query={}){
    try {
      let res = await this.request(`jobs`, query);
      return res.data.jobs;
    } catch (err) {
      console.error(err);
    }
  }

  /** Get data on a user with given username. Auth token must match username or be an admin */
  static async getUser(username){
    try { 
      let res = await this.request(`users/${username}`);
      return res.data.user;
    } catch (err) {
      console.erroro(err);
    }
  }

  /** Get a list of job data that the user with the given username has applied to.
   *  Auth token must match username or be an admin.
   *  If fullData = true, return the user's information as well
   */
  static async getUserApps(username, fullData=false){
    try { 
      let res = await this.request(`users/${username}/applications`);
      return fullData ? res.data.user : res.data.user.applications;
    } catch (err) {
      console.error(err);
    }
  }

  /** Apply to a job with given ID as user with given username.
   *  Auth token must match username or be an admin.
   */
  static async applyToJob(jobID, username){
    try {
      let res = await this.request(`users/${username}/jobs/${jobID}`, {}, "post");
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  /** Update user's information with the given username.
   *  Auth token must match username or be an admin.
   *  Data is an object that includes the fields that will be updated, e.g.:
   *  {
   *    password : string (5-20 characters),
   *    firstName : string (30 characters or less),
   *    lastName : string (30 characters or less),
   *    email : string (email format, 6-60 characters)
   *  }
   */
  static async patchUser(username, data){
    try {
      let res = await this.request(`users/${username}`, data, "patch");
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  /** Deletes the user with the given username.
   *  Auth token must match username or be an admin.
   */

  static async deleteUser(username){
    try {
      let res = await this.request(`users/${username}`, {}, "delete");
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
}

// For now, use a testing auth token
import token from './TEST_TOKEN';
JoblyAPI.token = token;

export default JoblyAPI;