import React from "react";
import styled from "styled-components";
import type { PaginationOptions } from "../types/vehicles";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  totalItems: number;
  onUpdatePagination: (newPagination: Partial<PaginationOptions>) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px;
`;

const PaginationInfo = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PageButton = styled.button<{ active?: boolean; disabled?: boolean }>`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  background-color: ${(props) =>
    props.active ? "#3b82f6" : props.disabled ? "#f9fafb" : "white"};
  border-radius: 6px;
  font-size: 14px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  min-width: 40px;

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.active ? "#2563eb" : "#f3f4f6")};
    border-color: ${(props) => (props.active ? "#2563eb" : "#9ca3af")};
  }
`;

const NavButton = styled(PageButton)`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
`;

const PerPageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PerPageSelect = styled.select`
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  color: black;
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
`;

const PerPageLabel = styled.label`
  font-size: 14px;
  color: #6b7280;
  white-space: nowrap;
`;

const Ellipsis = styled.span`
  padding: 8px 4px;
  color: #6b7280;
  font-size: 14px;
`;

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  perPage,
  totalItems,
  onUpdatePagination,
}) => {
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  const getVisiblePages = (): (number | string)[] => {
    const offset = 2;
    const range: (number | string)[] = [];

    if (totalPages <= 1) return [1];

    const rangeStart = Math.max(2, currentPage - offset);
    const rangeEnd = Math.min(totalPages - 1, currentPage + offset);

    range.push(1);

    if (rangeStart > 2) {
      range.push("...");
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (i !== 1 && i !== totalPages) {
        range.push(i);
      }
    }

    if (rangeEnd < totalPages - 1) {
      range.push("...");
    }

    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onUpdatePagination({ page: page });
    }
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdatePagination({ page: 1, perPage: Number(e.target.value) });
  };

  if (totalPages <= 1) {
    return (
      <PaginationContainer>
        <PaginationInfo>
          Showing {totalItems} {totalItems === 1 ? "result" : "results"}
        </PaginationInfo>
        <PerPageContainer>
          <PerPageLabel>Show:</PerPageLabel>
          <PerPageSelect value={perPage} onChange={handlePerPageChange}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </PerPageSelect>
          <PerPageLabel>per page</PerPageLabel>
        </PerPageContainer>
      </PaginationContainer>
    );
  }

  return (
    <PaginationContainer>
      <PaginationInfo>
        Showing {startItem} to {endItem} of {totalItems} results
      </PaginationInfo>

      <PaginationControls>
        <NavButton
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          ← Previous
        </NavButton>

        {visiblePages.map((page, index) => {
          if (page === "...") {
            return <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>;
          }

          return (
            <PageButton
              key={page}
              active={page === currentPage}
              onClick={() => handlePageChange(page as number)}
            >
              {page}
            </PageButton>
          );
        })}

        <NavButton
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next →
        </NavButton>
      </PaginationControls>

      <PerPageContainer>
        <PerPageLabel>Show:</PerPageLabel>
        <PerPageSelect value={perPage} onChange={handlePerPageChange}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </PerPageSelect>
        <PerPageLabel>per page</PerPageLabel>
      </PerPageContainer>
    </PaginationContainer>
  );
};
export default Pagination;
