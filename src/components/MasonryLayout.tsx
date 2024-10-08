import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin';
import { Pin as PinType } from '../utils/types';
type Props = {
  pins:PinType[] ;
};
const breakPointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }: Props) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakPointObj}>
      {pins.map((pin) => (
        <Pin key={pin._id} pin={pin} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
