import { useLocation } from "react-router";

let MoreInfo = () => {
  let location = useLocation();

  const name = location?.aboutProps?.name;

  return <pre className="pre">{JSON.stringify(name, null, 2)}</pre>;
};

export default MoreInfo;
