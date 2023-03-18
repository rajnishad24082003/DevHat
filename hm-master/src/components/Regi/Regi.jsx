import React, { useState } from "react";
import "../Regi/regi.css";
import { database } from "../../misc/firebase";
import { set, ref, update } from "firebase/database";
import { useProfile } from "../../context/profile.context";
import AadharUpload from "../AadharUpload";
import PhotoUpload from "../PhotoUpload";

const Regi = () => {
  let { profile } = useProfile();
  console.log(profile);
  let visitedfun = (e) => {
    if (e.target.value === "yes") {
      let tag = document.querySelectorAll(".visitedYesNo");
      for (let i = 0; i < tag.length; i++) {
        tag[i].style = "display:grid";
      }
    }
    if (e.target.value === "no") {
      let tag = document.querySelectorAll(".visitedYesNo");
      for (let i = 0; i < tag.length; i++) {
        tag[i].style = "display:none";
      }
    }
  };

  const [formData, setFormData] = useState({});
  let formvaluechange = (val) => {
    let fieldname = val.target.name;
    let fieldvalue = val.target.value;
    setFormData((form) => {
      return {
        ...form,
        [fieldname]: fieldvalue,
      };
    });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    setFormData((form) => {
      return {
        ...form,
        author: { ...profile },
      };
    });
    await set(ref(database, `/formData/${profile.uid}`), {
      ...formData,
    });
  };
  return (
    <>
      <div className="overflow-scroll mt-8 md:col-span-2 md:mt-0">
        <form action="#" method="POST" onSubmit={handleSubmit}>
          <div className="overflow-scroll shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <input
                    onChange={(val) => {
                      formvaluechange(val);
                    }}
                    type="text"
                    name="firstname"
                    id="firstname"
                    autoComplete="givenname"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <input
                    onChange={(val) => {
                      formvaluechange(val);
                    }}
                    type="text"
                    name="lastname"
                    id="lastname"
                    autoComplete="familyname"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="col-span-6 ">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    age
                  </label>
                  <input
                    onChange={(val) => {
                      formvaluechange(val);
                    }}
                    type="text"
                    name="age"
                    id="age"
                    autoComplete="age"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="col-span-6 ">
                  <label
                    htmlFor="diseases"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Diseases
                  </label>
                  <input
                    onChange={(val) => {
                      formvaluechange(val);
                    }}
                    type="text"
                    name="diseases"
                    id="diseases"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    onChange={(val) => {
                      formvaluechange(val);
                    }}
                    htmlFor="visited"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    last visited
                  </label>
                  <select
                    onChange={visitedfun}
                    id="visited"
                    name="visited"
                    autoComplete="visited"
                    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>no</option>
                    <option>yes</option>
                  </select>
                </div>

                <div className="visitedYesNo hidden col-span-6">
                  <div>Date</div>
                  <div className="">
                    <div
                      className=""
                      data-te-datepicker-init
                      data-te-input-wrapper-init
                    >
                      <input
                        onChange={(val) => {
                          formvaluechange(val);
                        }}
                        type="date"
                        id="date"
                        name="date"
                        className="date"
                        placeholder="Select a date"
                      />
                    </div>
                  </div>
                </div>
                <div className="visitedYesNo hidden col-span-6">
                  <label
                    htmlFor="pastsymptoms"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    past symptoms
                  </label>
                  <input
                    onChange={(val) => {
                      formvaluechange(val);
                    }}
                    type="text"
                    name="pastsymptoms"
                    id="pastsymptoms"
                    autoComplete="pastsymptoms"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="visitedYesNo hidden col-span-6">
                  <label
                    htmlFor="doctorname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Doctor Name
                  </label>
                  <input
                    onChange={(val) => {
                      formvaluechange(val);
                    }}
                    type="text"
                    name="doctorname"
                    id="doctorname"
                    autoComplete="doctorname"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="visitedYesNo hidden col-span-6">
                  <label
                    htmlFor="hostitalname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Hostital Name
                  </label>
                  <input
                    onChange={(val) => {
                      formvaluechange(val);
                    }}
                    type="text"
                    name="hostitalname"
                    id="hostitalname"
                    autoComplete="hostitalname"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="visitedYesNo hidden col-span-6">
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    reason
                  </label>
                  <input
                    onChange={(val) => {
                      formvaluechange(val);
                    }}
                    type="text"
                    name="reason"
                    id="reason"
                    autoComplete="reason"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <AadharUpload></AadharUpload>
                <PhotoUpload></PhotoUpload>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Regi;
