import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaUserPlus } from "react-icons/fa";

const BackGroundlasers = () => {
  const [showInnerLaser, setShowInnerLaser] = useState(false);
  const [redo, setRedo] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowInnerLaser(true);
    }, 1200); // Show after 3 seconds

    // Hide after another 3 seconds
    const timer2 = setTimeout(() => {
      setShowInnerLaser(false);
    }, 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [redo]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRedo((prev) => !prev);
    }, 3300); // Repeat every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.div
        initial={{ scale: 0.9, y: "-20vh" }}
        animate={{ scale: 1, y: "120vh" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",

          type: "tween",
          stiffness: 100,
          damping: 10,
          mass: 0.5,
          velocity: 0.5,
          restDelta: 0.001,
          restSpeed: 0.001,
          repeatDelay: 0.3,
        }}
        className="w-[80%] h-[10%] bg-green-500 absolute top-[0%] left-[15%] blur-[12rem] opacity-10"
      ></motion.div>
      <motion.div
        initial={{ scale: 0.9, y: "-20vh" }}
        animate={{ scale: 1, y: "120vh" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",

          type: "tween",
          stiffness: 100,
          damping: 10,
          mass: 0.5,
          velocity: 0.5,
          restDelta: 0.001,
          restSpeed: 0.001,
          repeatDelay: 0.3,
        }}
        className="w-[70%] h-[10%] bg-green-500 absolute top-[0%] left-[15%] blur-[6rem] opacity-50"
      ></motion.div>
      <motion.div
        initial={{ scale: 0.9, y: "-20vh" }}
        animate={{ scale: 1, y: "120vh" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",

          type: "tween",
          stiffness: 100,
          damping: 10,
          mass: 0.5,
          velocity: 0.5,
          restDelta: 0.001,
          restSpeed: 0.001,
          repeatDelay: 0.3,
        }}
        className="w-[70%] h-[5%] bg-green-500 absolute top-[0%] left-[15%] blur-[2rem] opacity-40"
      ></motion.div>
      <motion.div
        initial={{ scale: 0.9, y: "-20vh" }}
        animate={{ scale: 1, y: "120vh" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",

          type: "tween",
          stiffness: 100,
          damping: 10,
          mass: 0.5,
          velocity: 0.5,
          restDelta: 0.001,
          restSpeed: 0.001,
          repeatDelay: 0.3,
        }}
        className="w-[70%] h-[2%] bg-green-500 absolute top-[5%] left-[15%] blur-[0.5rem] opacity-30"
      ></motion.div>
      <motion.div
        initial={{ y: "-20vh" }}
        animate={{ y: "120vh" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",

          type: "tween",
          stiffness: 100,
          damping: 10,
          mass: 0.5,
          velocity: 0.5,
          restDelta: 0.001,
          restSpeed: 0.001,
          repeatDelay: 0.3,
        }}
        className="w-73 h-2 bg-green-500 absolute top-[6%] left-[50%] transform -translate-x-1/2 z-300"
        style={{ opacity: showInnerLaser ? 1 : 0 }}
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
          delay: 1,

          repeatDelay: 1,
          // Add any additional properties here
        }}
        className="w-5 h-5 bg-red-500 absolute rounded-full right-10 top-8 z-500"
        style={{ opacity: showInnerLaser ? 1 : 0 }}
      ></motion.div>
    </>
  );
};

const FadeInTextWithMaskByWords = ({
  text = "sample Text",
  className = "text-2xl md:text-4xl lg:text-6xl font-bold",
  duration = 0.5,
  delay = 0.07,
}) => (
  <motion.div
    onMouseOver={textGlitchEffect}
    data-text={text}
    className={"flex flex-wrap " + className}
  >
    {text.split(" ").map((word, index) => (
      <motion.span
        key={index}
        className={"inline-block whitespace-nowrap mr-3 pointer-events-none"}
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          duration: duration,
          ease: "easeInOut",
          type: "spring",
          stiffness: 70,
          damping: 20,
          delay: index * delay,
        }}
        viewport={{ once: true }}
      >
        {word}
      </motion.span>
    ))}
  </motion.div>
);

const textGlitchEffect = (e) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  let iteration = 0;

  const interval = setInterval(() => {
    e.target.innerText = e.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return e.target.getAttribute("data-text")[index];
        }
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    if (iteration > 5) {
      clearInterval(interval);
      e.target.innerText = e.target.getAttribute("data-text");
    }

    iteration += 1 / 3;
  }, 30);
};

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
    <div className="w-screen h-screen bg-bg relative overflow-hidden">
      <FadeInTextWithMaskByWords
        text="Fingerprint Matching App"
        delay={0.5}
        className="absolute top-5 left-10 text-5xl font-bold text-text z-500 select-none font-title"
      />
      <div className="absolute bottom-7 left-10  font-bold text-text z-500 select-none font-title">
        <FadeInTextWithMaskByWords
          text="Sponsered By Aswar X HurryApp Hackathon 3"
          delay={0.1}
          className=""
        />
      </div>

      <motion.div
        initial={{ scale: 0.9, y: 10, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{
          duration: 0.4,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        className="absolute bottom-5 right-10  font-bold text-text z-500 select-none font-title"
      >
        <h1 className="flex items-center justify-center gap-2 bg-accent px-2 py-1 rounded-full text-black">
          Add User
          <span>
            <FaUserPlus />
          </span>
        </h1>
      </motion.div>

      <div className="w-full h-full opacity-20  absolute z-70">
        <img
          src="/images/pattern-small.png"
          className="absolute inset-0 w-full h-full object-cover opacity-100 z-0 "
        />
      </div>

      <div
        className="w-80 h-80
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100
       bg-secondary-bg rounded-4xl  overflow-hidden opacity-70"
      >
        <img src="" className=" object-cover w-90 h-90 bg-secondary-bg " />
      </div>
      {/* most top container */}
      <div
        className="w-80 h-80
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100
       bg-secondary-bg-transparent rounded-3xl border-13 border-secondary-bg-border overflow-hidden opacity-100"
      ></div>

      {/* <div
        id="spotlight"
        className="w-96 h-96
        absolute z-40
        bg-red-500
        rounded-full pointer-events-none
        blur-[10rem]
        "
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
        }}
      ></div> */}
      {/* <motion.div
        initial={{ scale: 0.9, y: 0 }}
        animate={{ scale: 1, y: -20 }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 0.2,
        }}
        id="spotlight"
        className="w-50 h-50 absolute z-40 bg-red-500 rounded-full left-1/7 bottom-1/7 blur-[6rem] opacity-20"
      ></motion.div>
      <motion.div
        initial={{ scale: 0.9, y: -10 }}
        animate={{ scale: 1, y: [-40] }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 0.2,
        }}
        id="spotlight"
        className="w-50 h-50 absolute z-40 bg-red-500 rounded-full left-1/3 bottom-1/5 blur-[6rem] opacity-40"
      ></motion.div> */}
      <BackGroundlasers />
      <div className="w-40 h-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-90 pointer-events-none">
        <img
          src="/images/fingerprint-2.png"
          className="w-full h-full object-cover"
        />
      </div>
      <motion.div
        initial={{ scale: 3 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 1.7,
          type: "spring",
          stiffness: 100,
          damping: 10,
          mass: 0.5,
          velocity: 0.5,
          restDelta: 0.001,
          restSpeed: 0.001,
          ease: "easeInOut",
          bounce: 5,
        }}
        className="w-40 h-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 pointer-events-none"
      >
        <DotLottieReact
          src="https://lottie.host/b41ed688-7bdf-4fd6-b809-92d8f2c71c2f/pPrsLcCXpK.lottie"
          loop
          autoplay
          speed={0.7}
          style={{ width: "100%", height: "100%" }}
        />
      </motion.div>
    </div>
  );
}

export default App;
