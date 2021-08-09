import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import { PageComponent } from "../../types";

import axios from "../../utils/axios";

const NewUserInfo: PageComponent<{}> = () => {
  const [school, setSchool] = useState("");
  const [role, setRole] = useState("student");
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading && session && session.hasProvidedInfo) {
      router.replace("/home");
      return;
    }

    if (!loading && !session) {
      router.replace("/");
      return;
    }
  }, [session, router, loading]);

  const onSubmit = async () => {
    try {
      if (!loading && session && !session.hasProvidedInfo) {
        await axios.post("/api/userInfo", {
          school,
          role,
        });
        // For whatever reason, using router.push() doesn't work as the session cookie is not updated (but it should)
        window.location.href = "/home";
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <div>
      <p>What school do you go to?</p>
      <input
        type="text"
        value={school}
        onChange={(e) => setSchool(e.target.value)}
      />
      <label htmlFor="role-select">Choose a role</label>
      <select id="role-select" onChange={(e) => setRole(e.target.value)}>
        <option value="">Select an option</option>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

NewUserInfo.auth = false;

export default NewUserInfo;
