let url = 'https://localhost:3000'
if (process.env.NODE_ENV === 'production') {
  url = ''
}

export const API_URL = url