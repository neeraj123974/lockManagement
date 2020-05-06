import axios from "axios"

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME

 export const registerUser = data => {
 	console.log('register')
 	return new Promise(async (resolve, reject) => {
     axios.post(`${HOSTNAME}/api/v1/auth/register`, data)
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
   })
}

 export const loginUser = data => {
 	console.log('login')
 	return new Promise(async (resolve, reject) => {
     axios.post(`${HOSTNAME}/api/v1/auth/login`, data)
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
   })
}
