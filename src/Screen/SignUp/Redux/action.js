export const signupAction = payload => {
  return {type: 'SIGNUP', payload};
};

export const signupActionSuccess = payload => {
  return {type: 'SIGNUP_SUCCEES', payload};
};

export const signupActionFailed = payload => {
  return {type: 'SIGNUP_FAILED', payload};
};

export const resetAuthAction = payload => {
  return {type: 'RESET_AUTH', payload};
};
