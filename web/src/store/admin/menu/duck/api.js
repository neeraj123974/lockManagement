import axios from "axios"

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME

 export const getMenus = data => {
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
