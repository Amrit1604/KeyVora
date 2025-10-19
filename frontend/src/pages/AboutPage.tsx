import { Link } from 'react-router-dom';
import { Code, Shield, Zap, Github, Mail, Coffee } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Code className="w-16 h-16 text-green-400" />
        </div>
        <h1 className="text-5xl font-bold text-white font-mono mb-4">
          About <span className="text-green-400">KeyVora</span>
        </h1>
        <p className="text-xl text-gray-400">
          Secure, encrypted note-taking with military-grade protection
        </p>
      </div>

      {/* Project Info */}
      <div className="bg-slate-800/50 border border-green-500/20 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">📝 What is KeyVora?</h2>
        <p className="text-gray-300 mb-4">
          KeyVora is a modern, privacy-focused note-taking application that puts security first.
          Store your sensitive information with AES-256-GCM encryption, share notes securely, and
          attach files—all in a sleek, cyberpunk-themed interface.
        </p>
        <p className="text-gray-300">
          No authentication required. Your pad name is your identity. Your password is your key.
          Simple, secure, and powerful.
        </p>
      </div>

      {/* Key Features */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800/30 border border-green-500/20 rounded-xl p-6">
          <Shield className="w-10 h-10 text-green-400 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">🔐 Military-Grade Encryption</h3>
          <p className="text-gray-400">
            AES-256-GCM encryption with PBKDF2 key derivation (100,000 iterations).
            Your data is secure even on public servers.
          </p>
        </div>

        <div className="bg-slate-800/30 border border-green-500/20 rounded-xl p-6">
          <Zap className="w-10 h-10 text-yellow-400 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">⚡ Lightning Fast</h3>
          <p className="text-gray-400">
            Built with React 18 and Vite for instant load times. Modern tech stack
            for the best performance.
          </p>
        </div>

        <div className="bg-slate-800/30 border border-green-500/20 rounded-xl p-6">
          <Code className="w-10 h-10 text-blue-400 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">📁 File Attachments</h3>
          <p className="text-gray-400">
            Upload images, videos, PDFs, documents up to 10MB per file. Preview
            directly in the browser.
          </p>
        </div>

        <div className="bg-slate-800/30 border border-green-500/20 rounded-xl p-6">
          <Shield className="w-10 h-10 text-purple-400 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">🔒 Session Security</h3>
          <p className="text-gray-400">
            Passwords cached in sessionStorage for convenience. Clear on browser close
            or use Lock button for instant security.
          </p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-slate-800/50 border border-green-500/20 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">🛠️ Built With</h2>
        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <div>
            <h3 className="text-green-400 font-semibold mb-2">Frontend:</h3>
            <ul className="space-y-1 text-sm">
              <li>• React 18 + TypeScript</li>
              <li>• Vite 7.1.14 (Rolldown)</li>
              <li>• TailwindCSS v4</li>
              <li>• React Router DOM</li>
              <li>• Lucide React Icons</li>
              <li>• Web Crypto API</li>
            </ul>
          </div>
          <div>
            <h3 className="text-green-400 font-semibold mb-2">Backend:</h3>
            <ul className="space-y-1 text-sm">
              <li>• Node.js + Express</li>
              <li>• MongoDB + Mongoose</li>
              <li>• AES-256-GCM Encryption</li>
              <li>• CORS Enabled</li>
              <li>• 50MB Payload Support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Creator Info */}
      <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">👨‍💻 About the Creator</h2>
        <p className="text-gray-300 mb-4">
          Created with ❤️ by <span className="text-green-400 font-bold">Amrit</span>
        </p>
        <p className="text-gray-400 mb-6">
          A passionate developer building secure, user-friendly applications.
          KeyVora was born from the need for a simple, secure way to share
          encrypted notes without complicated authentication systems.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <Link
            to="/feedback"
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Mail className="w-5 h-5" />
            <span>Send Feedback</span>
          </Link>
          <Link
            to="/support"
            className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Coffee className="w-5 h-5" />
            <span>Support the Project</span>
          </Link>
        </div>
      </div>

      {/* Open Source */}
      <div className="bg-slate-800/50 backdrop-blur border border-green-500/20 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">🌟 Open Source</h2>
        <p className="text-gray-300 mb-6">
          KeyVora is open source! Check out the code, contribute, or fork it for your own use.
        </p>
        <a
          href="https://github.com/yourusername/keyvora"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-semibold transition"
        >
          <Github className="w-5 h-5" />
          <span>View on GitHub</span>
        </a>
      </div>
    </div>
  );
}
