import classes from "./SignUpPassword.module.css";

import { useSignUp } from "../../../hookss/useSignUp";
// import { useLogout } from "../../../hookss/useLogout";

import { useState, useEffect } from "react";

import { auth } from "../../../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate, Link, useLocation } from "react-router-dom";

import { useAuthContext } from "../../../store/useAuthContext";

// import BackButton from "../../../components/BackButton";
// import SignUpEmailLink from "./SignUpEmailLink";

export default function SignUpPassword() {
  const { user, authIsReady } = useAuthContext();

  const [nickName, setNickName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { error, signUp } = useSignUp();
  // const { logout } = useLogout();

  const [loading, setLoading] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(nickName, userEmail, userEmail);
    signUp(userEmail, userPassword, nickName);

    setLoading(true);

    const id = setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 2000);

    setTimerId(id);
  };

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  // if (user !== null) {
  //   setIsPending(true);
  // }

  const nickNameHandler = async (e) => {
    e.preventDefault();
    console.log(nickName);

    setNickName(e.target.value);
  };

  const emailTypingHandler = async (e) => {
    e.preventDefault();
    console.log(userEmail);

    setUserEmail(e.target.value);
  };

  function passwordTypingHandler(e) {
    e.preventDefault();

    setUserPassword(e.target.value);
  }

  function singUpWithEmailAndPasswordHandler(event) {
    event.preventDefault();
    console.log(userEmail, userPassword);

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        console.log("회원가입이 성공했어요");
        console.log("userCredential : ", userCredential);

        const user = userCredential.user;
      })
      .catch((error) => {
        console.log("회원가입이 실패했어요 ");
        console.log("error : ", error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function showLogHandler(event) {
    event.preventDefault();
    console.log(app);
  }

  return (
    <>
      <div className={classes.wholePasswordPage}>
        <p className={classes.title}>계정을 생성하세요</p>
        <p className={classes.subTitle}>이메일과 비밀번호 방식 회원가입</p>

        <form className={classes.emailLinkAuth}>
          <input
            required
            // 선택
            type="text"
            className={classes.textName}
            // placeholder="닉네임 (optional)"
            placeholder="닉네임"
            onChange={nickNameHandler}
            // value={nickName}
          />
          <div className={classes.line}></div>

          <input
            required
            type="email"
            className={classes.textEmail}
            placeholder="이메일 주소"
            onChange={emailTypingHandler}
            value={userEmail}
          />
          <div className={classes.line}></div>

          <input
            required
            type="password"
            className={classes.textpassword}
            placeholder="비밀번호"
            onChange={passwordTypingHandler}
            value={userPassword}
            minLength={6}
            maxLength={12}
          />
          <div className={classes.line}></div>
        </form>

        <div className={classes.buttonSection}>
          <button className={classes.authButton} type="button" onClick={submitHandler}>
            가입
          </button>
        </div>

        {error && <p className={classes.errorMessage}> {error}</p>}

        {loading && (
          <div className="spinner">
            <img className={classes.loadingLogo} src="/assets/images/spinner/Spinner2.gif" alt="spalash" />

            {/* <div className="loader"></div> */}
          </div>
        )}
        {/* <button className={classes.logout} onClick={logout}>
          {" "}
          로그아웃
        </button> */}
        {/* {isSendEmailLink && <EmailLinkSent isSendLink={isSendEmailLink} />} */}
      </div>
    </>
    // <div className={classes.wholePageSignUpPassword}>
    //   <div className={classes.sections}>
    //     <div className={classes.topSection}>
    //       <p className={classes.title}> 계정을d 생성하세요</p>
    //     </div>

    //     <div className={classes.middleSection}>
    //       <form className={classes.authForm}>
    //         <div>
    //           email : <input type="email" onChange={emailTypingHandler} id="signUpEmailPassword" />
    //         </div>

    //         <button type="button" onClick={singUpWithEmailAndPasswordHandler} id="signUpButton">
    //           회원가입 하기
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
}
