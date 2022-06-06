import { render, screen } from '@testing-library/react';
import SignIn from './Sign-in';

test('renders learn react link', () => {
  render(<SignIn />);
  const linkElement = screen.getByText(/el-instagram clone/i);
  expect(linkElement).toBeInTheDocument();
});