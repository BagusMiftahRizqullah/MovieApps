export const loginAction = payload => {
  return {type: 'LOGIN', payload};
};

export const loginActionSuccess = payload => {
  return {type: 'LOGIN_SUCCEES', payload};
};

export const loginActionFailed = payload => {
  return {type: 'LOGIN_FAILED', payload};
};

export const logout = payload => {
  return {type: 'LOGOUT', payload};
};
