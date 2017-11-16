import { NewtonIdeasPage } from './app.po';

describe('newton-ideas App', () => {
  let page: NewtonIdeasPage;

  beforeEach(() => {
    page = new NewtonIdeasPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
