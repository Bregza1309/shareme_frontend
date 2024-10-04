import React from 'react';
import { Circles } from 'react-loader-spinner';

type Props = {
  message?: string;
};
const Spinner = ({ message }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Circles height={50} width={200} color="#0028F8" ariaLabel={message} />
      {message && <p className="text-lg text-center px-2">{message}</p>}
    </div>
  );
};

export default Spinner;
