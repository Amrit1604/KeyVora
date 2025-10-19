import { Link } from 'react-router-dom';
import { Shield, Zap, Lock, FileCode2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-20">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-6 font-mono">
          KeyVora
        </h1>
        <p className="text-2xl text-gray-300 mb-8">
          Your Secure, Encrypted Note-Taking Platform
        </p>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Create, encrypt, and share notes with military-grade encryption.
          Your data stays private, always.
        </p>
        <Link
          to="/pads/new"
          className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105"
        >
          <FileCode2 className="w-6 h-6" />
          <span>Create Your First Pad</span>
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="bg-slate-800/50 backdrop-blur border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 transition">
          <Shield className="w-12 h-12 text-green-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">End-to-End Encryption</h3>
          <p className="text-gray-400">
            Your notes are encrypted in the browser before being sent to the server.
            Nobody can read them without your key.
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition">
          <Zap className="w-12 h-12 text-cyan-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
          <p className="text-gray-400">
            Built with modern technologies for instant loading and real-time updates.
            No lag, no waiting.
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition">
          <Lock className="w-12 h-12 text-purple-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Zero-Knowledge</h3>
          <p className="text-gray-400">
            We never store your encryption keys. Even if our servers are compromised,
            your data remains secure.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-24 mb-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12 font-mono">
          ⚡ How It Works
        </h2>
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="flex items-start space-x-6 bg-slate-800/30 border border-green-500/20 rounded-xl p-6">
            <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Create a Pad</h3>
              <p className="text-gray-400">
                Click "New Pad" and choose a unique name. This name is your pad's identifier—no account needed!
                Enable encryption for sensitive data.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start space-x-6 bg-slate-800/30 border border-cyan-500/20 rounded-xl p-6">
            <div className="flex-shrink-0 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Write & Attach Files</h3>
              <p className="text-gray-400">
                Type your note and attach files (images, PDFs, videos, docs). Files up to 10MB supported.
                If encrypted, everything is protected with AES-256-GCM.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start space-x-6 bg-slate-800/30 border border-purple-500/20 rounded-xl p-6">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Share Securely</h3>
              <p className="text-gray-400">
                Click "Share" to copy the pad link. Share it with anyone! For encrypted pads, also share
                the password (via a separate secure channel).
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start space-x-6 bg-slate-800/30 border border-yellow-500/20 rounded-xl p-6">
            <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
              4
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Access Anywhere</h3>
              <p className="text-gray-400">
                Open the pad link, enter the password (for encrypted pads), and view/edit your note.
                Password saved in session for convenience—use "Lock" button to secure again.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 border border-green-500/30 rounded-xl p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust KeyVora for their secure note-taking needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/pads/new"
            className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-lg font-bold text-lg transition"
          >
            <FileCode2 className="w-6 h-6" />
            <span>Create Pad</span>
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition"
          >
            <span>Learn More</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
