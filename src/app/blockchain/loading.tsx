import react from "react";

function loadingPage() {
  return (
    <>
      <div className="param-title justify-items-center animate-pulse">
        <div className="h-2.5 bg-prominent rounded-full dark:bg-prominent w-24 mb-2 "></div>
      </div>
      <div className="param-title justify-items-center animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-2"></div>
      </div>
      <div className="param-title justify-items-center animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-2"></div>
      </div>
    </>
  );
}

export default loadingPage;