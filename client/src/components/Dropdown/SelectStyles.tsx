import { type StylesConfig, type GroupBase } from "react-select";

interface OptionType {
  value: string;
  label: string;
}

export const SelectStyles: StylesConfig<
  OptionType,
  false,
  GroupBase<OptionType>
> = {
  control: (base, state) => ({
    ...base,
    cursor: "pointer",
    backgroundColor: "#ffffff",
    borderColor: state.isFocused ? "#39AC95" : "#182628",
    borderWidth: "0",
    borderRadius: "2px",
    boxShadow: "0 2px 8px rgba(13, 2, 73, 0.2)",
    minHeight: "44px",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: state.isFocused ? "#39AC95" : "#182628",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 12px",
  }),
  input: (base) => ({
    ...base,
    margin: "0",
    padding: "10px 16px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#60777aff",
    fontWeight: 400,
  }),
  singleValue: (base) => ({
    ...base,
    color: "#182628",
    fontWeight: 500,
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "2px",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
    marginTop: "4px",
  }),
  menuList: (base) => ({
    ...base,
    padding: "4px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#39AC95" : "transparent",
    color: state.isSelected ? "#ffffff" : "#182628",
    borderRadius: "2px",
    padding: "10px 12px",
    cursor: "pointer",
    transition: "all 0.15s ease",
    fontWeight: state.isSelected ? 500 : 400,
    "&:active, &:hover": {
      backgroundColor: state.isSelected ? "#39AC95" : "#c1f1e9ff",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "#39AC95" : "#1f2937",
    transition: "all 0.2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0)",
    "&:hover": {
      color: "#39AC95",
    },
  }),
};
