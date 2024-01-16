'use client'
import AddProducts from './components/AddProducts'
import ShowProducts from './components/ShowProducts'

export default function Home() {
  return (
    <main className='container'>
      <div className="columns">
        <div className="column">
          <AddProducts />
        </div>
        <div className="column">
          <ShowProducts />
        </div>
      </div>
      
   </main>
  )
}
