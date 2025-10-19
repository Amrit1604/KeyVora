import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Lock, Clock, Search } from 'lucide-react';
import { padApi, type Pad as ApiPad } from '../services/api';

interface Pad {
  id: string;
  title: string;
  content: string;
  encrypted: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PadsPage() {
  const [pads, setPads] = useState<Pad[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPads();
  }, []);

  const fetchPads = async () => {
    try {
      setLoading(true);
      const data = await padApi.getAllPads();

      // Transform API data to component format
      const transformedPads: Pad[] = data.map((pad: ApiPad) => ({
        id: pad.id,
        title: pad.title,
        content: pad.encrypted_blob || '',
        encrypted: pad.encrypted_blob ? pad.encrypted_blob.startsWith('{') : false,
        createdAt: pad.metadata.created_at,
        updatedAt: pad.metadata.updated_at,
      }));

      setPads(transformedPads);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch pads:', err);
      setError('Failed to load pads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredPads = pads.filter(pad =>
    pad.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your pads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Error Banner */}
      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white font-mono">My Pads</h1>
        <Link
          to="/pads/new"
          className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-semibold transition"
        >
          + New Pad
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search pads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800/50 border border-green-500/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
        />
      </div>

      {/* Pads Grid */}
      {filteredPads.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg mb-4">No pads found</p>
          <Link to="/pads/new" className="text-green-400 hover:text-green-300 underline">
            Create your first pad
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPads.map((pad) => (
            <Link
              key={pad.id}
              to={`/pads/${pad.id}`}
              className="bg-slate-800/50 backdrop-blur border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 hover:transform hover:scale-105 transition"
            >
              <div className="flex items-start justify-between mb-3">
                <FileText className="w-6 h-6 text-green-400" />
                {pad.encrypted && (
                  <Lock className="w-5 h-5 text-yellow-400" title="Encrypted" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 truncate">
                {pad.title}
              </h3>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2 h-10">
                {pad.encrypted ? '🔒 Encrypted content' :
                  (pad.content.substring(0, 100) + (pad.content.length > 100 ? '...' : ''))}
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                <span>{new Date(pad.updatedAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
