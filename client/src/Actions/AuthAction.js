import * as AuthApi from '../api/AuthRequest'

export const logIn = (FormData)=> async(dispatch) => {
    dispatch({type: 'AUTH_START'});
    //interact with API which will call an endpoint to server for login
    try {
        const {data} = await AuthApi.logIn(FormData);
        dispatch({type: "AUTH_SUCCESSFUL", data: data})
    }
    catch (error) {
      console.log(error);  
      dispatch({type: "AUTH_FAILED"})
    }
}

export const signUp = (FormData)=> async(dispatch) => {
    dispatch({type: 'AUTH_START'});
    //interact with API which will call an endpoint to server for sign up
    try {
        const {data} = await AuthApi.signUp(FormData);
        dispatch({type: "AUTH_SUCCESSFUL", data: data})
    }
    catch (error) {
      console.log(error);  
      dispatch({type: "AUTH_FAILED"})
    }
}

//logout

export const logOut = ()=> async(dispatch) =>{
  dispatch({type: "LOG_OUT"})
}