import './App.css'

import TransactionData from './TransactionData/TransactionData'
import TransactionDetails from './TransactionDetails/TransactionDetails'
import TransactionGraph from './TransactionGraph/TransactionGraph'
function App() {

  return (
    <>
      <div className=' flex relatives flex-row h-dvh w-full px-3 py-3 test  ' >
        <TransactionData />
        <div className='w-1/2 space-y-5 flex flex-col relative z-30'>

          <TransactionDetails customerId={1} />
          <TransactionGraph />
        </div>
      </div >

    </>
  )
}

export default App
