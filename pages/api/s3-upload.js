import { withSentry } from "@sentry/nextjs";
import { APIRoute } from "next-s3-upload";
import { v4 as uuidv4 } from "uuid";

export default withSentry(
  APIRoute.configure({
    key(req, filename) {
      let name = filename.replace(/\s/g, "-");
      name = uuidv4().concat(`-${name}`);
      return `images/${name}`;
    },
  })
);
