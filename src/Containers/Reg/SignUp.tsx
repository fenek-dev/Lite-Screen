// React
import React, { useRef, useState } from 'react';

// Styles and material ui
import '../../Styles/Registration/SignUp.scss';
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// Redux
import {
  // useSelector as useReduxSelector,
  // TypedUseSelectorHook,
  useDispatch,
} from 'react-redux';
// import { RootReducerInterface } from '../../Redux/Reducers/rootReduser';
import { AddFirstAndSecondNamesAction } from '../../Redux/Actions/mainActions';

// Firebase
import { auth } from '../../Firebase';

// ==== Main component ====
export default function SignUp() {
  // ==== TypeScript ====
  interface SignupInterface {
    email: string;
    password: string;
    firstName: string;
    secondName: string;
  }

  // Create state for error
  const [error, setError] = useState<null | string>(null);

  // ==== Redux ====
  /**
  const useSelector: TypedUseSelectorHook<RootReducerInterface> = useReduxSelector;
  const state = useSelector((store) => store.auth);
  
   */
  const dispatch = useDispatch();

  // ==== Refs ====
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const secondNameRef = useRef<HTMLInputElement>(null);

  // ==== Handle functions ====
  // Set email, password and others in state
  const handleClick = () => {
    const firstName = firstNameRef.current!.value;
    const secondName = secondNameRef.current!.value;

    // Create new action with first and second names
    const firstAndSecondNames = AddFirstAndSecondNamesAction({
      firstName,
      secondName,
    });
    // Dispatch them to store
    dispatch(firstAndSecondNames);

    // email: emailRef.current!.value,
    // password: passwordRef.current!.value,
    // firstName: firstNameRef.current!.value,
    // secondName: secondNameRef.current!.value

    // Set email and password in local storage for initialize ir the user has entered in app before
    localStorage.setItem('userEmail', emailRef.current!.value);
    localStorage.setItem('userPass', passwordRef.current!.value);

    // Create new user with email and password in firebase
    auth
      .createUserWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      )
      .catch((e) => {
        // Checking if there is an error and then set it in error state for render
        if (e.code === 'auth/email-already-in-use') {
          setError('The email address is already in use by another account.');
        }
      })
      .then((data) => console.log(data));
  };

  return (
    <section className='signup'>
      <div className='container'>
        <div className='signup-body'>
          <div className='signup-image'></div>
          <div className='signup-forms'>
            <h3>Sign up</h3>
            <form className='signup-form' noValidate>
              <Input
                inputRef={emailRef}
                required
                className='signup-form-input'
                placeholder='E-mail'
              />
              <Input
                inputRef={passwordRef}
                type='password'
                required
                className='signup-form-input'
                placeholder='Password'
                inputProps={{ 'aria-label': 'Password' }}
              />
              <Input
                inputRef={firstNameRef}
                required
                className='signup-form-input'
                placeholder='First name'
                inputProps={{ 'aria-label': 'FirstName' }}
              />
              <Input
                inputRef={secondNameRef}
                required
                className='signup-form-input'
                placeholder='Second name'
                inputProps={{ 'aria-label': 'SecondName' }}
              />
              <Button color='primary' variant='contained' onClick={handleClick}>
                Send
              </Button>
              {error ? <p>{error}</p> : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
