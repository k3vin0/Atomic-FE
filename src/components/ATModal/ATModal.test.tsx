// ATModal.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ATModal, { ATModalProps } from "./ATModal";

const defaultProps: ATModalProps = {
  header: <h1>Modal Header</h1>,
  body: <p>This is the modal body content.</p>,
  footer: <button>Confirm</button>,
  isOpen: true,
  closeModal: jest.fn(),
};

describe("ATModal Component", () => {
  it("should not render when isOpen is false", () => {
    render(<ATModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText(/Modal Header/i)).toBeNull();
  });

  it("should render correctly when isOpen is true", () => {
    render(<ATModal {...defaultProps} isOpen={true} />);

    expect(screen.getByText(/Modal Header/i)).toBeInTheDocument();
    expect(
      screen.getByText(/This is the modal body content./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Confirm/i)).toBeInTheDocument();
  });
});
