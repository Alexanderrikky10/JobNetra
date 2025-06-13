const Input = (props) => {
  const { type, name, placeholder, className, field } = props;
  return (
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      className={className}
      {...(field && { ...field })}
    />
  );
};

export default Input;
