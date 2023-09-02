import { useState } from "react";

function useToggleModal(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    const toggleModal = () => {
        setIsOpen((prevState) => !prevState);
    };
    return { isOpen, toggleModal };
}

export default useToggleModal;