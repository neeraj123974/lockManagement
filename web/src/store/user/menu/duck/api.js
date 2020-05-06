import axios from "axios"

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME

 export const registerUser = data => {
 	return new Promise(async (resolve, reject) => {
     axios.post(`${HOSTNAME}/api/v1/auth/register`, data)
	  .then(function (response) {
	    resolve(response.data);
	  })
	  .catch(function (error) {
	     reject(error);
	  });
   })
}

 export const loginUser = data => {
 	return new Promise(async (resolve, reject) => {
     axios.post(`${HOSTNAME}/api/v1/auth/login`, data)
	  .then(function (response) {
	    resolve(response.data);
	  })
	  .catch(function (error) {
	    reject(error);
	  });
   })
}
