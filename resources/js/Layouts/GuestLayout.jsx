import Footer from '@/Components/Footer'
import { Toaster } from 'react-hot-toast'
import logo from '@/assets/logo-tc.png'
import { Link } from '@inertiajs/react'

export default function GuestLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
      <div className="max-w-xs sm:max-w-sm md:max-w-md">
        <Link href={route('/')}>
          <img src={logo} alt="Táo cười" className="w-full" />
        </Link>
      </div>

      <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
        {children}

        <Toaster />
      </div>

      <Footer />
    </div>
  )
}
