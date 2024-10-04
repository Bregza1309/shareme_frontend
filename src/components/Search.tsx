import React, { useState, useEffect } from 'react';
import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';
import { Pin } from '../utils/types';
import { useAppContext } from '../AppContext';
const Search = () => {
  const { searchTerm } = useAppContext();
  const [pins, setPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = (query: any) => {
    client.fetch(query).then((data) => {
      setPins(data);
      setLoading(false);
    });
  };
  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      fetchData(query);
    } else {
      fetchData(feedQuery);
    }
  }, [searchTerm]);
  return (
    <div>
      {loading && <Spinner message="Searching for pins" />}
      {pins.length !== 0 && <MasonryLayout pins={pins} />}
      {pins.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl">No Pins Found with  '{searchTerm}'</div>
      )}
    </div>
  );
};

export default Search;
