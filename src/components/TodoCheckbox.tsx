import React from 'react';

interface TodoCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const TodoCheckbox: React.FC<TodoCheckboxProps> = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};
export default TodoCheckbox;
