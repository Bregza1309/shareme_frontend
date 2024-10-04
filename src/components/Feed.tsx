import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import Spinner from './Spinner';
import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import { assertIsPins, Pin } from '../utils/types';
const Feed = () => {
  const { categoryId } = useParams();
  const { loading, dispatch } = useAppContext();
  const [pins, setPins] = useState<Pin[]>([]);
  const setLoading = (loading: boolean) => {
    loading ? dispatch({ type: 'loading' }) : dispatch({ type: 'loaded' });
  };
  useEffect(() => {
    //setLoading to true
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        //console.log(data);
        setPins(data);

        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
        //console.log(pins);
      });
    }
  }, [categoryId]);
  //console.log(pins);
  if (loading) return <Spinner message="We are adding new ideas to your feed " />;
  if (!pins?.length) return <h2>No Pins Available</h2>;
  return pins && <MasonryLayout pins={pins} />;
};

export default Feed;
