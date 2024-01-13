import axios from "axios";
const http = axios.create({
  baseURL:"http://localhost:8080/api/v1/",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ4cnlAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTcwNTExMDMxOCwiZXhwIjoxNzA1NzE1MTE4fQ.RIYVuClCDChjMHMt885yK7StQuSzpp-vkXQ5hvSrgc--GRjIjZ-rgmpS1U7dIR69'
  },

})

export default http;
