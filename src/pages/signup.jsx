import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { CommonInputs } from "../components/Common/CommonInputs";
import { ImageDropDiv } from "../components/Common/ImageDropDiv";

import { registerUser } from "../utils/authUser";
import { baseUrl } from "../utils/baseUrl";
import {
  HeaderMessage,
  FooterMessage,
} from "../components/Common/WelcomeMessage";

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
let cancel;

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    facebook: "",
    youtube: "",
    twitter: "",
    instagram: "",
  });

  const { name, email, password, bio } = user;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [username, setUsername] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [highlighted, setHighlighted] = useState(false);
  const inputRef = useRef();

  // useEffect とは、関数の実行タイミングをReactのレンダリング後まで遅らせるhook
  // 第2引数に [] を渡すと初回レンダリング時のみ副作用関数を実行
  // 第2引数に [state] と渡すとstateに変化があった場合のみ副作用関数を実行
  useEffect(() => {
    const isUser = Object.values({
      name,
      email,
      password,
      bio,
    }).every((item) => Boolean(item));
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  const checkUsername = async () => {
    setUsernameLoading(true);
    try {
      cancel && cancel();

      const CancelToken = axios.CancelToken;

      const res = await axios.get(`${baseUrl}/api/signup/${username}`, {
        cancelToken: new CancelToken((canceler) => {
          cancel = canceler;
        }),
      });

      if (errorMsg !== null) setErrorMsg(null);

      if (res.data === "Available") {
        setUsernameAvailable(true);
        setUser((prev) => ({ ...prev, username }));
        console.log(user);
      }
    } catch (error) {
      setErrorMsg("Username Not Available");
      setUsernameAvailable(false);
    }
    setUsernameLoading(false);
  };

  useEffect(() => {
    username === "" ? setUsernameAvailable(false) : checkUsername();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    let profilePicUrl;
    if (media !== null) {
      // TODO: uploadPic 関数の実装
      profilePicUrl = await uploadPic(media);
    }

    if (media !== null && !profilePicUrl) {
      setFormLoading(false);
      return setErrorMsg("Error Uploading Image");
    }
    await registerUser(user, profilePicUrl, setErrorMsg, setFormLoading);
  };

  const test = () => {
    console.log(submitDisabled);
    console.log(!usernameAvailable);
  };

  return (
    <>
      <HeaderMessage />
      <form onSubmit={handleSubmit}>
        <div>
          <div onClick={() => setErrorMsg(null)}>×</div>
          <span>Oops!</span>
          <span>{errorMsg}</span>
        </div>
        <div>
          <ImageDropDiv
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            setMedia={setMedia}
            inputRef={inputRef}
            highlighted={highlighted}
            setHighlighted={setHighlighted}
            handleChange={handleChange}
          />
          <div>
            <label htmlFor="name">Name</label>
            <input
              required
              name="name"
              value={name}
              type="text"
              placeholder="Name"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              required
              name="email"
              type="email"
              value={email}
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              required
              name="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={handleChange}
            />
            <div onClick={() => setShowPassword(!showPassword)}>Show</div>
            {showPassword ? (
              <>
                <span>{password}</span>
              </>
            ) : null}
          </div>

          <div>
            <label htmlFor="username">Username</label>
            <input
              required
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (regexUserName.test(e.target.value)) {
                  setUsernameAvailable(true);
                } else {
                  setUsernameAvailable(false);
                }
              }}
            />
          </div>

          <CommonInputs
            user={user}
            showSocialLinks={showSocialLinks}
            setShowSocialLinks={setShowSocialLinks}
            handleChange={handleChange}
          />

          <button type="submit" disabled={submitDisabled || !usernameAvailable}>
            Signup
          </button>
          <button type="submit">Signup Test</button>
          <div onClick={test}>checkStatus</div>
        </div>
      </form>
      <FooterMessage />
    </>
  );
}
