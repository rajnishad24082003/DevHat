import React, { useRef, useState } from "react";
import {
  uploadBytes,
  getDownloadURL,
  ref as ref_storage,
} from "firebase/storage";
import { storage, database } from "../misc/firebase";
import { useProfile } from "../context/profile.context";
import { set, ref as ref_database } from "firebase/database";

function PhotoUpload() {
  let { profile } = useProfile();
  let acceptedfileformate = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/svg",
    "image/webp",
    "image/gif",
  ];
  let isvalidfile = (file) => {
    return acceptedfileformate.includes(file.type);
  };
  let [mainimage, setmainimage] = useState(null);
  let mainfilefun = (e) => {
    if (e.target.files.length === 1 && isvalidfile(e.target.files[0])) {
      setmainimage(e.target.files[0]);
      UploadandClose();
      return;
    } else {
      return;
    }
  };
  let getBlod = (canvas) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("file processing error"));
        }
      });
    });
  };

  let UploadandClose = async () => {
    const canvas = mainimage;
    console.log(canvas);
    try {
      const blob = canvas;
      const spaceRef = ref_storage(storage, `/formData/${profile.uid}/photo`);
      await uploadBytes(spaceRef, blob, {
        cacheControl: `public,max-age=${3600 * 24 * 3}`,
      });
      let downloadurl = await getDownloadURL(
        ref_storage(storage, `/formData/${profile.uid}/photo`)
      );
      const uploadurl = ref_database(
        database,
        `/formData/${profile.uid}/photo`
      );
      await set(uploadurl, downloadurl);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="visitedYesNo hidden col-span-6">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="photo"
        >
          photo upload
        </label>
        <input
          onChange={(val) => {
            mainfilefun(val);
          }}
          className="block w-full text-sm p-1 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          type="file"
        />
      </div>
    </>
  );
}

export default PhotoUpload;
