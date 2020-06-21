import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1005736625944-5hjom0nvv98qs2f8qnbdf5fvciipkuk6.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.authListener(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.authListener);
            });
        });
    }

    authListener = isSignedIn => {
        isSignedIn? this.props.signIn(this.auth.currentUser.get().getId()) : 
                    this.props.signOut();
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    handleAuthButton = () => {
            if (this.props.isSignedIn === null) {
                return null;
            }
            else if (this.props.isSignedIn) {
                return (
                    <button onClick={this.onSignOutClick} className="ui google plus button">
                        <i className="google plus icon"></i>
                        Sign Out
                    </button>
                );
            }
            else {
                return (
                    <button onClick={this.onSignInClick} className="ui google plus button">
                        <i className="google plus icon"></i>
                        Sign In with Google
                    </button>
                );
            }
    }

    render() {
        return (
            <div>
                {this.handleAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { isSignedIn } = state.auth;
    return { isSignedIn };
}

export default connect(
    mapStateToProps,
    { signIn, signOut }
)(GoogleAuth);