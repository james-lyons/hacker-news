import React from 'react';
import queryString from 'query-strings';
import { fetchItem, fetchPosts, fetchComments } from '../../utils/api';
import Loading from '../Loading';
import PostMetaInfo from '../../components/PostMetaInfo/PostMetaInfo';
import Title from '../../components/Title/Title';
import Comment from '../../components/Comment/Comment';

class Post extends React.Component {
    state = {
        post: null,
        comments: null,
        loadingPost: true,
        loadingComments: true,
        error: null
    };

    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search)

        fetchItem(id)
            .then((post) => {
                this.setState(({ post, loadingPost: false }));
                return fetchComments(post.lods || []);
            })
            .then((comments) => this.setState({
                comments,
                loadingComments: false
            }))
            .catch(({ message }) => this.setState({
                error: message,
                loadingPost: false,
                loadingCOmments: false
            }));
    };

    render() {
        const { post, loadingPost, comments, loadingComments, error } = this.state;
        if (error) {
            return <p className='center-text error'>{ error }</p>
        } 

        return (
            <>
                {
                    loadingPost === true
                    ? <Loading text='fetching post' />
                    : <>
                        <h1 className='header'>
                            <Title url={ post.url } title={ post.title } id={ post.id } />
                        </h1>
                        <PostMetaInfo
                            by={ post.by }
                            time={ post.time }
                            id={ post.id }
                            descendants={ post.descendants }
                        />
                        <p dangerouslySetInnerHTML={{ __html: post.text }} />
                    </>
                }
                { 
                    loadingComments === true
                    ? loadingPost === false && <Loading text='Fetching comments' />
                    : <>
                        { this.state.comments.map((comment) => 
                            <Comment
                                key={ comment.id }
                                comment= { comment }
                            />
                        )}
                    </>
                }
            </>
        );
    };
};

export default Post;