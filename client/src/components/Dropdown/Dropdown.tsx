import styles from "./Dropdown.module.scss";
import { SelectStyles } from "./SelectStyles";
import Select, { type SingleValue } from "react-select";
import { components } from "react-select";

export interface OptionType {
  label: string;
  value: string;
}

interface DropdownProps {
  options: OptionType[];
  value?: OptionType | null;
  placeholder?: string;
  onChange?: (option: SingleValue<OptionType>) => void;
}

const Dropdown = ({ options, value, placeholder, onChange }: DropdownProps) => {
  return (
    <Select
      className="dropdown"
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={onChange}
      isSearchable={false}
      styles={SelectStyles}
      components={{
        Menu: (props) => (
          <components.Menu {...props} className={styles.dropdownMenu} />
        ),
      }}
    />
  );
};

export default Dropdown;
