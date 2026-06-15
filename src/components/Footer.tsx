import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, ArrowRight, MessageSquare, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-[#ff0000]/10 py-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff0000]/5 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8b0000]/5 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <div className="relative h-8 w-8 rounded-full bg-[#ff0000] flex items-center justify-center">
                <MessageSquare className="text-white h-4 w-4" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff0000] to-[#8b0000]">BookYourSeat</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Experience the magic of cinema with our curated selection of the finest theatrical shows.
            </p>
            <div className="flex space-x-3">
              <a href="#" aria-label="Facebook" className="h-8 w-8 flex items-center justify-center rounded-full bg-[#ff0000]/10 hover:bg-[#ff0000]/20 text-[#ff0000] transition-colors duration-200">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="h-8 w-8 flex items-center justify-center rounded-full bg-[#ff0000]/10 hover:bg-[#ff0000]/20 text-[#ff0000] transition-colors duration-200">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="h-8 w-8 flex items-center justify-center rounded-full bg-[#ff0000]/10 hover:bg-[#ff0000]/20 text-[#ff0000] transition-colors duration-200">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="h-8 w-8 flex items-center justify-center rounded-full bg-[#ff0000]/10 hover:bg-[#ff0000]/20 text-[#ff0000] transition-colors duration-200">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Contact', 'Ticket Rate', 'Profile'].map((item, index) => (
                <li key={index}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-400 hover:text-[#ff0000] transition-colors duration-200 text-sm flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 text-[#ff0000] group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {['About Us', 'FAQs', 'Terms & Conditions', 'Privacy Policy'].map((item, index) => (
                <li key={index}>
                  <Link href={`/${item.toLowerCase().replace(/[& ]/g, '-')}`} 
                    className="text-gray-400 hover:text-[#ff0000] transition-colors duration-200 text-sm flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 text-[#ff0000] group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Stay Connected</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe for exclusive offers and updates</p>
            
            <div className="flex space-x-2 mb-6" suppressHydrationWarning>
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="pl-10 h-10 bg-black/50 backdrop-blur-sm border-[#ff0000]/20 focus:border-[#ff0000]/50 rounded-lg text-sm"
                />
              </div>
              <Button size="sm" className="bg-[#ff0000] hover:bg-[#ff0000]/90 text-white rounded-lg h-10">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <p className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-[#ff0000] mr-3 flex-shrink-0" />
                <span className="text-gray-400">aayushx699@gmail.com</span>
              </p>
              <p className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-[#ff0000] mr-3 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </p>
              <p className="flex items-center text-sm">
                <MapPin className="h-4 w-4 text-[#ff0000] mr-3 flex-shrink-0" />
                <span className="text-gray-400">Itahari, Sunsari, Nepal</span>
              </p>
            </div>
          </div>
        </div>
        
        <Separator className="bg-[#ff0000]/10 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-4 md:mb-0">© {currentYear} BookYourSeat. All rights reserved.</p>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/accessibility" className="hover:text-[#ff0000] transition-colors duration-200">
              Accessibility
            </Link>
            <Link href="/sitemap" className="hover:text-[#ff0000] transition-colors duration-200">
              Sitemap
            </Link>
            <Link href="/cookies" className="hover:text-[#ff0000] transition-colors duration-200">
              Cookie Settings
            </Link>
          </div>
        </div>
        
        <div className="mt-10">
          <p className="text-center text-xs text-gray-500 mb-3">Supported payment methods</p>
          <div className="flex justify-center space-x-4">
            {[
              { name: 'Esewa', color: 'from-green-400 to-green-600' },
              { name: 'Khalti', color: 'from-purple-500 to-purple-700' }
            ].map((provider) => (
              <div 
                key={provider.name} 
                className={`w-16 h-8 rounded-md bg-gradient-to-r ${provider.color} shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              >
                <span className="text-xs font-medium text-white">{provider.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}