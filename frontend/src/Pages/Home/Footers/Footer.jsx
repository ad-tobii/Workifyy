import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="flex flex-col items-center justify-between gap-6 px-8 py-7 md:flex-row md:px-14 lg:px-20 xl:px-24">
        <nav className="flex flex-wrap justify-center gap-6 md:justify-start">
          {['Home', 'Features', 'Pricing', 'Blog', 'Terms & Conditions'].map(item => (
            <a
              key={item}
              href="#"
              className="text-xs uppercase tracking-widest text-white/35 transition-colors hover:text-white/70"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a href="" target="_blank" rel="noreferrer" className="text-white/30 transition-colors hover:text-[#32CD32]">
            <FaInstagram size={16} />
          </a>
          <a href="" target="_blank" rel="noreferrer" className="text-white/30 transition-colors hover:text-[#32CD32]">
            <FaXTwitter size={16} />
          </a>
          <a href="" target="_blank" rel="noreferrer" className="text-white/30 transition-colors hover:text-[#32CD32]">
            <FaFacebook size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
