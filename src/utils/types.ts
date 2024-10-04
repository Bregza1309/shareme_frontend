import { Dispatch } from 'react';
//User type
export type User = {
  _id: string;
  image: string;
  userName: string;
};

export function AssertIsUser(data: any): asserts data is User {
  if (data == null || typeof data !== 'object') {
    throw new Error(`Not an object or is empty`);
  }
  if (!('_id' in data)) {
    throw new Error('Id field is not available');
  }
  if (data._id == null || typeof data._id !== 'string') {
    throw new Error('Id cannot be null');
  }
  if (!('image' in data)) {
    throw new Error('Image Field is not available');
  }
  if (data.image == null || typeof data.image !== 'string') {
    throw new Error('Image is null');
  }
  if (!('userName' in data)) {
    throw new Error('Image Field is not available');
  }
  if (data.userName == null || typeof data.userName !== 'string') {
    throw new Error('Image is null');
  }
}

//Category type
export type Category = {
  name: string;
};

export type State = {
  searchTerm: string | undefined;
  user: User | undefined;
  loading: boolean;
};

export type Action =
  | {
      type: 'search';
      searchTerm: string;
    }
  | {
      type: 'authenticated';
      user: User | undefined;
    }
  | {
      type: 'loading';
    }
  | {
      type: 'loaded';
    };

export type AppContextType = State & {
  dispatch: Dispatch<Action>;
};
export const initialState: State = {
  user: undefined,
  searchTerm: '',
  loading: false,
};

export type Pin = {
  _id: string;
  image: any;
  destination: string;
  postedBy: { _id: string; userName: string; image: string };
  save: [{ postedBy: { _id: string; userName: string; image: string }; _key: string }];
};

export function assertIsPins(data: any): asserts data is Pin[] {
  if (!Array.isArray(data) || data == null) {
    throw new Error('Data is not an array');
  }
  data.forEach((pin) => {
    if (typeof pin !== 'object' && pin != null) {
      throw new Error('Pin is not an object');
    }
    if (!('_id' in pin)) {
      throw new Error('Attribute _id does not exist');
    }
    if (pin._id == null || typeof pin._id !== 'string') {
      throw new Error('Atribute _id is either null or not a string');
    }
    if (!('image' in pin)) {
      throw new Error('Attribute image does not exist');
    }
    if (!('destination' in pin)) {
      throw new Error('Attribute destination does not exist');
    }
    if (pin.destination == null || typeof pin.destination !== 'string') {
      throw new Error('Atribute destination is either null or not a string');
    }
    if (!('save' in pin)) {
      throw new Error('Attribute destination does not exist');
    }
    if (!Array.isArray(pin.save)) {
      throw new Error('Save is not an array');
    }
  });
}
export type PinDetail = {
  image: any;
  save: any[];
  comments: any[];
  _id: string;
  title: string;
  about: string;
  category: string;
  destination: string;
  postedBy: any;
};
