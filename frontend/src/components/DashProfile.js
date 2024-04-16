import { React, useState, useRef, useEffect } from "react";
import { Alert, Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "react-hot-toast";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFIle] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUplodProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUplodError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();
  console.log(imageFileUplodProgress, imageFileUplodError);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file) {
        if (file.type.startsWith("image/")) {
          setImageFIle(file);
          setImageFileUrl(URL.createObjectURL(file));
        } else {
          toast.error("Unsupported file format");
        }
      }
    }
  };
  console.log(imageFile);
  console.log(imageFileUrl);
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload Image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFIle(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded--full"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          {imageFileUplodProgress && (
            <CircularProgressbar
              value={imageFileUplodProgress || 0}
              text={`${imageFileUplodProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUplodProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUplodProgress &&
              imageFileUplodProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUplodError && (
          <Alert color="failure">{imageFileUplodError}</Alert>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          defaultValue={currentUser.password}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account </span>
        <span className="cursor-pointer">Sign Out </span>
      </div>
    </div>
  );
};

export default DashProfile;
