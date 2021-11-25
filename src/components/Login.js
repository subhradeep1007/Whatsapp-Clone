import React from 'react'
import { auth, provider } from '../firebase'
import { actiontypes } from './reducer'
import { useStateValue } from './StateProvider'
import GoogleButton from 'react-google-button'
const Login = () => {
  const [{user }, dispatch] = useStateValue()

  const signin = (e) => {
    e.preventDefault()
    auth.signInWithPopup(provider)
      .then(result => {
        dispatch({
          type: actiontypes.SET_USER,
          user: result.user
        })
      })
      .catch(error => alert(error.message))
  }
  return (
    <div>
      <div className="container w-screen">
        <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-md w-full space-y-8 rounded-md  bg-gray-100 shadow-md py-32 px-12  ">
            <div>
              <img className="mx-auto h-20 rounded-full p-2 bg-blue-100 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />

            </div>
            <form className="mt-8 space-y-6">



              <div>
                <div className=" text-center font-semibold text-blue-900 text-xl ">
                  My Whatsapp Clone
                </div>
                <div className=" text-center font-medium  text-gray-400  mb-8 ">
                  Welcome Back!
                </div>
                {/* <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-black  bg-gray-200 shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100" onClick={signin} >
                  Sign in with Google
                </button> */}
                
                <div className=" flex items-center justify-center ">
                <GoogleButton
                 className=" w-24 "
                 onClick={signin}
                />
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login
