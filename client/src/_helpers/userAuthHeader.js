const userAuthHeader = () => {
  console.log(localStorage.use, 'get')
  let user = JSON.parse(localStorage.getItem('user'))
  console.log(localStorage.use, 'get finished')

  if (user && user.token) {
    return user
  }
  return null
}

export default userAuthHeader