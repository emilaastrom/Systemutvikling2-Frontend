import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Challengecard from '@/app/components/challenges/Challengecard';
import { AuthContext, useMockedAuthContext } from './mocks';

describe('Challengecard', () => {
  it('renders challenge details correctly', () => {
    const onCloseMock = jest.fn();

    const props = {
      id: '1',
      challenge: 'Challenge 1',
      title: 'Title',
      current: 5,
      max: 10,
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-05-10'),
      subStatus: [true, false],
      difficulty: 'HARD',
      onClose: onCloseMock,
    };

    const { getByText } = render(
      <AuthContext.Provider value={null}>
        <Challengecard {...props} />
      </AuthContext.Provider>
    );
    
    expect(getByText('Challenge 1')).toBeInTheDocument();
    expect(getByText('5/10')).toBeInTheDocument();
    expect(getByText('7 dager igjen')).toBeInTheDocument(); 
  });
});
