import { axe } from 'jest-axe';
import { DashboardPage } from '../../dashboard';
import { renderWithContext } from '@/lib/test/render-with-context';
describe('Dashboard Page', () => {
  it('should not violate a11y standards', async () => {
    renderWithContext(<DashboardPage />);

    expect(await axe(document.body)).toHaveNoViolations();
  });
});
