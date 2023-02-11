import React from 'react'
import AuthProvider from './container/components/routes/AuthProvider'
import Routes from './container/components/routes/Routes'

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App