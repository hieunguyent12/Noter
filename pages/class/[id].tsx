import { useRouter } from "next/router";

import { PageComponent } from "../../types";

interface Props {}

const Class: PageComponent<Props> = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>{id}</div>;
};

Class.auth = true;

export default Class;
