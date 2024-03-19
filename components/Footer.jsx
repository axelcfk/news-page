import Link from "next/link";
import { FacebookIcon } from "./SocialIcons";
import { TiktokIcon } from "./SocialIcons";
import { YouTubeIcon } from "./SocialIcons";
import { XIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <div className="bg-gray-950 w-full text-slate-100">
      <div className="custom-thin-border-bottom flex flex-col justify-center items-center px-60 py-12">
        <h2 className="text-slate-300">CHAS NEWS</h2>
        <p className="text-slate-300 text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut ipsam
          itaque quo iusto rem rerum aspernatur dolorum est. Maxime alias natus
          illum saepe repudiandae doloremque et dicta distinctio quaerat
          laboriosam voluptatibus explicabo autem corporis, cupiditate neque
          fugiat magnam quia adipisci.
        </p>
      </div>
      <div className="flex px-20 py-10 custom-thin-border-bottom justify-evenly">
        <div className="flex flex-col ">
          <h3 className="text-slate-300">Categories</h3>
          <Link
            className="decoration-none no-underline text-slate-500"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="decoration-none no-underline text-slate-500"
            href={"/politics"}
          >
            Politics
          </Link>{" "}
          <Link
            className="decoration-none no-underline text-slate-500"
            href={"/sports"}
          >
            Sports
          </Link>{" "}
          <Link
            className="decoration-none no-underline text-slate-500"
            href={"/technology"}
          >
            Technology
          </Link>{" "}
        </div>
        <div className="flex flex-col">
          <h3 className="text-slate-300">Categories</h3>
          <Link
            className="decoration-none no-underline text-slate-500"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="decoration-none no-underline text-slate-500"
            href={"/politics"}
          >
            Politics
          </Link>{" "}
          <Link
            className="decoration-none no-underline text-slate-500"
            href={"/sports"}
          >
            Sports
          </Link>{" "}
          <Link
            className="decoration-none no-underline text-slate-500"
            href={"/technology"}
          >
            Technology
          </Link>{" "}
        </div>
        <div className="flex flex-col">
          <h3 className="text-slate-300">Categories</h3>
          <Link
            className="decoration-none no-underline text-slate-500"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="decoration-none no-underline text-slate-500"
            href={"/politics"}
          >
            Sports
          </Link>{" "}
          <Link
            className="decoration-none no-underline text-slate-500"
            href={"/sports"}
          >
            Business
          </Link>{" "}
          <Link
            className="decoration-none no-underline text-slate-500"
            href={"/technology"}
          >
            Technology
          </Link>{" "}
        </div>
        <div className="flex flex-col">
          <h3 className="text-slate-300">Categories</h3>
          <Link
            className="decoration-none no-underline text-slate-500"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="decoration-none no-underline text-slate-500"
            href={"/politics"}
          >
            Politics
          </Link>{" "}
          <Link
            className="decoration-none no-underline text-slate-500"
            href={"/business"}
          >
            Sports
          </Link>{" "}
          <Link
            className="decoration-none no-underline text-slate-500"
            href={"/sports"}
          >
            Technology
          </Link>{" "}
        </div>
      </div>
      <div className="flex px-20 justify-evenly items-center py-12">
        <p className="w-1/2 text-xs text-slate-500">
          © 2024 Chas Academy. All rights reserved. CHAS News may earn a portion
          of sales from products that are purchased through our site as part of
          our Affiliate Partnerships with retailers. The material on this site
          may not be reproduced, distributed, transmitted, cached or otherwise
          used, except with the prior written permission of Condé Nast. Ad
          Choices
        </p>
        <div className="flex justify-center justify-items-center content-center align-middle" >
          <FacebookIcon />
          <TiktokIcon />
          <YouTubeIcon />
          <XIcon />
        </div>
      </div>
    </div>
  );
}
