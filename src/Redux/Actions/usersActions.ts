import { ADD_USER_IN_SEARCH, ADD_LOADED } from '../Constants';

export interface PostAction {
  type: typeof ADD_USER_IN_SEARCH;
  payload: {
    name: string;
    link: string;
    photo: string;
  };
}

export const AddUserInSearch = (
  name: string,
  link: string,
  photo: string
): PostAction => ({
  type: ADD_USER_IN_SEARCH,
  payload: {
    name,
    link,
    photo,
  },
});

export const AddLoaded = {
  type: ADD_LOADED,
};
