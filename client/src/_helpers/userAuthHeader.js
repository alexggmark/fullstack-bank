const userAuthHeader = () => {
  let user = JSON.parse(localStorage.getItem('user'))

  if (user && user.token) {
    console.log('Defined')
    return user
  }
  console.log('Undefined')
  return null
}

export default userAuthHeader