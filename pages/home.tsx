import { getSession } from "next-auth/client";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import type { Session } from "next-auth";
import { useEffect } from "react";

import ClassList from "../modules/class/ClassList";
import { PageComponent } from "../types";
import { useClass } from "../components/context/ClassContext";

interface Props {
  session: Session;
  error?: string;
}

const Home: PageComponent<Props> = ({ session, error }) => {
  const [classes, dispatch] = useClass();

  if (error || session.error) {
    // TODO render error page
  }

  // useEffect(() => {
  //   dispatch({ type: "LOAD_DATA", payload: serverClasses });
  // }, [dispatch, serverClasses]);

  const isTeacher = session.role === "teacher";

  if (session && !session.error) {
    return (
      <div>
        <ClassList classes={classes} isTeacher={isTeacher} />
      </div>
    );
  } else {
    return <p>An error has occured</p>;
  }
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  try {
    const session = await getSession(ctx);

    if (session) {
      if (!session.hasProvidedInfo || !session.role) {
        return {
          redirect: {
            destination: "/info",
            permanent: false,
          },
        };
      }

      return {
        props: {
          session,
        },
      };
    } else {
      return {
        redirect: {
          destination: `/api/auth/signin?callbackUrl=${encodeURIComponent(
            "http://localhost:3000/home"
          )}`,
          permanent: false,
        },
      };
    }
  } catch (e) {
    console.log(e);
    return {
      props: {
        error: "An error has occured",
      },
    };
  }
};

Home.auth = true;

export default Home;
