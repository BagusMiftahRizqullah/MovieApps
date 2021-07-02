export const getUserAction = payload => {
  return {type: 'GET_USER', payload};
};

export const getUserActionSuccess = payload => {
  return {type: 'GET_USER_SUCCEES', payload};
};

export const getUserActionFailed = payload => {
  return {type: 'GET_USER_FAILED', payload};
};

export const editUserAction = payload => {
  return {type: 'EDIT_USER', payload};
};

export const editUserActionSuccess = payload => {
  return {type: 'EDIT_USER_SUCCESS', payload};
};

export const editUserActionFailed = payload => {
  return {type: 'EDIT_USER_FAILED', payload};
};
