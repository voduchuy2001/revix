export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-4 text-gray-500 text-center w-full">
      <a href="https://voduchuy.vercel.app" target="_blank">
        &#169; {currentYear} Made by Vo Duc Huy ❤. All rights reserved
      </a>
    </footer>
  )
}
