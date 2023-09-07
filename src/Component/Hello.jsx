import React, { useState } from "react";

export default function Hello() {
  const [checked, SetChecked] = useState(false);

  function handleChecked() {
    SetChecked(!checked);
  }

  return (
    <>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          handleChecked();
        }}
      />
      {checked && <ConditionalHello />}
    </>
  );
}

function ConditionalHello() {
  return <div> Hello World </div>;
}
