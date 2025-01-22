import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import ExchangeRatesContent from './ExchangeRatesContent';

describe('ExchangeRatesContent', () => {
  it('renders the loading skeletons when loading is true', () => {
    render(
      <ExchangeRatesContent
        loading={true}
        error={null}
        refetch={vi.fn()}
        exchangeRates={null}
        lastUpdated={null}
      />
    );

    const chartSkeleton = document.querySelector('[class*="CurrentChartSkeleton___StyledDiv"]');
    expect(chartSkeleton).toBeInTheDocument();

    const formSkeleton = document.querySelector('[class*="CurrencyExchangeFormSkeleton___StyledDiv"]');
    expect(formSkeleton).toBeInTheDocument();
  });

  it('renders the error message and retry button when there is an error', () => {
    const mockRefetch = vi.fn();

    render(
      <ExchangeRatesContent
        loading={false}
        error="Something went wrong"
        refetch={mockRefetch}
        exchangeRates={null}
        lastUpdated={null}
      />
    );

    expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
    const retryButton = screen.getByRole('button', { name: /try again/i });
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('renders the CurrencyChart and CurrencyExchangeForm when data is available', () => {
    const mockExchangeRates = [
      { country: 'Canada', currency: 'Dollar', amount: 1, code: 'CAD', rate: 22, ratePer100CZK: 4.5 },
    ];

    render(
      <ExchangeRatesContent
        loading={false}
        error={null}
        refetch={vi.fn()}
        exchangeRates={mockExchangeRates}
        lastUpdated="2025-01-21T12:00:00Z"
      />
    );

    expect(screen.getByText(/Daily Exchange Rates/i)).toBeInTheDocument();
    expect(document.querySelector('[class*="CurrencyChart_"]')).toBeInTheDocument();
    expect(screen.getAllByText(/CAD/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Canada/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Dollar/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Currency Converter/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount/i)).toBeInTheDocument();
    expect(screen.getAllByText(/To/i)[0]).toBeInTheDocument(); // The "To" from the calculator
    expect(screen.getByText(/Total/i)).toBeInTheDocument(); // The "Total" from the calculator

    // we should also have GBP, USD and EUR available because the select (dropdown) 
    // has them hardcoded first
    expect(screen.getAllByText(/USD/i).length).toBe(1);
    expect(screen.getAllByText(/GBP/i).length).toBe(1);
    expect(screen.getAllByText(/EUR/i).length).toBe(1);
  });
});
