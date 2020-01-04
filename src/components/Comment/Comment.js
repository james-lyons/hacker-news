import React from 'react';
import PropTypes from 'prop-types';
import PostMetaInfo from '../PostMetaInfo/PostMetaInfo';

const Comment = ({ comment }) => {
    return (
        <div className='comment'>
            <PostMetaInfo
                comment={ true }
                by={ comment.by }
                time={ comment.time }
                id={ comment.id }
            />
        </div>
    );
};

export default Comment;