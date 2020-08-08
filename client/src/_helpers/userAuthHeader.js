const userAuthHeader = () => {
  let user = JSON.parse(localStorage.getItem('user'))

  if (user && user.token) {
    return user
  }
  return null
}

export default userAuthHeader