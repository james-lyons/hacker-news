import React from 'react';
import PropTypes from 'prop-types';
import PostMetaInfo from '../PostMetaInfo/PostMetaInfo';
import Title from '../Title/Title';

const PostsList = ({ posts }) => {
    if (posts.length === 0) {
        return (
            <p className='center-text'>
                This user hasnt posted yet
            </p>
        )
    }

    return (
        <ul>
            { posts.map((post) => {
                return (
                    <li key={ post.id } classsName='post'>
                        <Title url={ post.url } title={ post.title } id={ post.id } />
                        <PostMetaInfo
                            by={ post.by }
                            time={ post.time }
                            id={ post.id }
                            descendants={ post.descendants }
                        />
                    </li>
                )
            })}
        </ul>
    );
};

PostsList.propTypes = {
    posts: PropTypes.array.isRequired
};

export default PostsList;
