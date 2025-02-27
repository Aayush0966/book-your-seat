import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight, MessageSquare } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-[#ff0000]/10 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff0000]/5 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8b0000]/5 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo and company info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="relative h-8 w-8 rounded-full bg-[#ff0000]">
                <MessageSquare className="text-white absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-5 w-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff0000] to-[#8b0000]">TheatrePro</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Experience the magic of live performances with our curated selection of the finest theatrical shows, concerts, and events.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-[#ff0000]/10 hover:bg-[#ff0000]/20 text-[#ff0000] transition-colors duration-200">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-[#ff0000]/10 hover:bg-[#ff0000]/20 text-[#ff0000] transition-colors duration-200">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-[#ff0000]/10 hover:bg-[#ff0000]/20 text-[#ff0000] transition-colors duration-200">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-[#ff0000]/10 hover:bg-[#ff0000]/20 text-[#ff0000] transition-colors duration-200">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shows" className="text-gray-400 hover:text-[#ff0000] transition-colors duration-200 text-sm flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-[#ff0000]" />
                  Current Shows
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-[#ff0000] transition-colors duration-200 text-sm flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-[#ff0000]" />
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/venues" className="text-gray-400 hover:text-[#ff0000] transition-colors duration-200 text-sm flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-[#ff0000]" />
                  Our Venues
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-[#ff0000] transition-colors duration-200 text-sm flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-[#ff0000]" />
                  Ticket Pricing
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="text-gray-400 hover:text-[#ff0000] transition-colors duration-200 text-sm flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-[#ff0000]" />
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-gray-400 hover:text-[#ff0000] transition-colors duration-200 text-sm flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-[#ff0000]" />
                  Membership
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Support */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#ff0000] transition-colors duration-200 text-sm flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-[#ff0000]" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-[#ff0000] transition-colors duration-200 text-sm flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-[#ff0000]" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/covid" className="text-gray-400 hover:text-[#ff0000] transition-colors duration-200 text-sm flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-[#ff0000]" />
                  Health & Safety
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="text-gray-400 hover:text-[#ff0000] transition-colors duration-200 text-sm flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-[#ff0000]" />
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-[#ff0000] transition-colors duration-200 text-sm flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-[#ff0000]" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-[#ff0000] transition-colors duration-200 text-sm flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 text-[#ff0000]" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Stay Connected</h3>
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
              <p className="flex items-start space-x-3 text-sm">
                <Mail className="h-4 w-4 text-[#ff0000] mt-1 flex-shrink-0" />
                <span className="text-gray-400">info@theatrepro.com</span>
              </p>
              <p className="flex items-start space-x-3 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#ff0000] mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </p>
              <p className="flex items-start space-x-3 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#ff0000] mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-gray-400">123 Broadway, New York, NY 10001</span>
              </p>
            </div>
          </div>
        </div>
        
        <Separator className="bg-[#ff0000]/10 my-8" />
        
        {/* Bottom footer with copyright and additional links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {currentYear} TheatrePro. All rights reserved.</p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
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
        
        {/* Optional: Payment methods */}
        <div className="flex justify-center mt-8 space-x-4">
          <div className="w-8 h-5 bg-gray-700 rounded-sm opacity-70 hover:opacity-100 transition-opacity"></div>
          <div className="w-8 h-5 bg-gray-700 rounded-sm opacity-70 hover:opacity-100 transition-opacity"></div>
          <div className="w-8 h-5 bg-gray-700 rounded-sm opacity-70 hover:opacity-100 transition-opacity"></div>
          <div className="w-8 h-5 bg-gray-700 rounded-sm opacity-70 hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
    </footer>
  );
}