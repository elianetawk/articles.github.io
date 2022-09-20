import { useSearchFieldState } from "react-stately";
import { useSearchField } from "react-aria";
import { useRef } from "react";

function SearchField(props) {
  let { label } = props;
  let state = useSearchFieldState(props);
  let ref = useRef();
  let { labelProps, inputProps } = useSearchField(props, state, ref);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 200,
      }} 
    >
      <label {...labelProps}>{label}</label>
      <input {...inputProps} ref={ref} />
    </div>
  );
}
export default SearchField;
