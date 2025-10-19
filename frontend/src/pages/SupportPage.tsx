import { Coffee, Heart, DollarSign, Github, Star } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <Heart className="w-16 h-16 text-red-400 mx-auto mb-4 animate-pulse" />
        <h1 className="text-4xl font-bold text-white font-mono mb-2">Support KeyVora</h1>
        <p className="text-xl text-gray-400">
          Help keep this project alive and free for everyone!
        </p>
      </div>

      {/* Why Support */}
      <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">💚 Why Support?</h2>
        <p className="text-gray-300 mb-4">
          KeyVora is a free, open-source project built by passionate developers in their spare time.
          Your support helps us:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-green-400 mr-2">✓</span>
            <span>Cover server and hosting costs</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">✓</span>
            <span>Develop new features and improvements</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">✓</span>
            <span>Maintain and fix bugs faster</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">✓</span>
            <span>Keep the project 100% free and ad-free</span>
          </li>
        </ul>
      </div>

      {/* Support Options */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Buy Me a Coffee */}
        <div className="bg-slate-800/50 border border-yellow-500/30 rounded-xl p-6 hover:border-yellow-500/50 transition">
          <Coffee className="w-12 h-12 text-yellow-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">☕ Buy Me a Coffee</h3>
          <p className="text-gray-400 mb-4">
            Support with a one-time donation. Every coffee helps keep the code flowing!
          </p>
          <a
            href="https://buymeacoffee.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition"
          >
            <Coffee className="w-5 h-5" />
            <span>Buy a Coffee ($5)</span>
          </a>
        </div>

        {/* GitHub Sponsors */}
        <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition">
          <Heart className="w-12 h-12 text-purple-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">💜 GitHub Sponsors</h3>
          <p className="text-gray-400 mb-4">
            Become a recurring sponsor and get special recognition in the project!
          </p>
          <a
            href="https://github.com/sponsors/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            <Github className="w-5 h-5" />
            <span>Sponsor on GitHub</span>
          </a>
        </div>

        {/* PayPal */}
        <div className="bg-slate-800/50 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition">
          <DollarSign className="w-12 h-12 text-blue-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">💵 PayPal Donation</h3>
          <p className="text-gray-400 mb-4">
            Prefer PayPal? Send a donation directly to support development.
          </p>
          <a
            href="https://paypal.me/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            <DollarSign className="w-5 h-5" />
            <span>Donate via PayPal</span>
          </a>
        </div>

        {/* Star on GitHub */}
        <div className="bg-slate-800/50 border border-green-500/30 rounded-xl p-6 hover:border-green-500/50 transition">
          <Star className="w-12 h-12 text-green-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">⭐ Star on GitHub</h3>
          <p className="text-gray-400 mb-4">
            Free support! Give us a star to help others discover the project.
          </p>
          <a
            href="https://github.com/yourusername/keyvora"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-semibold transition"
          >
            <Star className="w-5 h-5" />
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>

      {/* Thank You Section */}
      <div className="bg-slate-800/50 border border-green-500/20 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">🙏 Thank You!</h2>
        <p className="text-gray-300 mb-6">
          Every contribution, no matter how small, makes a huge difference. Your support allows
          us to continue building awesome free tools for the community!
        </p>
        <div className="inline-flex items-center space-x-2 text-green-400 font-mono">
          <span className="text-2xl">❤️</span>
          <span>Made with love for the open-source community</span>
          <span className="text-2xl">❤️</span>
        </div>
      </div>

      {/* Supporters Section (Optional) */}
      <div className="mt-8 bg-slate-800/30 border border-green-500/20 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-3 text-center">💖 Special Thanks to Our Supporters</h3>
        <p className="text-center text-gray-400 text-sm">
          Thank you to everyone who has supported this project! 🎉
        </p>
        {/* Add actual supporter names/avatars here when you have them */}
      </div>
    </div>
  );
}
