import { useState, useEffect } from "react";
import { motion } from "motion/react";

function App() {
  // const [paddings, setPaddings] = useState({
  //   paddingTop: window.innerHeight / 2,
  //   paddingLeft: window.innerWidth / 2,
  // });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const MouseSpotlight = (event) => {
    const spotlight = document.getElementById("spotlight");
    const rect = spotlight.getBoundingClientRect();

    const x = rect.width / 2;
    const y = rect.height / 2;

    setMousePosition({ x: event.clientX - x, y: event.clientY - y });
  };

  useEffect(() => {
    document.addEventListener("mousemove", MouseSpotlight);
    return () => {
      document.removeEventListener("mousemove", MouseSpotlight);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-white">
      <h1 className="text-4xl font-bold text-center p-4 bg-primary text-primary-text">
        Fingerprint App
      </h1>
      <div className="w-full h-full bg-blue-800 opacity-30 blur-2xl absolute z-70"></div>
      <div
        className="w-80 h-80
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100
       bg-secondary-bg rounded-3xl border-15 border-secondary-bg overflow-hidden"
      >
        <img src="" className=" object-cover w-90 h-90 bg-secondary-bg " />
      </div>
      <div
        id="spotlight"
        className="w-96 h-96
        absolute z-40
        bg-red-500
        rounded-full pointer-events-none
        blur-3xl
        "
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
        }}
      ></div>
    </div>
  );
}

export default App;
