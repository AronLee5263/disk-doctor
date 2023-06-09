import classes from "./LoginForm.module.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm({ onLink, onPassword }) {
  let navigate = useNavigate();

  //   const [flag1, setFlag1] = useState(false);

  return (
    <div className={classes.sections}>
      <div className={classes.titleSection}>
        <p className={classes.titleText}>만나서 반가워요! disc doctor를 이용하려면 로그인 하세요.</p>
      </div>

      <div className={classes.authSection}>
        <Link className={classes.SignUpGoogle}>
          <img className={classes.googleLogo} src="/assets/images/logo/google_logo.png" alt="google_logo" />
          <span className={classes.googleText}>Google로 계속하기</span>
        </Link>

        <div className={classes.also}>
          <div className={classes.alsoLine}></div>
          <div className={classes.alsoText}>
            <span>또는</span>
          </div>
          <div className={classes.alsoLine}></div>
        </div>

        <button
          type="button"
          // to="/sign_up/with_email_link"
          className={classes.SignUpEmailLink}
          onClick={onLink}
        >
          <span className={classes.authText}>로그인 / for Email-Link</span>
        </button>

        <button
          type="button"
          // to="/sign_up/with_password"
          className={classes.SignUpPassword}
          onClick={onPassword}
        >
          <span className={classes.authText}>로그인 / for Email-password</span>
        </button>
      </div>

      <div className={classes.bottomSection}>
        <div className={classes.exsitingAccount}>
          <p className={classes.exsitingAccountText}>계정이 없으신가요? </p>
          <Link to="/sign_up" className={classes.loginLink}>
            {" "}
            가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
