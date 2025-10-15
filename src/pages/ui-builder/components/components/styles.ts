import styled from "@emotion/styled";

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #1a202c;
  color: white;
`;

export const Button = styled.button`
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3182ce;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;
