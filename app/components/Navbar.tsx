import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
      <nav className='flex max-w-screen-2xl justify-between mx-auto px-2 py-4 bg-blue-500 text-white'>
           <Link href={'/'} className='text-xl'>Home</Link>
          <div className='flex gap-4 text-white'>
              <Link href={"/products"}>Product</Link>
              <Link href={"/products/add"}>Tambah Produk</Link>
              <Link href={"/auth/login"}>Login</Link>
          </div>
    </nav>
  )
}

export default Navbar