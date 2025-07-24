import { useState } from 'react';
import api from '../services/api';
import JobSearch from './JobSearch';
import PropertySearch from './PropertySearch';

const Search = () => {
  const [type, setType] = useState('job');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async () => {
    if (!location.trim()) {
      setError('Please enter a location.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(`/search?type=${type}&location=${location}`);
      setResults(data);
    } catch (err) {
      setError('Failed to fetch results.');
    } finally {
      setLoading(false);
    }
  };

  const formatResult = (item) => {
    if (type === 'job') {
      return (
        <>
          <p className="font-semibold">{item.title} at {item.company}</p>
          <p className="text-sm text-gray-500">{item.location}</p>
        </>
      );
    }
    if (type === 'house') {
      return (
        <>
          <p className="font-semibold">{item.address}</p>
          <p className="text-sm text-gray-500">₹ {item.price} — {item.bedrooms} beds</p>
        </>
      );
    }
    return <pre>{JSON.stringify(item, null, 2)}</pre>;
  };

  return (
    <div>

  
    <JobSearch/>
    <PropertySearch/>
    </div>
  );
};

export default Search;
