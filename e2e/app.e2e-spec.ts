import { BeerClubFrontPage } from './app.po';

describe('beer-club-front App', () => {
  let page: BeerClubFrontPage;

  beforeEach(() => {
    page = new BeerClubFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
