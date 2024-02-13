import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';

const ScrollToTop = (props) => {
    const location = useNavigation();
    useEffect(() => {
        if (!location.hash) {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return <>{props.children}</>
};

export default ScrollToTop;