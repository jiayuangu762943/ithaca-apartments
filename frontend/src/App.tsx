import React, { ReactElement, useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FAQPage from './pages/FAQPage';
import ReviewPage from './pages/ReviewPage';
import LandlordPage from './pages/LandlordPage';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import NavBar, { NavbarButton } from './components/utils/NavBar';
import NotFoundPage from './pages/NotFoundPage';
import { ApartmentWithId } from '../common/types/db-types';
import Footer from './components/utils/Footer';
import { hotjar } from 'react-hotjar';
import { HJID, HJSV } from './constants/hotjar';
import Policies from './pages/Policies';
import ApartmentPage from './pages/ApartmentPage';
import LocationPage from './pages/LocationPage';
import axios from 'axios';
import { colors } from './colors';
import SearchResultsPage from './pages/SearchResultsPage';
import ChatRoomPage from './pages/ChatRoomPage';
const theme = createTheme({
  palette: {
    primary: {
      main: colors.red1,
    },
    secondary: {
      main: colors.gray2,
    },
  },
  typography: {
    fontFamily: ['"Work Sans"', 'sans-serif'].join(','),
    h1: {
      fontSize: 48,
    },
    h2: {
      fontSize: 36,
    },
    h3: {
      fontSize: 28,
    },
    h4: {
      fontSize: 22,
    },
    body1: {
      fontSize: 18,
    },
    body2: {
      fontSize: 16,
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        color: colors.black,
      },
      colorSecondary: {
        color: colors.gray1,
      },
    },
  },
});

const home: NavbarButton = {
  label: 'Home',
  href: '/',
};

const review: NavbarButton = {
  label: 'Messages',
  href: '/chat',
};

export type CardData = {
  buildingData: ApartmentWithId;
  numReviews: number;
  company?: string;
};

export type LocationCardData = {
  photo: string;
  location: string;
};

const headersData = [home, review];

hotjar.initialize(HJID, HJSV);

const App = (): ReactElement => {
  useEffect(() => {
    const setData = async () => {
      await axios.post('/set-data');
    };
    setData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar headersData={headersData} />
        <div className="root">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/faq" component={FAQPage} />
            <Route exact path="/reviews" component={ReviewPage} />
            <Route exact path="/policies" component={Policies} />
            <Route path="/location/:location" component={LocationPage} />
            <Route path="/landlord/:landlordId" component={LandlordPage} />
            <Route path="/apartment/:aptId" component={ApartmentPage} />
            <Route exact path="/notfound" component={NotFoundPage} />
            <Route path="/search" component={SearchResultsPage} />
            <Route path="/chat" component={ChatRoomPage} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
