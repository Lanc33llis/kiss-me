import { motion } from "framer-motion"

const diagonalLeft = {
  hidden: {  x: 0, y: 0 },
  enter: {  x: '-100%', y: 0 },
}

const diagonalRight = {
  hidden: {  x: 0, y: 0 },
  enter: {  x: '100%', y: 0 },
}

const horizontalLeft = {
  hidden: {  x: 0, y: 0 },
  enter: {  x: "-100%", y: 0 },
}

const horizontalRight = {
  hidden: {  x: 0, y: 0 },
  enter: {  x: "100%", y: 0 },
}

const Layout = ({children}) => (
  <motion.main 
    id="app"
    initial="hidden"
    animate="enter"
    exit="exit"
    variants={{}}
    transition={{ type: 'linear' }}
  >
    <motion.div 
      id="diagonal-open-left"
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={diagonalLeft}
      transition={{ type: 'spring', delay: 1.5, stiffness: 150, damping: 100 }}
    >
      <div />
    </motion.div>
    <motion.div 
      id="diagonal-open-right"
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={diagonalRight}
      transition={{ type: 'spring', delay: 1.5, stiffness: 150, damping: 100 }}
    >
      <div />
    </motion.div>
    <motion.div 
      id="horizontal-left"
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={horizontalLeft}
      transition={{ type: 'spring', delay: .5, stiffness: 150, damping: 100 }}
    />
    <motion.div 
      id="horizontal-right"
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={horizontalRight}
      transition={{ type: 'spring', delay: .5, stiffness: 150, damping: 100 }}
    />
    {children}
  </motion.main>
)

export default Layout