import Link from "next/link";
import { BsGithub } from "react-icons/bs";

const GithubLink = () => {
  return (
    <Link
      className="group bottom-10 left-10 z-100 absolute flex flex-row items-center gap-2 bg-white hover:bg-auto border-black rounded-full"
      href={"https://github.com/Victor-starr/table-starr"}
      target="_blank"
    >
      <BsGithub color="black" size={35} />
      <h1 className="hidden group-hover:block pr-5 text-black text-lg">
        Checkout my GitHub !!!
      </h1>
    </Link>
  );
};

export default GithubLink;
