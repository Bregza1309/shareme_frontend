import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppContext } from '../AppContext';
import { client } from '../client';
import { categories } from '../utils/data';
import Spinner from './Spinner';
import { SanityImageAssetDocument } from '@sanity/client';
import ValidationError from './ValidationError';

type FormData = {
  title: string;
  about: string;
  destination: string;
  category: string;
};
const CreatePin = () => {
  const [loading, setLoading] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [imageAsset, setImageAsset] = useState<SanityImageAssetDocument | null>(null);
  const [fields, setFields] = useState(false);
  const navigate = useNavigate();
  const { user } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormData>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.item(0) as File;
    const { type, name } = selectedFile;
    if (
      type === 'image/png' ||
      type === 'image/jpeg' ||
      type === 'image/gif' ||
      type === 'image/tiff'
    ) {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload('image', selectedFile, { contentType: type, filename: name })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('image upload error ', error);
        });
    } else {
      setWrongImageType(true);
    }
  };
  const SavePin = (data: FormData) => {
    if (imageAsset != null) {
      const doc = {
        _type: 'pin',
        title: data.title,
        destination: data.destination,
        about: data.about,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id,
          },
        },
        userId: user?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user?._id,
        },
        category: data.category,
      };
      client.create(doc).then(() => {
        navigate('/');
      });
    } else {
      setFields(true);
      setTimeout(() => setFields(false), 2000);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please fill in all the fields
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full ">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p className="text-red-500">Wrong image type</p>}
            {imageAsset == null ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    use high quality JPG ,SVG PNG ,GIF or TIFF less than 20 MB
                  </p>
                </div>
                <input type="file" name="upload-image" onChange={uploadImage} className="w-0 h-0" />
              </label>
            ) : (
              <div className="relative h-full">
                <img src={imageAsset.url} alt="uploaded-pic" className="h-full w-full" />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit(SavePin)}
          className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5  w-full"
        >
          <input
            type="text"
            {...register('title', { required: 'Pin Title is Required' })}
            placeholder="Add your title here"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          <ValidationError fieldError={errors.title} />
          {user && (
            <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
              <img src={user.image} alt="user-profile" className="w-10 h-10 rounded-full" />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            {...register('about', { required: 'What is your Pin about?' })}
            placeholder="What is your pin about"
            className="outline-none text-base sm:text-l  border-b-2 border-gray-200 p-2"
          />
          <ValidationError fieldError={errors.about} />
          <input
            type="text"
            {...register('destination', { required: 'The image destination link is required' })}
            placeholder="Add a destination link"
            className="outline-none text-base sm:text-l border-b-2 border-gray-200 p-2"
          />
          <ValidationError fieldError={errors.destination} />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-xl">Choose Pin Category</p>
              <select
                {...register('category')}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="other" className="bg-white">
                  Select Category
                </option>
                {categories.map((c) => (
                  <option
                    key={c.name}
                    value={c.name}
                    className="text-base border-0 outline-none bg-white text-black "
                  >
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="submit"
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Save Pin
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePin;
