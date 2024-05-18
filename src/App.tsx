import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
		<div className="navbar bg-base-100">
		<a className="btn btn-ghost text-xl">daisyUI</a>
		</div>
    </>
  )
}

export default App
