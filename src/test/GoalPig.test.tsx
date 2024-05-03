import React from 'react';
import { render } from '@testing-library/react';
import Goalpig from '@/app/components/Goalpig';

describe('Goalpig Component', () => {
  it('renders with correct goal, current, and max values', () => {
    const goal = "Test Goal";
    const current = 50;
    const max = 100;
    
    const { getByText } = render(<Goalpig goal={goal} current={current} max={max} />);
    
    expect(getByText(goal)).toBeInTheDocument();
    expect(getByText(`${current} / ${max} kr`)).toBeInTheDocument();
  });
  
  });
  

