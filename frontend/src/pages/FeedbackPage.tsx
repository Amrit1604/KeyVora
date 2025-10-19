import { useState } from 'react';
import { Mail, Send, MessageSquare, Bug, Lightbulb, Heart } from 'lucide-react';

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'general'>('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, send this to your backend/email service
    console.log('Feedback submitted:', { feedbackType, name, email, message });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <MessageSquare className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-white font-mono mb-2">Feedback</h1>
        <p className="text-gray-400">
          Help us improve KeyVora! Share your thoughts, report bugs, or suggest features.
        </p>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-6 mb-8 text-center">
          <Heart className="w-12 h-12 text-green-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-green-400 mb-2">Thank You!</h3>
          <p className="text-gray-300">
            Your feedback has been received. We appreciate your input! 🎉
          </p>
        </div>
      )}

      {/* Feedback Form */}
      <div className="bg-slate-800/50 border border-green-500/20 rounded-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Feedback Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              What type of feedback are you sharing?
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFeedbackType('bug')}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition ${
                  feedbackType === 'bug'
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
              >
                <Bug className="w-8 h-8 text-red-400 mb-2" />
                <span className="text-white font-semibold">Bug Report</span>
              </button>
              <button
                type="button"
                onClick={() => setFeedbackType('feature')}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition ${
                  feedbackType === 'feature'
                    ? 'border-yellow-500 bg-yellow-500/10'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
              >
                <Lightbulb className="w-8 h-8 text-yellow-400 mb-2" />
                <span className="text-white font-semibold">Feature Idea</span>
              </button>
              <button
                type="button"
                onClick={() => setFeedbackType('general')}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition ${
                  feedbackType === 'general'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
              >
                <MessageSquare className="w-8 h-8 text-green-400 mb-2" />
                <span className="text-white font-semibold">General</span>
              </button>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name (Optional)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name..."
              className="w-full bg-slate-800/50 border border-green-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email (Optional, for follow-up)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-slate-800/50 border border-green-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Feedback *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think..."
              rows={8}
              required
              className="w-full bg-slate-800/50 border border-green-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 font-mono"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!message.trim()}
            className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black px-6 py-3 rounded-lg font-semibold transition"
          >
            <Send className="w-5 h-5" />
            <span>Send Feedback</span>
          </button>
        </form>
      </div>

      {/* Contact Info */}
      <div className="mt-8 bg-slate-800/30 border border-green-500/20 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-3">Other Ways to Reach Us</h3>
        <div className="space-y-2 text-gray-400">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-green-400" />
            <span>Email: feedback@keyvora.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-green-400" />
            <span>GitHub Issues: github.com/yourusername/keyvora/issues</span>
          </div>
        </div>
      </div>
    </div>
  );
}
