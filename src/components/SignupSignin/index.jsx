import React, { useState } from 'react';
import "./styles.css";
import Input from '../Input';
import Button from '../Button';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { provider, db } from "../../firebase";

function SignupSignInComponent() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  // const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [loginform, setLoginForm] = useState(false);

  const navigate = useNavigate();


  function signupwithEmail() {
    setLoading(true);
    console.log("Name", name);
    console.log("Email", email);
    console.log("Password", password);
    console.log("CPassword", confirmpassword);

    //authentcate

    if (name != "" && email != "" && password != "" && confirmpassword != "") {

      if (password == confirmpassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            toast.success("User Created!!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Confirm Password doesn't match");
        setLoading(false);

      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    // Make sure that the doc with the uid doesn't exist
    // Create a doc.
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name, 
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "", 
          createdAt: new Date(),
        });
        toast.success("Doc created!");
      } catch (e) {
          toast.error(e.message);
      }
    } else {
      toast.error("User already exists");
    }
  }

    function loginwithEmail() {
      console.log("name", name);
      console.log("password", password);

      if (email != "" && password != "") {

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("User obj", user);
            toast.success("User Logged In!!");
            setLoading(false);
            navigate("/dashboard");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });

      }
      else {
        toast.error("All fields are mandatory");
      }
    }

    return (
      <>
        {loginform ?

          <div className="signup-wrapper">
            <h2 className="title">
              Login on <span style={{ color: "var(--theme)" }}>Expenzo.</span>
            </h2>
            <form>
              <Input label={"Email"} type="email" state={email} setState={setEmail} placeholder={"johndoe@gmail.com"} />

              <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder={"Password123"} />

              <Button disabled={loading} onClick={loginwithEmail} text={loading ? "Loading..." : "Login Using Email and Password"} />

              <p style={{ textAlign: "center", margin: 0 }}>OR</p>

              <Button text={loading ? "Loading..." : "Login Using Google"} blue={true} />

              <p className="p-login" onClick={() => setLoginForm(!loginform)}>Or Don't Have An Account? Click Here</p>
            </form>
          </div>

          :

          <div className="signup-wrapper">
            <h2 className="title">
              Sign Up on <span style={{ color: "var(--theme)" }}>Expenzo.</span>
            </h2>

            <form>
              <Input label={"Full Name"} state={name} setState={setName} placeholder={"John Doe"} />

              <Input label={"Email"} type="email" state={email} setState={setEmail} placeholder={"johndoe@gmail.com"} />

              <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder={"Password123"} />

              <Input type="password" label={"Confirm Password"} state={confirmpassword} setState={setConfirmPassword} placeholder={"Password123"} />

              <Button disabled={loading} onClick={signupwithEmail} text={loading ? "Loading..." : "Signup Using Email and Password"} />

              <p style={{ textAlign: "center", margin: 0 }}>OR</p>

              <Button text={loading ? "Loading..." : "Signup Using Google"} blue={true} />

              <p className='p-login' onClick={() => setLoginForm(!loginform)}>Or Have An Account Already? Click Here</p>

            </form>
          </div>
        }
      </>
    )
  }

  export default SignupSignInComponent