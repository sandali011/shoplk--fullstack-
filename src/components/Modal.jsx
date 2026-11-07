import {useEffect} from "react";
import { createPortal }  from "react-dom";

function Modal({isOpen , onClose , children}){
    useEffect(()=>{
        if(!isOpen) return;

        function handleKey(e){
            if (e.key === "Escape") onClose();
        }

        document.addEventListener("keydown",handleKey);
        return()=> document.removeEventListener("keydown",handleKey);
    },[isOpen,onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        
        <div
        role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">

        {children}
        </div>
        </div>,
        document.body
    );
}

export default Modal;