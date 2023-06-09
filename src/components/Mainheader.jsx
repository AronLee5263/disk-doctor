import classes from "./MainHeader.module.css";

import { useState, useEffect } from "react";
import { Link, NavLink, Form, useLocation, useNavigate } from "react-router-dom";

import { AiOutlinePlus, AiOutlineStar, AiOutlineLineChart, AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GoCommentDiscussion } from "react-icons/go";
import { CiUser } from "react-icons/ci";

import ProfilePopup from "./ProfilePopup";
import NewPost from "../routes/pages/NewPost";

import { useAuthContext } from "../store/useAuthContext";

function MainHeader() {
  const [profilePopupIsVisible, setProfilePopupIsVisible] = useState(false);
  const [isClickedNP, setIsClickedNPB] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;
  // const state = location.state;
  const { user, authIsReady } = useAuthContext();

  let nickName = "";
  let userEmail = "";

  if (user) {
    console.log("user 출력 : ", user);
    nickName = user.nickName;
    userEmail = user.email;
  } else {
    nickName = "임시 nick name";
    userEmail = "임시 user email";
  }

  useEffect(() => {
    // isClicked 가 true일떄만 실행되게 바로 리턴하는 패턴
    if (isClickedNP === false) return;

    setIsClickedNPB(false);
    console.log("must be false after 1 second : ", isClickedNP);

    if (isClickedNP) {
      navigate("/create_post");
      setIsClickedNPB(false);
    }
  }, [isClickedNP]);

  // console.log("currentPath : ", currentPath);

  return (
    <>
      {isClickedNP ? (
        <NewPost />
      ) : (
        <>
          {profilePopupIsVisible && (
            <ProfilePopup
              onCloseProfilePopup={() => {
                setProfilePopupIsVisible(false);
              }}
              nickName={nickName}
              userEmail={userEmail}
            />
          )}

          <div className={classes.headerContainer}>
            <div className={classes.profile}>
              <button
                type="button"
                className={classes.profile_icon}
                onClick={() => {
                  setProfilePopupIsVisible(true);
                }}
              >
                <CgProfile size={32} className={classes.icon} />

                {/* <p className={classes.nickName}>{nickName}</p> */}
              </button>
            </div>

            {/* <nav className={classes.header_nav}>
              <ul className={classes.category}>
                <li>
                  <NavLink to="/" className={({ isActive }) => (isActive ? classes.active : undefined)} end>
                    <GoCommentDiscussion size={30} className={classes.icon} />
                    커뮤니티
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/goal" className={({ isActive }) => (isActive ? classes.active : undefined)}>
                    달성기록
                    <AiOutlineStar size={30} className={classes.icon} />
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/analysis" className={({ isActive }) => (isActive ? classes.active : undefined)}>
                    분석
                    <AiOutlineLineChart size={30} className={classes.icon} />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/myinfo" className={({ isActive }) => (isActive ? classes.active : undefined)}>
                    내 정보
                    <CiUser size={30} className={classes.icon} />
                  </NavLink>
                </li>
              </ul>
            </nav> */}

            <img className={classes.ddocLogo} src="/assets/images/logo/disc_logo_1.png" alt="app_logo" />

            <div className={classes.tempp}></div>
            <Form method="post" className={classes.NewPostform}>
              {currentPath === "/" && (
                <button
                  type="button"
                  className={classes.newPostButton}
                  onClick={() => {
                    setIsClickedNPB(true);
                  }}
                >
                  <AiOutlinePlus size={26} className={classes.newPostIcon} />
                </button>
              )}
            </Form>
          </div>

          <div className={classes.bottom_container}>
            <ul className={classes.category_bottom}>
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? classes.active : classes.disabled)} end>
                  <GoCommentDiscussion size={25} />
                  {/* 커뮤니티 */}
                </NavLink>
              </li>
              <li>
                <NavLink to="/goal" className={({ isActive }) => (isActive ? classes.active : classes.disabled)}>
                  {/* 달성기록 */}
                  <AiOutlineStar size={25} className={classes.bottom_icon} />
                </NavLink>
              </li>
              <li>
                <NavLink to="/analysis" className={({ isActive }) => (isActive ? classes.active : classes.disabled)}>
                  {/* 분석 */}
                  <AiOutlineLineChart size={25} className={classes.bottom_icon} />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/notification"
                  className={({ isActive }) => (isActive ? classes.active : classes.disabled)}
                >
                  <AiOutlineBell size={25} className={classes.bottom_icon} />
                </NavLink>
              </li>
              <li>
                <NavLink to="/myinfo" className={({ isActive }) => (isActive ? classes.active : classes.disabled)}>
                  {/* 내 정보 */}
                  <AiOutlineUser size={25} className={classes.bottom_icon} />
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default MainHeader;
