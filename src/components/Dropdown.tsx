import React from "react";
import styled from "styled-components";

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 150px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 2px;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    border-color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background-color: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = "Select...",
  disabled = false,
}) => {
  return (
    <DropdownContainer>
      <Label>{label}</Label>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option key={"placeholder"} value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </DropdownContainer>
  );
};
