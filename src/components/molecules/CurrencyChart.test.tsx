import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import CurrencyChart from './CurrencyChart';

describe('CurrencyChart', () => {
  it('renders exchange rates correctly', () => {
    const mockExchangeRates = [
      { country: 'Japan', currency: 'Yen', amount: 1, code: 'JPY', rate: 22, ratePer100CZK: 4.5 },
      { country: 'Canada', currency: 'Dollar', amount: 1, code: 'CAD', rate: 18, ratePer100CZK: 5.5 },
    ];

    render(<CurrencyChart exchangeRates={mockExchangeRates} lastUpdated="2025-01-21T12:00:00Z" />);

    // Verify the header is present
    expect(screen.getByText(/Currency/i)).toBeInTheDocument();
    expect(screen.getByText(/100 CZK equals/i)).toBeInTheDocument();

    // Verify rows are rendered
    expect(screen.getByText(/Japan/i)).toBeInTheDocument();
    expect(screen.getByText(/Dollar/i)).toBeInTheDocument(); // Matches both currencies
    expect(screen.getByText(/Yen/i)).toBeInTheDocument();
    expect(screen.getByText(/4.5/i)).toBeInTheDocument();

    expect(screen.getByText(/Canada/i)).toBeInTheDocument();
    expect(screen.getByText(/CAD/i)).toBeInTheDocument();
    expect(screen.getByText(/5.5/i)).toBeInTheDocument();
  });

  it('renders nothing when no exchange rates are provided', () => {
    const { container } = render(<CurrencyChart exchangeRates={null} lastUpdated="2025-01-21T12:00:00Z" />);
    
    // The container should be empty
    expect(container.firstChild).toBeNull();
  });
});
