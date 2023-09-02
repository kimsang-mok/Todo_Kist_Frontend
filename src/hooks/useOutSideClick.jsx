import { useEffect } from "react";

function useOutSideClick(ref, toggler) {
    const handleOutSideClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            toggler(prevState => !prevState)
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleOutSideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutSideClick)
        };
    }, [ref, toggler]);
};

export default useOutSideClick;