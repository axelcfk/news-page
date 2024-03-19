export default function Subscribe() {
  return (
    <div
      className="col-span-4 h-96 mt-20 flex justify-center items-center p-32 my-60"
      style={{
        backgroundImage: "url('/Blue Wallpaper Joyce.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-slate-100 p-20 flex items-center justify-center">
        <div className=" w-2/4 mr-7">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M19 20V22L21 20H19ZM0.545974 3.37325L17.546 21.3732L20.454 18.6268L3.45403 0.626753L0.545974 3.37325ZM21 20V6.64516H17V20H21ZM19 18H5.70161V22H19V18Z"
                fill="black"
              ></path>
            </g>
            <g>
              <path d="M0 28H28" stroke="black" stroke-width="2"></path>
            </g>
          </svg>
          <h3 className="text-2xl font-semibold text-black">
            SIGN UP FOR THE CHAS NEWS DAILY NEWSLETTER
          </h3>
          <p className="text-sm text-black">
            Our biggest stories, delivered to your inbox every day.
          </p>
          <a className="text-black">See all stories</a>
        </div>
        <div className="flex flex-col  w-2/4 justify-center ">
          <div className="flex  flex-col">
            <div className="flex justify-start">
              <input
                type="text"
                className="h-10 w-72 mr-8 p-0"
                placeholder="Email Address"
              />{" "}
              <button className="bg-black h-10 w-32 p-5 text-base text-slate-100 items-center flex justify-center decoration-none">
                Submit
              </button>
            </div>
            <p className="text-xs text-black">
              By signing up you agree to our User Agreement (including the class
              action waiver and arbitration provisions), our Privacy Policy &
              Cookie Statement and to receive marketing and account-related
              emails from CHAS NEWS. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
