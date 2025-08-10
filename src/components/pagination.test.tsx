import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";

const mockUpdatePagination = vi.fn();

const defaultProps = {
  currentPage: 1,
  totalPages: 5,
  perPage: 10,
  totalItems: 50,
  onUpdatePagination: mockUpdatePagination,
};

describe("Pagination", () => {
  beforeEach(() => {
    mockUpdatePagination.mockClear();
  });

  it("should show all page numbers when total pages is small", () => {
    render(<Pagination {...defaultProps} totalPages={3} totalItems={30} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("should handle page navigation", () => {
    render(<Pagination {...defaultProps} />);

    fireEvent.click(screen.getByText("2"));
    expect(mockUpdatePagination).toHaveBeenCalledWith({ page: 2 });

    fireEvent.click(screen.getByText("Next →"));
    expect(mockUpdatePagination).toHaveBeenCalledWith({ page: 2 });
  });

  it("should disable Previous button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const prevButton = screen.getByText("← Previous");
    expect(prevButton).toBeDisabled();
  });

  it("should disable Next button on last page", () => {
    render(<Pagination {...defaultProps} currentPage={5} />);

    const nextButton = screen.getByText("Next →");
    expect(nextButton).toBeDisabled();
  });

  it("should handle per page change", () => {
    render(<Pagination {...defaultProps} />);

    const select = screen.getByDisplayValue("10");
    fireEvent.change(select, { target: { value: "25" } });

    expect(mockUpdatePagination).toHaveBeenCalledWith({ page: 1, perPage: 25 });
  });

  it("should show ellipsis for large page ranges", () => {
    render(<Pagination {...defaultProps} totalPages={10} currentPage={5} />);

    expect(screen.getAllByText("...")).toHaveLength(2);
  });

  it("should handle single page scenario", () => {
    render(<Pagination {...defaultProps} totalPages={1} totalItems={5} />);

    expect(screen.getByText("Showing 5 results")).toBeInTheDocument();
    expect(screen.queryByText("← Previous")).not.toBeInTheDocument();
    expect(screen.queryByText("Next →")).not.toBeInTheDocument();
  });
});
