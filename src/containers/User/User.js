import React from 'react';
import queryString from 'query-strings';
import { fetchUser, fetchPosts } from '../../utils/api';
import Loading from '../Loading/Loading';
import PostsList from '../../components/PostsList/PostsList';

class User extends React.Component {
    state = {
        user: null,
        posts: null,
        loadingUser: true,
        loadingPosts: true,
        error: null
    };

    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search);

        fetchUser(id)
            .then((user) => {
                this.setState({ user, loadingUser: false });

                return fetchPosts(user.submitted.splice(0, 30));
            })
            .then((posts) => this.setState({
                posts,
                loadingPosts: false,
                error: null
            }))
            .catch(({ message }) => this.setState({
                error: message,
                loadingUser: false,
                loadingPosts: false
            }));
    };

    render() {
        const { user, posts, loadingUser, loadingPosts, error } = this.state;

        if (error) {
            return <p className='center-text error'>{ error }</p>
        };

        return (
            <>
                { loadingUser === true
                    ? <Loading text='Fetching user' />
                    : <>
                        <h1 className='header'>{ user.id }</h1>
                        <div className='meta-info-light'>
                            <span>joined <b>{ formatDate(user.created) }</b></span>
                            <span>has <b>{ user.karma.toLocaleString() }</b>karma</span>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: user.about }} />
                    </>
                }
                { loadingPosts === true
                    ? loadingUser === false && <Loading text='Fetching posts' />
                    : <>
                        <h2>Posts</h2>
                        <PostList posts={ posts } />
                    </>
                }
            </>
        );
    };
};

export default User;