import { InputGroup, FormControl } from "react-bootstrap";
import classes from "./ArticleHeader.module.css";
import { useState } from "react";
import useFilter from "../../hooks/use-filter";
function SearchField(props) {
  const [setFilter] = useFilter();
  const [value, setValue] = useState("");

  const handleClick = () => {
    setValue("");
    setFilter("");
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <InputGroup>
       
      <FormControl
        onChange={handleChange}
        value={value}
        id="myinput"
        placeholder="Search"
        type="text"
        autoComplete="off"
      />
      {value !== "" && (
        <button onClick={handleClick} className={classes["inner-btn"]}>
          X
        </button>
      )}
    </InputGroup>
  );
}
export default SearchField;
