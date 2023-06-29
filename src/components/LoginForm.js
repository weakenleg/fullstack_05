import React from 'react'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username:</label>
        <input id="username"
            value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input id="password"
            type="password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button id="login-button" type="submit">
          login
        </button>
    </form>
  )
}

export default LoginForm
