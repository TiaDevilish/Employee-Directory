import axios from "axios";
const baseURL = `https://randomuser.me/api/`;
const numberEmployees = 100;
const nationality = "US";
const specificEndPointURL = `${baseURL}?nat=${nationality}&results=${numberEmployees}`;

export default {
  getEmployees() {
    return axios.get(specificEndPointURL);
  },
};