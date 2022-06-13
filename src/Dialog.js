import React, { useImperativeHandle, useState } from "react";

const Dialog = React.forwardRef((props, ref) => {
  
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      show() {
        setVisible(true);
      },
      hide() {
        setVisible(false);
      },
      toggle() {
        setVisible(v => !v);
      }
    }
  } );

  return (
    <div
      style={{
        position: "absolute",
        width: "500px",
        height: "200px",
        border: "solid 1px gray",
        borderRadius: "5px",
        top:'200px',
        left:'200px',
        padding:'10px',
        backgroundColor: 'aliceblue',
        display: visible ? 'block' : 'none'
      }}
    >
      This is a dialog box
    </div>
  );
});

export default Dialog;
