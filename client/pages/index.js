import axios from "axios";
const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    // we are on the server -> change host to https://ingress..
    const { data } = await axios
      .get(
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
        {
          headers: req.headers,
        }
      )
      .catch((err) => console.log(err.message));
    return data;
  } else {
    //we are on the browser! -> make request with host of the app
    const { data } = await axios
      .get("/api/users/currentuser")
      .catch((err) => console.log(err.message));
    return data;
  }
};
export default LandingPage;
