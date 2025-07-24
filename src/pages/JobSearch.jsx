import React, { useState } from "react";
import { Search, Briefcase, MapPin, Building, ExternalLink, AlertCircle, Users, DollarSign } from "lucide-react";

const ADZUNA_APP_ID = "b7eccf12";
const ADZUNA_APP_KEY = "121d4872e3fb1c6989fd8a9e5c0b0d1d";

const JobSearch = () => {
  const [keyword, setKeyword] = useState("react developer");
  const [location, setLocation] = useState("toronto");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const url = `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&what=${encodeURIComponent(
        keyword
      )}&where=${encodeURIComponent(location)}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        setResults(data.results);
      } else {
        setError("No results found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch jobs");
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatSalary = (salary) => {
    if (!salary || salary.min === undefined || salary.max === undefined) return null;
    const min = Math.round(salary.min);
    const max = Math.round(salary.max);
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Job Search
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover your next career opportunity with thousands of job listings across Canada
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Job title (e.g. React developer)"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Location (e.g. Toronto)"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white"
              />
            </div>
            
            <button
              onClick={handleSearch}
              disabled={loading}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Find Jobs
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
              <Briefcase className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Searching for Jobs</h3>
            <p className="text-gray-600">Finding the best opportunities for you...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Search Failed</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Found {results.length} Jobs
              </h2>
              <div className="text-gray-500">
                Showing top results for "{keyword}" in {location}
              </div>
            </div>
            
            <div className="space-y-6">
              {results.map((job) => (
                <div 
                  key={job.id} 
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl">
                          <Briefcase className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
                            <div className="flex items-center gap-2">
                              <Building className="w-4 h-4" />
                              <span className="font-medium">{job.company.display_name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location.display_name}</span>
                            </div>
                            {formatSalary(job.salary) && (
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                <span className="font-medium text-green-600">
                                  {formatSalary(job.salary)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-700 leading-relaxed">
                          {stripHtml(job.description)?.slice(0, 300)}
                          {job.description && stripHtml(job.description).length > 300 && "..."}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.category && (
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                            {job.category.label}
                          </span>
                        )}
                        {job.contract_type && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {job.contract_type}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 lg:items-end">
                      <a
                        href={job.redirect_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        Apply Now
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <div className="text-sm text-gray-500 lg:text-right">
                        Posted {new Date(job.created).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && results.length === 0 && keyword && location && (
          <div className="text-center py-16">
            <div className="p-4 bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Jobs Found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or location to find more opportunities
            </p>
            <button
              onClick={() => {
                setKeyword("developer");
                setLocation("canada");
              }}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Try a broader search
            </button>
          </div>
        )}

        {/* Initial State */}
        {!loading && !error && results.length === 0 && !keyword && !location && (
          <div className="text-center py-16">
            <div className="p-4 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Briefcase className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Find Your Dream Job?</h3>
            <p className="text-gray-600">
              Enter a job title and location to start your search
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearch;