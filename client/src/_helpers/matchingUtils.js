import store from '../store'

export const matchIdWithAccountType = (id) => {
  if (id === 'store') return id

  const allAccounts = [
    ...store.getState().CurrentReducer.currentAccounts,
    ...store.getState().SavingsReducer.savingsAccounts
  ]

  return allAccounts.find(item => item._id === id) ? allAccounts.find(item => item._id === id).accountType : null
}