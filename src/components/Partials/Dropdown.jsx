
import React from 'react';

const Dropdown = ({ title, options, func }) => {
  return (
    <div className='select relative z-50'>
      <select defaultValue="0" onChange={func} className="bg-zinc-800 text-white p-2 rounded-md outline-none">
        <option value="0" disabled>{title}</option>
        {options.map((o, i) => (
          <option key={i} value={o.value || o}>
            {(o.label || o).toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
