import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  it('should render app title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Countries Explorer')).toBeInTheDocument();
  });

  it('should render navigation link to home', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    
    const homeLink = screen.getByRole('link', { name: /countries explorer/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
}); 