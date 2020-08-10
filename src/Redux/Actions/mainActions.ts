// Action constants
import { ADD_FIRST_AND_SECOND_NAMES, ADD_USER_ID } from '../Constants';

// ==== TypeScript ====

export interface AddFirstAndSecondNamesActionInterface {
  type: typeof ADD_FIRST_AND_SECOND_NAMES;
  payload: {
    firstName: string;
    secondName: string;
  };
}

export interface AddUserIdInterface {
  type: typeof ADD_USER_ID;
  payload: string | undefined;
}

// ==== Actions ====

export const AddFirstAndSecondNamesAction = ({
  firstName,
  secondName,
}: {
  firstName: string;
  secondName: string;
}): AddFirstAndSecondNamesActionInterface => ({
  type: ADD_FIRST_AND_SECOND_NAMES,
  payload: {
    firstName,
    secondName,
  },
});

export const AddUserId = (id: string | undefined): AddUserIdInterface => ({
  type: ADD_USER_ID,
  payload: id,
});
