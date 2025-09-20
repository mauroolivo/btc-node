import react from "react";

function loadingPage() {
  return (

    <>
      <div className="param-title justify-items-center animate-pulse">
        <div className="h-2.5 bg-prominent rounded-full dark:bg-prominent w-48 mb-4 "></div>
      </div>
      <div className="w-full justify-center md:flex-none lg:flex lg:gap-20 animate-pulse">
        <div className="md:w-full lg:w-14 grow">
          <div className="param-box">
            <div className="param-key">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
            </div>
            <div className="param-key">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
            </div>
            <div className="param-key">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default loadingPage;