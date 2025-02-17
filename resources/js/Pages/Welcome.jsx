import { Button } from '@/Components/ui/button'
import { Head, Link } from '@inertiajs/react'
import { motion } from 'framer-motion'

export default function Welcome() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 sm:px-0">
      <Head title="Táo cười" />

      <motion.h1
        className="text-2xl sm:text-4xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Chào mừng bạn đến với trang quản lý
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl mb-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
      >
        Bắt đầu bằng cách đăng nhập vào tài khoản của bạn.
      </motion.p>

      <Link href={route('login')}>
        <Button className="w-full sm:w-auto px-6 py-3 text-lg">Đi đến trang đăng nhập</Button>
      </Link>
    </div>
  )
}
