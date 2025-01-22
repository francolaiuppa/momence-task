import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Heading from './Heading';

describe('Heading', () => {
  it('renders the correct text for type h1', () => {
    render(<Heading type="h1">Test Heading</Heading>);
    expect(screen.getByText(/Test Heading/i)).toBeInTheDocument();
  });

  it('applies dark styles when dark is true', () => {
    render(<Heading type="h1" dark={true}>Dark Heading</Heading>);
    const heading = screen.getByText(/Dark Heading/i);
    expect(heading).toHaveStyle('color: rgb(30 27 75 / var(--tw-text-opacity));'); // Match the exact color for text-indigo-950
  });
});
