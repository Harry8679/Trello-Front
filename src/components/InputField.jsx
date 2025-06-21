const InputField = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  ...rest
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full border p-2 mb-4 rounded ${className}`}
      {...rest}
    />
  );
};

export default InputField;