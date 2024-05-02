import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VolumeSlider from "../app/components/settings/VolumeSlider";

// Mock window.matchMedia before rendering the component
beforeAll(() => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated, but still necessary for compatibility
    removeListener: jest.fn(), // Deprecated, but still necessary for compatibility
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});

describe("VolumeSlider component", () => {
  beforeEach(() => {
    render(<VolumeSlider />);
  });

  test("renders VolumeSlider component", () => {
    expect(screen.getByTestId("volumeSlider")).toBeInTheDocument();
  });

  test("VolumeSlider value changes when slider is moved", () => {
    const volumeSlider = screen.getByTestId("volumeSliderInput");
    fireEvent.change(volumeSlider, { target: { value: 50 } });

    expect(volumeSlider).toHaveValue("50");
  });

  test("VolumeSlider value changes when slider is moved", () => {
    const volumeSlider = screen.getByTestId("volumeSliderInput");
    fireEvent.change(volumeSlider, { target: { value: "25" } });

    expect(volumeSlider).toHaveValue("25");
  });
});
