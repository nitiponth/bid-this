import Image from "next/image";
import { useRouter } from "next/router";
import BButton from "../components/atoms/BButton/bButton";
import BForm from "../components/atoms/BForm/bForm";
import notfound from "../public/images/404.png";

function Error() {
  const router = useRouter();
  const backToMainHandler = () => {
    router.replace("/");
  };
  return (
    <div className="notfound">
      <Image
        src={notfound}
        width={800}
        height={450}
        objectFit={"cover"}
        className="notfound_image"
      />
      <div className="notfound__btnGroup">
        <BForm>
          <BButton title={"Back to Home"} onClick={backToMainHandler} />
        </BForm>
      </div>
    </div>
  );
}

export default Error;
