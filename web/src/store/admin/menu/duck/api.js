import axios from "axios"

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME

 export const getMenus = data => {
 console.log({data})   
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
