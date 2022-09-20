import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import "./Modal.css";



const modal = (props) => {

  const animationTiming = {
    enter: 400,
    exit: 1000,
  };
   
  const cssClasses = [
    props.isLoading ? "loading" : "Modal",
    props.show ? "ModalOpen" : "ModalClosed",
  ];

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={animationTiming}
      classNames={{
        enter: "",
        enterActive: "ModalOpen",
        exit: "",
        exitActive: "ModalClosed",
      }}
    >
      <div className={cssClasses.join(" ")}>
        {!props.isLoading && (
          <header className="headerModal">
            Message
          </header>
        )}
        <p>{props.label}</p>
        {!props.isLoading && <button onClick={props.closed}>Close</button>}
      </div>
    </CSSTransition>
  );
};

export default modal;
