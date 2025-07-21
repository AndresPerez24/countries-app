import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const mockRegions = ['Europe', 'Asia', 'Americas'];
  const defaultProps = {
    selectedRegion: '',
    onRegionChange: jest.fn(),
    sortField: 'name' as const,
    sortOrder: 'asc' as const,
    onSortChange: jest.fn(),
    regions: mockRegions
  };

  it('should render filter dropdowns', () => {
    render(<FilterBar {...defaultProps} />);
    
    expect(screen.getByText('Filter by Region')).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('should call onRegionChange when region is selected', () => {
    const mockOnRegionChange = jest.fn();
    render(<FilterBar {...defaultProps} onRegionChange={mockOnRegionChange} />);
    
    const regionSelect = screen.getByDisplayValue('All Regions');
    fireEvent.change(regionSelect, { target: { value: 'Europe' } });
    
    expect(mockOnRegionChange).toHaveBeenCalledWith('Europe');
  });

  it('should render sort dropdown with correct options', () => {
    render(<FilterBar {...defaultProps} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Population')).toBeInTheDocument();
  });
}); 