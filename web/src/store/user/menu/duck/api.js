import axios from "axios"

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME

 export const registerUser = data => {
 	return new Promise(async (resolve, reject) => {
     const data1 = axios.post(`${HOSTNAME}/api/v1/auth/register`, data)
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
   })
}

 export const loginUser = data => {
 	return new Promise(async (resolve, reject) => {
     const data1 = axios.post(`${HOSTNAME}/api/v1/auth/login`, data)
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
   })
}
