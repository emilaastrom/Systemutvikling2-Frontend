import React from 'react';
import { render } from '@testing-library/react';
import ChallengesFinishedPopup from '@/app/components/ChallengesFinishedPopup';

describe('ChallengesFinishedPopup', () => {
  const closePopup = jest.fn(); // Mocking the closePopup function
  const finished = [
    { id: 1, name: 'Challenge 1', description: 'Description 1' },
    { id: 2, name: 'Challenge 2', description: 'Description 2' },
  ];
  const unfinished = [
    { id: 3, name: 'Challenge 3', description: 'Description 3' },
    { id: 4, name: 'Challenge 4', description: 'Description 4' },
  ];

  it('renders finished challenges', () => {
    const { getByText } = render(
      <ChallengesFinishedPopup
        closePopup={closePopup}
        finished={finished}
        unfinished={[]}
      />
    );

    finished.forEach(challenge => {
      expect(getByText(new RegExp(challenge.name, 'i'))).toBeInTheDocument();
      expect(getByText(new RegExp(challenge.description, 'i'))).toBeInTheDocument();
    });
  });

  it('renders unfinished challenges', () => {
    const { getByText } = render(
      <ChallengesFinishedPopup
        closePopup={closePopup}
        finished={[]}
        unfinished={unfinished}
      />
    );

    unfinished.forEach(challenge => {
      expect(getByText(new RegExp(challenge.name, 'i'))).toBeInTheDocument();
      expect(getByText(new RegExp(challenge.description, 'i'))).toBeInTheDocument();
    });
  });

  it('renders both finished and unfinished challenges', () => {
    const { getByText } = render(
      <ChallengesFinishedPopup
        closePopup={closePopup}
        finished={finished}
        unfinished={unfinished}
      />
    );

    finished.forEach(challenge => {
      expect(getByText(new RegExp(challenge.name, 'i'))).toBeInTheDocument();
      expect(getByText(new RegExp(challenge.description, 'i'))).toBeInTheDocument();
    });

    unfinished.forEach(challenge => {
      expect(getByText(new RegExp(challenge.name, 'i'))).toBeInTheDocument();
      expect(getByText(new RegExp(challenge.description, 'i'))).toBeInTheDocument();
    });
  });
});
