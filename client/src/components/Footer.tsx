import { Heart, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                BlogApp
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Discover amazing stories, insights, and perspectives from writers around the world.
              Join our community of passionate readers and writers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-300">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-purple-400 transition-colors">Home</a></li>
              <li><a href="/create" className="text-gray-300 hover:text-purple-400 transition-colors">Write</a></li>
              <li><a href="/auth" className="text-gray-300 hover:text-purple-400 transition-colors">Sign In</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">About</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-300">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Technology</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Lifestyle</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Business</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Health</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="text-gray-400">Made with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-gray-400">by</span>
            <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Somtech Productions
            </span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2025 Somtech Productions. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;