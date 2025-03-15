export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-4 text-gray-500 text-center w-full">
      <a href="#!">Copyright {currentYear} &#169; DUY DANG DIGITAL | Designed by Vo Duc Huy</a>
    </footer>
  )
}
