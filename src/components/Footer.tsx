// import React, { useEffect, useState, useRef } from 'react';
// import { motion } from 'framer-motion';

// function Footer() {
//   const currentYear = new Date().getFullYear();

//   const containerRef = useRef(null);
//   const [fieldWidth, setFieldWidth] = useState(0);

//   useEffect(() => {
//     function measureWidth() {
//       if (containerRef.current) {
//         setFieldWidth(containerRef.current.offsetWidth);
//       }
//     }
//     measureWidth();
//     window.addEventListener('resize', measureWidth);
//     return () => window.removeEventListener('resize', measureWidth);
//   }, []);

//   const playerWidth = 100;
//   const ballSize = 30;
//   const ballSpeed = 3;
//   const kickDuration = 0.5;

//   const rightShift = 80; // Added right shift

//   const leftPlayerX = 0;  
//   const rightPlayerX = fieldWidth - playerWidth + rightShift;

//   const [ballPosition, setBallPosition] = useState(leftPlayerX + playerWidth);
//   const [direction, setDirection] = useState<'left' | 'right'>('right');
//   const [isLeftKicking, setIsLeftKicking] = useState(false);
//   const [isRightKicking, setIsRightKicking] = useState(false);

//   useEffect(() => {
//     const animateGame = () => {
//       if (direction === 'right') {
//         if (ballPosition >= rightPlayerX - ballSize) {
//           setIsRightKicking(true);
//           setTimeout(() => {
//             setIsRightKicking(false);
//             setDirection('left');
//           }, kickDuration * 1000);
//         } else {
//           setBallPosition(prev => prev + ballSpeed);
//         }
//       } else {
//         if (ballPosition <= leftPlayerX + 2*playerWidth) {
//           setIsLeftKicking(true);
//           setTimeout(() => {
//             setIsLeftKicking(false);
//             setDirection('right');
//           }, kickDuration * 1000);
//         } else {
//           setBallPosition(prev => prev - ballSpeed);
//         }
//       }
//     };

//     const interval = setInterval(animateGame, 16);
//     return () => clearInterval(interval);
//   }, [direction, ballPosition, leftPlayerX, rightPlayerX]);

//   const ballVariants = {
//     moving: {
//       y: [0, -20, 0],
//       transition: { repeat: Infinity, duration: 0.8 },
//     },
//   };

//   return (
//     <footer className="relative bg-[#0e041c] py-10 border-t border-violet-900/30">
//       <div className="max-w-7xl mx-auto flex items-center justify-between" ref={containerRef}>
        
//         {/* Left Player */}
//         <motion.div
//           className="relative bottom-0"
//           animate={isLeftKicking ? { rotate: 10 } : { rotate: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <img src="svgs/playerLeft.png" alt="Left Player" className="w-48 h-60 mt-[40px] mr-[20px]" />
//         </motion.div>

//         {/* Footer Content - Centered */}
//         <div className="text-center px-8 max-w-3xl">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <img src="https://cdn.brandfetch.io/idD1YVU3LM/w/820/h/820/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B" alt="Bolt Logo" className="h-12 mx-auto mb-4" />
//             <p className="text-white/70 text-sm max-w-md mx-auto">
//               Platform for exciting hackathons, showcase innovative ideas, and collaborate with a global community.
//             </p>
//           </motion.div>

//           {/* Social Links */}
//           <div className="flex justify-center gap-6 mt-6">
//             {['twitter', 'instagram', 'linkedin', 'discord'].map((platform, index) => (
//               <motion.a
//                 key={platform}
//                 href="#"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 whileHover={{ y: -5 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="w-10 h-10 flex items-center justify-center bg-violet-900/30 text-white rounded-full hover:bg-violet-800/50 transition-colors"
//               >
//                 <img src={`svgs/${platform}.png`} alt={platform} className="w-5 h-5" />
//               </motion.a>
//             ))}
//           </div>

//           {/* Footer Links */}
//           <div className="flex flex-wrap justify-center gap-6 mt-6">
//             {['About', 'Contact', 'Privacy Policy', 'Terms of Service', 'Code of Conduct'].map((link, index) => (
//               <motion.a
//                 key={link}
//                 href="#"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
//                 viewport={{ once: true }}
//                 className="text-white/70 text-sm hover:text-white transition-colors"
//               >
//                 {link}
//               </motion.a>
//             ))}
//           </div>

//           <p className="text-white/60 text-sm mt-6">
//             © {currentYear} Hackathon.dev
//           </p>
//         </div>

//         {/* Right Player */}
//         <motion.div
//           className="relative bottom-0"
//           animate={isRightKicking ? { rotate: -10 } : { rotate: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <img src="svgs/playerRight.png" alt="Right Player" className="w-60 h-60 mt-[40px] mr-[20px]" />
//         </motion.div>

//       </div>

//       {/* Football Animation */}
//       <motion.div
//         className="absolute bottom-10 mr-[30px]"
//         style={{ left: ballPosition }}
//         animate="moving"
//         variants={ballVariants}
//       >
//         <img src="svgs/football.png" alt="Football" className="h-10 w-auto" />
//       </motion.div>
//     </footer>
//   );
// }

// export default Footer;
import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

function Footer() {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef(null);
  const [fieldWidth, setFieldWidth] = useState(0);

  // Measure container width for positioning calculations
  useEffect(() => {
    function measureWidth() {
      if (containerRef.current) {
        setFieldWidth(containerRef.current.offsetWidth);
      }
    }
    measureWidth();
    window.addEventListener('resize', measureWidth);
    return () => window.removeEventListener('resize', measureWidth);
  }, []);

  // Constants for sizes and positions
  const playerWidth = 100;
  const ballSize = 30;
  const rightShift = 80; // Additional right shift for extreme ball position

  // Left player is at the very left (0px)
  const leftPlayerX = 0;
  // Right player position: container width minus player width plus the right shift
  const rightPlayerX = fieldWidth - playerWidth + rightShift;

  // Adjust startX so the ball doesn't surpass the left player (adjust as needed)
  // Here we want the ball to trigger left kick when it's around left player's edge.
  const startX = leftPlayerX + playerWidth + 60; 
  // End position for the ball's horizontal movement
  const endX = fieldWidth ? (fieldWidth - playerWidth + rightShift - ballSize) : startX;

  // Animation durations (horizontal movement slowed to roughly 0.6× speed)
  const horizontalDuration = 10; 
  const verticalDuration = 0.8; 

  // Create a motion value for the ball’s horizontal position and initialize it at startX
  const ballX = useMotionValue(startX);
  
  // Start horizontal animation when fieldWidth is known
  useEffect(() => {
    if (fieldWidth) {
      const controls = animate(ballX, [startX, endX, startX], {
        duration: horizontalDuration,
        ease: "linear",
        repeat: Infinity
      });
      return controls.stop;
    }
  }, [fieldWidth, ballX, startX, endX, horizontalDuration]);

  // Ball vertical bounce variant (always smooth)
  const ballVariants = {
    bounce: {
      y: [0, -20, 0],
      transition: { duration: verticalDuration, ease: "easeInOut", repeat: Infinity }
    }
  };

  // Kicking animations for players
  const [isLeftKicking, setIsLeftKicking] = useState(false);
  const [isRightKicking, setIsRightKicking] = useState(false);

  // Define a threshold of 5px for triggering kick
  const kickRange = 5;
  const [leftKickCooldown, setLeftKickCooldown] = useState(false);
  const [rightKickCooldown, setRightKickCooldown] = useState(false);

  // Monitor ballX changes to trigger player kicks when the ball is within ±5px of the extremes
  useEffect(() => {
    const unsubscribe = ballX.onChange((latest) => {
      // Check left side: if the ball is within ±kickRange of startX
      if (Math.abs(latest - startX) < kickRange && !leftKickCooldown) {
        setIsLeftKicking(true);
        setLeftKickCooldown(true);
        setTimeout(() => {
          setIsLeftKicking(false);
          setLeftKickCooldown(false);
        }, 500); // 0.5 second kick duration
      }
      // Check right side: if the ball is within ±kickRange of endX
      if (Math.abs(latest - endX) < kickRange && !rightKickCooldown) {
        setIsRightKicking(true);
        setRightKickCooldown(true);
        setTimeout(() => {
          setIsRightKicking(false);
          setRightKickCooldown(false);
        }, 500);
      }
    });
    return unsubscribe;
  }, [ballX, startX, endX, kickRange, leftKickCooldown, rightKickCooldown]);

  return (
    <footer className="relative bg-[#0e041c] py-10 border-t border-violet-900/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between" ref={containerRef}>
        
        {/* Left Player */}
        <motion.div
          className="relative bottom-0"
          animate={{ rotate: isLeftKicking ? 10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <img src="svgs/playerLeft.png" alt="Left Player" className="w-48 h-60 mt-[40px] mr-[20px]" />
        </motion.div>

        {/* Footer Content - Centered */}
        <div className="text-center px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://cdn.brandfetch.io/idD1YVU3LM/w/820/h/820/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B" 
              alt="Bolt Logo" 
              className="h-12 mx-auto mb-4" 
            />
            <p className="text-white/70 text-sm max-w-md mx-auto">
              Platform for exciting hackathons, showcase innovative ideas, and collaborate with a global community.
            </p>
          </motion.div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-6">
            {['twitter', 'instagram', 'linkedin', 'discord'].map((platform, index) => (
              <motion.a
                key={platform}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="w-10 h-10 flex items-center justify-center bg-violet-900/30 text-white rounded-full hover:bg-violet-800/50 transition-colors"
              >
                <img src={`svgs/${platform}.png`} alt={platform} className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {['About', 'Contact', 'Privacy Policy', 'Terms of Service', 'Code of Conduct'].map((link, index) => (
              <motion.a
                key={link}
                href="#"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                viewport={{ once: true }}
                className="text-white/70 text-sm hover:text-white transition-colors"
              >
                {link}
              </motion.a>
            ))}
          </div>

          <p className="text-white/60 text-sm mt-6">
            © {currentYear} Hackathon.dev
          </p>
        </div>

        {/* Right Player */}
        <motion.div
          className="relative bottom-0"
          animate={{ rotate: isRightKicking ? -10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <img src="svgs/playerRight.png" alt="Right Player" className="w-60 h-60 mt-[40px] mr-[20px]" />
        </motion.div>
      </div>

      {/* Football Animation */}
      <motion.div
        className="absolute bottom-10 mr-[30px]"
        style={{ left: ballX }}
        variants={ballVariants}
        animate="bounce"
      >
        <img src="svgs/football.png" alt="Football" className="h-10 w-auto" />
      </motion.div>
    </footer>
  );
}

export default Footer;
