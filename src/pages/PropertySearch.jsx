import React, { useState } from "react";
import { Search, MapPin, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

// Mock PropertyCard component for demonstration
import PropertyCard from "../components/PropertyCard";

const ZumperSearch = () => {
  const [citySlug, setCitySlug] = useState("toronto-on");
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const RAPIDAPI_KEY = "ab13ebe236msh4bb24e769f314cfp1fe955jsn882fb4b174d6";
  const RAPIDAPI_HOST = "zumper-com-scraper.p.rapidapi.com";

  const fetchResults = async (offsetValue = 0) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://${RAPIDAPI_HOST}/properties/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": RAPIDAPI_HOST,
        },
        body: JSON.stringify({
          url: citySlug,
          offset: offsetValue,
          type: "longTerm",
        }),
      });

      const data = await response.json();
      console.log(data)
      if (data.listables) {
        setResults(data.listables);
        console.log(results)
        setOffset(offsetValue);
      } else {
        setError("No results found.");
      }
    } catch (err) {
      setError("Failed to fetch properties.");
      console.error(err);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchResults(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <MapPin className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Canadian Rentals
            </h1>
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            Discover your perfect rental property across Canada with real-time listings
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={citySlug}
                onChange={(e) => setCitySlug(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g. toronto-on, vancouver-bc, montreal-qc"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>
            <button
              onClick={() => fetchResults(0)}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Search
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Searching for properties...</p>
            <p className="text-gray-400 text-sm">This may take a few moments</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium">Search Failed</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {!loading && results.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Found {results.length} Properties
              </h2>
              <div className="text-sm text-gray-500">
                Showing results {offset + 1}-{offset + results.length}
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {results.map((listing) => (
                <PropertyCard key={listing.listing_id} property={listing} />
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && results.length === 0 && citySlug && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">Ready to search</p>
            <p className="text-gray-400">Enter a city and click search to find properties</p>
          </div>
        )}

        {/* Pagination */}
        {results.length > 0 && !loading && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => fetchResults(Math.max(offset - 10, 0))}
              disabled={offset === 0}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-medium">
              Page {Math.floor(offset / 10) + 1}
            </div>
            
            <button
              onClick={() => fetchResults(offset + 10)}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZumperSearch;