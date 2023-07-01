import { motion } from "framer-motion";
import PropTypes from "prop-types";

const animations = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
};

const AnimatedPage = ({ children }) => {
    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: .3 }}
            
        >
            {children}
        </motion.div>
    );
};
AnimatedPage.propTypes = {
    children: PropTypes.object.isRequired,
};
export default AnimatedPage
