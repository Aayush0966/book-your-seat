import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight, MessageSquare, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-[#ff0000]/10 py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff0000]/5 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8b0000]/5 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1: Logo and company info */}
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
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="h-8 w-8 flex items-center justify-center rounded-full bg-[#ff0000]/10 hover:bg-[#ff0000]/20 text-[#ff0000] transition-colors duration-200">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="h-8 w-8 flex items-center justify-center rounded-full bg-[#ff0000]/10 hover:bg-[#ff0000]/20 text-[#ff0000] transition-colors duration-200">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="h-8 w-8 flex items-center justify-center rounded-full bg-[#ff0000]/10 hover:bg-[#ff0000]/20 text-[#ff0000] transition-colors duration-200">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Contact us', 'Ticket Rate', 'Profile'].map((item, index) => (
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

          {/* Column 3: Empty or Additional Links */}
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
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Stay Connected</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe for exclusive offers and updates</p>
            
            <div className="flex space-x-2 mb-6">
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
        
        {/* Bottom footer with copyright and additional links */}
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
        
        {/* Payment methods */}
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