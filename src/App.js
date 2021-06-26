import './App.css';

import React, { useEffect } from 'react';
import { authRef, createUserDocument } from './firebase/firebase';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignIn from './components/sign-in/sign-in.component';
import TestingPage from './pages/testing-page/testing-page.component';
import SignUp from './components/sign-up/sign-up.component';
import PostGigPage from './pages/post-gig-page/post-gig-page.component';
import ViewGigsPage from './pages/view-gigs-page/view-gigs-page.component';
import GigFullDisplay from './pages/gig-full-display/gig-full-display.component';
import CenterPopup from './components/center-popup/center-popup.component';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3b4f50',
        }, secondary: {
            main: '#fed0a9'
        }
    }
});

const App = () => {
    const dispatch = useDispatch();
    const showSignInPopup = useSelector(state => state.appSettingsReducer.signInPopup);
    const showSignUpPopup = useSelector(state => state.appSettingsReducer.signUpPopup);
    const signedIn = useSelector(state => state.userReducer.currentUser.uid);
    useEffect(() => {if (!signedIn) dispatch({ type: 'TOGGLE_SIGNUP_POPUP' })}, [])

    useEffect(() => {
        authRef.onAuthStateChanged(async user => {
            if (user) {
                const userData = await createUserDocument(user);
                dispatch({
                    type: 'SET_CURRENT_USER', payload: {
                        ...userData,
                        photoURL: user.photoURL
                    }
                });
            } else dispatch({ type: 'SET_CURRENT_USER', payload: { uid: null } });
        })
    }, [])

    const otherRoutes = () => {
        return (
            <Switch>
                <Route path='/PostGig'>
                    {
                        signedIn ? <PostGigPage />
                            : <CenterPopup state={showSignInPopup}
                                handleClose={() => dispatch({ type: 'TOGGLE_SIGNIN_POPUP' })}>
                                <SignIn />
                            </CenterPopup>
                    }
                </Route>
                <Route path='/ViewGigs'>
                    <ViewGigsPage />
                </Route>
                <Route path='/Testing'>
                    <TestingPage />
                </Route>
                <Route path='/Gig/:gigUID'>
                    <GigFullDisplay />
                </Route>
            </Switch>
        )
    }

    return (
        <MuiThemeProvider theme={theme}>
            <div className="App" >
                <Switch>
                    <Route exact path='/'>
                        <HomePage />
                    </Route>
                    <Route>
                        <Header />
                        {otherRoutes()}
                    </Route>
                </Switch>
                <CenterPopup state={showSignInPopup} handleClose={() => dispatch({ type: 'TOGGLE_SIGNIN_POPUP' })}>
                    <SignIn />
                </CenterPopup>
                <CenterPopup state={showSignUpPopup} handleClose={() => dispatch({ type: 'TOGGLE_SIGNUP_POPUP' })} >
                    <SignUp />
                </CenterPopup>
            </div>
        </MuiThemeProvider>
    );
}

export default App;