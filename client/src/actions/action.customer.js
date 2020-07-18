export const customerActions = {
  test,
}

function test () {
  console.log('test')
  // dispatch redux
  /*
    return (dispatch) => {
      dispatch(request());
      userService.resetPassword(data).then(
        (res) => {
          dispatch(alertActions.success(res.message));
          dispatch(response());
        },
        (error) => {
          dispatch(alertActions.error(error));
          dispatch(response());
        }
      );
    };

    function response() {
      return { type: userConstants.PASSWORD_RESET_RESPONSE };
    }
    function request() {
      return { type: userConstants.PASSWORD_RESET_REQUEST };
    }
  */
}