import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('should render search input', () => {
    render(<SearchBar onSearch={() => {}} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search for a country...');
  });

  it('should call onSearch with debounced value', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Germany' } });
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('Germany');
    }, { timeout: 500 });
  });

  it('should update input value when typing', () => {
    render(<SearchBar onSearch={() => {}} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'France' } });
    
    expect(input.value).toBe('France');
  });
}); 