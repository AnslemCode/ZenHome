import { auth } from "express-oauth2-jwt-bearer";

const checkJwt = auth({
  audience: "http://localhost:3000",
  issuerBaseURL: "https://dev-lzh5x8zbm1osvw0v.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

export default checkJwt;
