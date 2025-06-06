import Label from "./Label";
import Input from "./Input";

const GeneralInput = (props) => {
  const {
    type,
    name,
    placeholder,
    children,
    classGeneral,
    classLabel,
    classInput,
    field,
  } = props;
  return (
    <div className={classGeneral}>
      <Label name={name} className={classLabel}>
        {children}
      </Label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        className={classInput}
        field={field}
      />
    </div>
  );
};

export default GeneralInput;
