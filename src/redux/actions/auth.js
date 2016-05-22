import constants from '../constants'
function setLoggedinUser(user){
  return {
    type: constants.LOGGED_IN_USER,
    payload: {user}
  }
}


export function login(){
  return (dispatch, getState) => {
    FB.getLoginStatus(function(response) {
      if(response.status == 'connected'){
        // already login;
        FB.api('/me', (user)=>{
          dispatch(setLoggedinUser(user))
          console.log(user.name + ' is now connected')
        })
      } else {
        // not connected
        FB.login((user)=>{
          FB.api('/me', (user)=>{
            dispatch(setLoggedinUser(user))
            console.log(user.name + ' is now connected')
          })
        }, {scope: ''})
      }
    });
  }
}
