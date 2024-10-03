import React, {
  useState,
  useRef,
  useContext,
  useReducer,
  useEffect,
} from "react";
import Avatar from '@mui/material/Avatar';
import avatar from "../../images/ava.jpg";
import Button from '@mui/material/Button';
import addImage from "../../images/add-image.png";
import { AuthContext } from "../AppContext/AppContext";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  PostsReducer,
  postActions,
  postsStates,
} from "../AppContext/postreducer";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Alert } from "@material-tailwind/react";
import PostCard from "./PostCard";

const Main = () => {
  const { user, userData } = useContext(AuthContext);
  const text = useRef("");
  const scrollRef = useRef("");
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);  // Store PDF URL
  const collectionRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;
  const [progressBar, setProgressBar] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    
    // Only allow PDF files
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  const submitPdf = async () => {
    if (!file) return;

    try {
      const storageRef = ref(getStorage(), `pdfs/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file, { contentType: file.type });

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgressBar(progress);
        },
        (error) => {
          alert(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setPdfUrl(downloadURL);  // Store the PDF URL after upload
        }
      );
    } catch (err) {
      dispatch({ type: HANDLE_ERROR });
      alert(err.message);
      console.log(err.message);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (text.current.value !== "") {
      try {
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          logo: user?.photoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: text.current.value,
          pdfUrl: pdfUrl,  // Add the PDF URL to the post data
          timestamp: serverTimestamp(),
        });
        text.current.value = "";
        setPdfUrl(null);
        setFile(null);
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };

  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      await onSnapshot(q, (doc) => {
        dispatch({
          type: SUBMIT_POST,
          posts: doc?.docs?.map((item) => item?.data()),
        });
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
        setProgressBar(0);
      });
    };
    return () => postData();
  }, [SUBMIT_POST]);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          setIsAdmin(!!idTokenResult.claims.admin);
        } catch (error) {
          console.error("Error fetching user token:", error);
        }
      }
    };
    fetchUserRole();
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
        <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
          <Avatar
            size="sm"
            variant="circular"
            src={user?.photoURL || avatar}
            alt="avatar"
          ></Avatar>
          
            <form className="w-full" onSubmit={handleSubmitPost}>
              <div className="flex justify-between items-center">
                <div className="w-full ml-4">
                  <input
                    type="text"
                    name="text"
                    placeholder={`What's on your mind ${user?.displayName?.split(" ")[0] || userData?.name?.charAt(0).toUpperCase() + userData?.name?.slice(1)}?`}
                    className="outline-none w-full bg-white rounded-md"
                    ref={text}
                  ></input>
                </div>
                <div className="mx-4">
                  {pdfUrl && (
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                      View Uploaded PDF
                    </a>
                  )}
                </div>
                <div className="mr-4">
                  <Button variant="text" type="submit">
                    Share
                  </Button>
                </div>
              </div>
            </form>
          
        </div>
        <span
          style={{ width: `${progressBar}%` }}
          className="bg-blue-700 py-1 rounded-md"
        ></span>
        <div className="flex justify-around items-center pt-4">
          <div className="flex items-center">
            <label
              htmlFor="addPdf"
              className="cursor-pointer flex items-center"
            >
              <img className="h-10 mr-4" src={addImage} alt="addPdf"></img>
              <input
                id="addPdf"
                type="file"
                style={{ display: "none" }}
                accept="application/pdf"  // Only allow PDFs
                onChange={handleUpload}
              ></input>
            </label>
            {file && (
              <Button variant="text" onClick={submitPdf}>
                Upload PDF
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4 w-full">
        {state?.error ? (
          <div className="flex justify-center items-center">
            <Alert color="red">
              Something went wrong. Please refresh and try again...
            </Alert>
          </div>
        ) : (
          <div>
            {state?.posts?.length > 0 &&
              state?.posts?.map((post, index) => {
                return (
                  <PostCard
                    key={index}
                    logo={post?.logo}
                    id={post?.documentId}
                    uid={post?.uid}
                    name={post?.name}
                    email={post?.email}
                    text={post?.text}
                    timestamp={new Date(post?.timestamp?.toDate())?.toUTCString()}
                    pdfUrl={post?.pdfUrl}  // Pass the PDF URL to the PostCard
                  />
                );
              })}
          </div>
        )}
      </div>
      <div ref={scrollRef}></div>
    </div>
  );
};

export default Main;
