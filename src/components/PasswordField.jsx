import { useState } from 'react';

const PasswordField = ({ value, onChange, placeholder, className = '', highlight = false }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative mb-4">
      <input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border p-2 rounded pr-10 ${highlight ? className : ''}`}
        required
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-2 top-2 text-sm text-gray-500 hover:text-gray-700"
      >
        {show ? 'Masquer' : 'Afficher'}
      </button>
    </div>
  );
};

export default PasswordField;
