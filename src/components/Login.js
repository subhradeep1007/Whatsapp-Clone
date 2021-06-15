import React from 'react'
import { auth,provider } from '../firebase'
import {actiontypes} from './reducer'
import {useStateValue} from './StateProvider'
const Login = () => {
const [{},dispatch]=useStateValue()
  
  const signin=(e)=>{
    e.preventDefault()
    auth.signInWithPopup(provider)
        .then(result=>
          {
          dispatch({
            type:actiontypes.SET_USER,
            user:result.user
          })
        })
        .catch(error=> alert(error.message))
  }
    return (
        <div>
          <div className="container w-screen">
        <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 ">
            <div>
              <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />

            </div>
            <form className="mt-8 space-y-6">
              


              <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-10 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100" onClick={signin} >
                 Sign in with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
          
        </div>
    )
}

export default Login
