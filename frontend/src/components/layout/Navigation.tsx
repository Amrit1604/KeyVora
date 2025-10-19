import { Link } from 'react-router-dom';
import { FileCode2, Plus, Lock, Info, MessageSquare, Heart } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="border-b border-green-500/20 bg-slate-900/50 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-green-400 font-bold text-xl hover:text-green-300 transition">
            <Lock className="w-6 h-6" />
            <span className="font-mono">KeyVora</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/pads"
              className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition"
            >
              <FileCode2 className="w-5 h-5" />
              <span>My Pads</span>
            </Link>
            <Link
              to="/about"
              className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition"
            >
              <Info className="w-5 h-5" />
              <span>About</span>
            </Link>
            <Link
              to="/feedback"
              className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Feedback</span>
            </Link>
            <Link
              to="/support"
              className="flex items-center space-x-2 text-gray-300 hover:text-pink-400 transition"
            >
              <Heart className="w-5 h-5" />
              <span>Support</span>
            </Link>
            <Link
              to="/pads/new"
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg font-semibold transition"
            >
              <Plus className="w-5 h-5" />
              <span>New Pad</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
