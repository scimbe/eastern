import React from 'react';
import { render, screen } from '@testing-library/react';
import EasterEggTrigger from './EasterEggTrigger';

test('renders EasterEggTrigger component', () => {
    render(<EasterEggTrigger />);
    const linkElement = screen.getByText(/Easter Egg/i);
    expect(linkElement).toBeInTheDocument();
});