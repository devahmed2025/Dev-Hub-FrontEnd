// import {
//   createSlice,
//   createAsyncThunk,
//   createSelector,
// } from '@reduxjs/toolkit';
// import {
//   createPost,
//   fetchPosts,
//   fetchPost,
//   updatePost,
//   deletePost,
//   likePost,
//   unlikePost,
//   createComment,
//   updateComment,
//   deleteComment,
// } from '../../api/api';

// // Selectors
// const selectPosts = (state) => state.community.posts;
// const selectCurrentPost = (state) => state.community.currentPost;

// export const selectCommentCountByPostId = createSelector(
//   [selectPosts, (_, postId) => postId],
//   (posts, postId) => {
//     const post = posts.find((p) => p._id === postId);
//     return post?.comments?.length || 0;
//   }
// );

// export const selectTopPosts = createSelector([selectPosts], (posts) => {
//   return [...posts]
//     .sort((a, b) => {
//       const aEngagement = (a.likes?.length || 0) + (a.comments?.length || 0);
//       const bEngagement = (b.likes?.length || 0) + (b.comments?.length || 0);
//       return bEngagement - aEngagement;
//     })
//     .slice(0, 5);
// });

// export const selectTopTags = createSelector([selectPosts], (posts) => {
//   const tagCounts = posts.reduce((acc, post) => {
//     if (Array.isArray(post.tags)) {
//       post.tags.forEach((tag) => {
//         acc[tag] = (acc[tag] || 0) + 1;
//       });
//     }
//     return acc;
//   }, {});
//   return Object.entries(tagCounts)
//     .sort(([, a], [, b]) => b - a)
//     .slice(0, 8)
//     .map(([tag, count]) => ({ tag, count }));
// });

// export const selectActiveUsers = createSelector([selectPosts], (posts) => {
//   const userEngagement = posts.reduce((acc, post) => {
//     const userId = post.user?._id;
//     if (userId) {
//       if (!acc[userId]) {
//         acc[userId] = {
//           user: post.user,
//           posts: 0,
//           engagement: 0,
//         };
//       }
//       acc[userId].posts += 1;
//       acc[userId].engagement +=
//         (post.likes?.length || 0) + (post.comments?.length || 0);
//     }
//     return acc;
//   }, {});
//   return Object.values(userEngagement)
//     .sort((a, b) => b.engagement - a.engagement)
//     .slice(0, 5);
// });

// // Thunks
// export const createCommunityPost = createAsyncThunk(
//   'community/createPost',
//   async (postData, { rejectWithValue }) => {
//     try {
//       const response = await createPost(postData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to create post'
//       );
//     }
//   }
// );

// export const getPosts = createAsyncThunk(
//   'community/fetchPosts',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetchPosts();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to fetch posts'
//       );
//     }
//   }
// );

// export const getPost = createAsyncThunk(
//   'community/fetchPost',
//   async (postId, { rejectWithValue }) => {
//     try {
//       const response = await fetchPost(postId);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to fetch post'
//       );
//     }
//   }
// );

// export const updateCommunityPost = createAsyncThunk(
//   'community/updatePost',
//   async ({ postId, postData }, { rejectWithValue }) => {
//     try {
//       const response = await updatePost(postId, postData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to update post'
//       );
//     }
//   }
// );

// export const deleteCommunityPost = createAsyncThunk(
//   'community/deletePost',
//   async (postId, { rejectWithValue }) => {
//     try {
//       await deletePost(postId);
//       return postId;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to delete post'
//       );
//     }
//   }
// );

// export const likeCommunityPost = createAsyncThunk(
//   'community/likePost',
//   async ({ postId, userId }, { rejectWithValue }) => {
//     try {
//       const response = await likePost(postId);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to like post'
//       );
//     }
//   }
// );

// export const unlikeCommunityPost = createAsyncThunk(
//   'community/unlikePost',
//   async ({ postId, userId }, { rejectWithValue }) => {
//     try {
//       const response = await unlikePost(postId);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to unlike post'
//       );
//     }
//   }
// );

// export const createCommunityComment = createAsyncThunk(
//   'community/createComment',
//   async ({ postId, commentData }, { rejectWithValue }) => {
//     try {
//       const response = await createComment(postId, commentData);

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to create comment'
//       );
//     }
//   }
// );

// export const updateCommunityComment = createAsyncThunk(
//   'community/updateComment',
//   async ({ postId, commentId, commentData }, { rejectWithValue }) => {
//     try {
//       const response = await updateComment(postId, commentId, commentData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to update comment'
//       );
//     }
//   }
// );

// export const deleteCommunityComment = createAsyncThunk(
//   'community/deleteComment',
//   async ({ postId, commentId }, { rejectWithValue }) => {
//     try {
//       await deleteComment(postId, commentId);
//       return { postId, commentId };
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to delete comment'
//       );
//     }
//   }
// );

// const communitySlice = createSlice({
//   name: 'community',
//   initialState: {
//     posts: [],
//     currentPost: null,
//     status: {
//       posts: 'idle',
//       currentPost: 'idle',
//       actions: 'idle',
//     },
//     error: null,
//     lastUpdated: null,
//   },
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     addTempPost: (state, action) => {
//       const tempPost = {
//         ...action.payload,
//         _id: `temp_${action.payload.tempId}`,
//         comments: [],
//         likes: [],
//       };
//       state.posts = [
//         tempPost,
//         ...state.posts.filter((post) => post._id !== tempPost._id),
//       ];
//     },
//     removeTempPost: (state, action) => {
//       state.posts = state.posts.filter((post) => post._id !== action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Get Posts
//       .addCase(getPosts.pending, (state) => {
//         state.status.posts = 'loading';
//       })
//       .addCase(getPosts.fulfilled, (state, action) => {
//         state.status.posts = 'succeeded';
//         state.posts = action.payload;
//         state.lastUpdated = new Date().toISOString();
//       })
//       .addCase(getPosts.rejected, (state, action) => {
//         state.status.posts = 'failed';
//         state.error = action.payload;
//       })
//       // Get Post
//       .addCase(getPost.pending, (state) => {
//         state.status.currentPost = 'loading';
//       })
//       .addCase(getPost.fulfilled, (state, action) => {
//         state.status.currentPost = 'succeeded';
//         state.currentPost = action.payload;
//       })
//       .addCase(getPost.rejected, (state, action) => {
//         state.status.currentPost = 'failed';
//         state.error = action.payload;
//       })
//       // Create Post
//       .addCase(createCommunityPost.pending, (state) => {
//         state.status.actions = 'loading';
//       })
//       .addCase(createCommunityPost.fulfilled, (state, action) => {
//         state.status.actions = 'succeeded';
//         state.posts = state.posts.map((post) =>
//           post._id === `temp_${action.payload.tempId}` ? action.payload : post
//         );
//         state.lastUpdated = new Date().toISOString();
//       })
//       .addCase(createCommunityPost.rejected, (state, action) => {
//         state.status.actions = 'failed';
//         state.error = action.payload;
//       })
//       // Update Post
//       .addCase(updateCommunityPost.pending, (state) => {
//         state.status.actions = 'loading';
//       })
//       .addCase(updateCommunityPost.fulfilled, (state, action) => {
//         state.status.actions = 'succeeded';
//         state.posts = state.posts.map((post) =>
//           post._id === action.payload._id ? action.payload : post
//         );
//         if (state.currentPost?._id === action.payload._id) {
//           state.currentPost = action.payload;
//         }
//         state.lastUpdated = new Date().toISOString();
//       })
//       .addCase(updateCommunityPost.rejected, (state, action) => {
//         state.status.actions = 'failed';
//         state.error = action.payload;
//       })
//       // Delete Post
//       .addCase(deleteCommunityPost.pending, (state) => {
//         state.status.actions = 'loading';
//       })
//       .addCase(deleteCommunityPost.fulfilled, (state, action) => {
//         state.status.actions = 'succeeded';
//         state.posts = state.posts.filter((post) => post._id !== action.payload);
//         if (state.currentPost?._id === action.payload) {
//           state.currentPost = null;
//         }
//         state.lastUpdated = new Date().toISOString();
//       })
//       .addCase(deleteCommunityPost.rejected, (state, action) => {
//         state.status.actions = 'failed';
//         state.error = action.payload;
//       })
//       // Like Post
//       .addCase(likeCommunityPost.fulfilled, (state, action) => {
//         state.posts = state.posts.map((post) =>
//           post._id === action.payload._id ? action.payload : post
//         );
//         if (state.currentPost?._id === action.payload._id) {
//           state.currentPost = action.payload;
//         }
//       })
//       .addCase(likeCommunityPost.rejected, (state, action) => {
//         state.error = action.payload;
//       })
//       // Unlike Post
//       .addCase(unlikeCommunityPost.fulfilled, (state, action) => {
//         state.posts = state.posts.map((post) =>
//           post._id === action.payload._id ? action.payload : post
//         );
//         if (state.currentPost?._id === action.payload._id) {
//           state.currentPost = action.payload;
//         }
//       })
//       .addCase(unlikeCommunityPost.rejected, (state, action) => {
//         state.error = action.payload;
//       })
//       // Create Comment
//       .addCase(createCommunityComment.pending, (state) => {
//         state.status.actions = 'loading';
//       })
//       .addCase(createCommunityComment.fulfilled, (state, action) => {
//         state.status.actions = 'succeeded';
//         const postId = action.payload.post;
//         state.posts = state.posts.map((post) =>
//           post._id === postId
//             ? { ...post, comments: [...(post.comments || []), action.payload] }
//             : post
//         );
//         if (state.currentPost?._id === postId) {
//           state.currentPost.comments = [
//             ...(state.currentPost.comments || []),
//             action.payload,
//           ];
//         }
//         state.lastUpdated = new Date().toISOString();
//       })
//       .addCase(createCommunityComment.rejected, (state, action) => {
//         state.status.actions = 'failed';
//         state.error = action.payload;
//       })
//       // Update Comment
//       .addCase(updateCommunityComment.pending, (state) => {
//         state.status.actions = 'loading';
//       })
//       .addCase(updateCommunityComment.fulfilled, (state, action) => {
//         state.status.actions = 'succeeded';
//         const postId = action.payload.post;
//         state.posts = state.posts.map((post) =>
//           post._id === postId
//             ? {
//                 ...post,
//                 comments: post.comments.map((comment) =>
//                   comment._id === action.payload._id ? action.payload : comment
//                 ),
//               }
//             : post
//         );
//         if (state.currentPost?._id === postId) {
//           state.currentPost.comments = state.currentPost.comments.map(
//             (comment) =>
//               comment._id === action.payload._id ? action.payload : comment
//           );
//         }
//         state.lastUpdated = new Date().toISOString();
//       })
//       .addCase(updateCommunityComment.rejected, (state, action) => {
//         state.status.actions = 'failed';
//         state.error = action.payload;
//       })
//       // Delete Comment
//       .addCase(deleteCommunityComment.pending, (state) => {
//         state.status.actions = 'loading';
//       })
//       .addCase(deleteCommunityComment.fulfilled, (state, action) => {
//         state.status.actions = 'succeeded';
//         const { postId, commentId } = action.payload;
//         state.posts = state.posts.map((post) =>
//           post._id === postId
//             ? {
//                 ...post,
//                 comments:
//                   post.comments?.filter((c) => c._id !== commentId) || [],
//               }
//             : post
//         );
//         if (state.currentPost?._id === postId) {
//           state.currentPost.comments =
//             state.currentPost.comments?.filter((c) => c._id !== commentId) ||
//             [];
//         }
//         state.lastUpdated = new Date().toISOString();
//       })
//       .addCase(deleteCommunityComment.rejected, (state, action) => {
//         state.status.actions = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearError, addTempPost, removeTempPost } =
//   communitySlice.actions;
// export default communitySlice.reducer;

import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import {
  createPost,
  fetchPosts,
  fetchPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  createComment,
  updateComment,
  deleteComment,
} from '../../api/api';

// Selectors
const selectPosts = (state) => state.community.posts;
const selectCurrentPost = (state) => state.community.currentPost;

export const selectCommentCountByPostId = createSelector(
  [selectPosts, (_, postId) => postId],
  (posts, postId) => {
    const post = posts.find((p) => p._id === postId);
    return post?.comments?.length || 0;
  }
);

export const selectTopPosts = createSelector([selectPosts], (posts) => {
  return [...posts]
    .sort((a, b) => {
      const aEngagement = (a.likes?.length || 0) + (a.comments?.length || 0);
      const bEngagement = (b.likes?.length || 0) + (b.comments?.length || 0);
      return bEngagement - aEngagement;
    })
    .slice(0, 5);
});

export const selectTopTags = createSelector([selectPosts], (posts) => {
  const tagCounts = posts.reduce((acc, post) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
    }
    return acc;
  }, {});
  return Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([tag, count]) => ({ tag, count }));
});

export const selectActiveUsers = createSelector([selectPosts], (posts) => {
  const userEngagement = posts.reduce((acc, post) => {
    const userId = post.user?._id;
    if (userId) {
      if (!acc[userId]) {
        acc[userId] = {
          user: post.user,
          posts: 0,
          engagement: 0,
        };
      }
      acc[userId].posts += 1;
      acc[userId].engagement +=
        (post.likes?.length || 0) + (post.comments?.length || 0);
    }
    return acc;
  }, {});
  return Object.values(userEngagement)
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, 5);
});

// Thunks
export const createCommunityPost = createAsyncThunk(
  'community/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await createPost(postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create post'
      );
    }
  }
);

export const getPosts = createAsyncThunk(
  'community/fetchPosts',
  async ({ page = 1 } = {}, { rejectWithValue }) => { // Default to page 1
    try {
      // console.log('Fetching posts for page:', page); // Debug log
      const response = await fetchPosts(page);
      return {
        data: response.data,
        pagination: response.paginationResult,
        page,
      };
    } catch (error) {
      console.error('getPosts Error:', error);
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  }
);

export const getPost = createAsyncThunk(
  'community/fetchPost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetchPost(postId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch post'
      );
    }
  }
);

export const updateCommunityPost = createAsyncThunk(
  'community/updatePost',
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      const response = await updatePost(postId, postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update post'
      );
    }
  }
);

export const deleteCommunityPost = createAsyncThunk(
  'community/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      await deletePost(postId);
      return postId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete post'
      );
    }
  }
);

export const likeCommunityPost = createAsyncThunk(
  'community/likePost',
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const response = await likePost(postId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to like post'
      );
    }
  }
);

export const unlikeCommunityPost = createAsyncThunk(
  'community/unlikePost',
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const response = await unlikePost(postId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to unlike post'
      );
    }
  }
);

export const createCommunityComment = createAsyncThunk(
  'community/createComment',
  async ({ postId, commentData }, { rejectWithValue }) => {
    try {
      const response = await createComment(postId, commentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create comment'
      );
    }
  }
);

export const updateCommunityComment = createAsyncThunk(
  'community/updateComment',
  async ({ postId, commentId, commentData }, { rejectWithValue }) => {
    try {
      const response = await updateComment(postId, commentId, commentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update comment'
      );
    }
  }
);

export const deleteCommunityComment = createAsyncThunk(
  'community/deleteComment',
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      await deleteComment(postId, commentId);
      return { postId, commentId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete comment'
      );
    }
  }
);

const communitySlice = createSlice({
  name: 'community',
  initialState: {
    posts: [],
    currentPost: null,
    pagination: {
      currentPage: 1,
      numberOfPages: 1,
      limit: 10,
      prev: null,
    },
    status: {
      posts: 'idle',
      currentPost: 'idle',
      actions: 'idle',
    },
    error: null,
    lastUpdated: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addTempPost: (state, action) => {
      const tempPost = {
        ...action.payload,
        _id: `temp_${action.payload.tempId}`,
        comments: [],
        likes: [],
      };
      state.posts = [
        tempPost,
        ...state.posts.filter((post) => post._id !== tempPost._id),
      ];
    },
    removeTempPost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    resetPosts: (state) => {
      state.posts = [];
      state.pagination = {
        currentPage: 1,
        numberOfPages: 1,
        limit: 10,
        prev: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Posts
      .addCase(getPosts.pending, (state) => {
        state.status.posts = 'loading';
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status.posts = 'succeeded';
        if (action.payload.page === 1) {
          state.posts = action.payload.data;
        } else {
          state.posts = [...state.posts, ...action.payload.data];
        }
        state.pagination = {
          currentPage: action.payload.pagination.currentPage || 1,
          numberOfPages: action.payload.pagination.numberOfPages || 1,
          limit: action.payload.pagination.limit || 10,
          prev: action.payload.pagination.prev || null,
        };
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status.posts = 'failed';
        state.error = action.payload;
      })
      // Get Post
      .addCase(getPost.pending, (state) => {
        state.status.currentPost = 'loading';
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.status.currentPost = 'succeeded';
        state.currentPost = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.status.currentPost = 'failed';
        state.error = action.payload;
      })
      // Create Post
      .addCase(createCommunityPost.pending, (state) => {
        state.status.actions = 'loading';
      })
      .addCase(createCommunityPost.fulfilled, (state, action) => {
        state.status.actions = 'succeeded';
        state.posts = state.posts.map((post) =>
          post._id === `temp_${action.payload.tempId}` ? action.payload : post
        );
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(createCommunityPost.rejected, (state, action) => {
        state.status.actions = 'failed';
        state.error = action.payload;
      })
      // Update Post
      .addCase(updateCommunityPost.pending, (state) => {
        state.status.actions = 'loading';
      })
      .addCase(updateCommunityPost.fulfilled, (state, action) => {
        state.status.actions = 'succeeded';
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        if (state.currentPost?._id === action.payload._id) {
          state.currentPost = action.payload;
        }
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateCommunityPost.rejected, (state, action) => {
        state.status.actions = 'failed';
        state.error = action.payload;
      })
      // Delete Post
      .addCase(deleteCommunityPost.pending, (state) => {
        state.status.actions = 'loading';
      })
      .addCase(deleteCommunityPost.fulfilled, (state, action) => {
        state.status.actions = 'succeeded';
        state.posts = state.posts.filter((post) => post._id !== action.payload);
        if (state.currentPost?._id === action.payload) {
          state.currentPost = null;
        }
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(deleteCommunityPost.rejected, (state, action) => {
        state.status.actions = 'failed';
        state.error = action.payload;
      })
      // Like Post
      .addCase(likeCommunityPost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        if (state.currentPost?._id === action.payload._id) {
          state.currentPost = action.payload;
        }
      })
      .addCase(likeCommunityPost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Unlike Post
      .addCase(unlikeCommunityPost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        if (state.currentPost?._id === action.payload._id) {
          state.currentPost = action.payload;
        }
      })
      .addCase(unlikeCommunityPost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Create Comment
      .addCase(createCommunityComment.pending, (state) => {
        state.status.actions = 'loading';
      })
      .addCase(createCommunityComment.fulfilled, (state, action) => {
        state.status.actions = 'succeeded';
        const postId = action.payload.post;
        state.posts = state.posts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...(post.comments || []), action.payload] }
            : post
        );
        if (state.currentPost?._id === postId) {
          state.currentPost.comments = [
            ...(state.currentPost.comments || []),
            action.payload,
          ];
        }
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(createCommunityComment.rejected, (state, action) => {
        state.status.actions = 'failed';
        state.error = action.payload;
      })
      // Update Comment
      .addCase(updateCommunityComment.pending, (state) => {
        state.status.actions = 'loading';
      })
      .addCase(updateCommunityComment.fulfilled, (state, action) => {
        state.status.actions = 'succeeded';
        const postId = action.payload.post;
        state.posts = state.posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment._id === action.payload._id ? action.payload : comment
                ),
              }
            : post
        );
        if (state.currentPost?._id === postId) {
          state.currentPost.comments = state.currentPost.comments.map(
            (comment) =>
              comment._id === action.payload._id ? action.payload : comment
          );
        }
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateCommunityComment.rejected, (state, action) => {
        state.status.actions = 'failed';
        state.error = action.payload;
      })
      // Delete Comment
      .addCase(deleteCommunityComment.pending, (state) => {
        state.status.actions = 'loading';
      })
      .addCase(deleteCommunityComment.fulfilled, (state, action) => {
        state.status.actions = 'succeeded';
        const { postId, commentId } = action.payload;
        state.posts = state.posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments:
                  post.comments?.filter((c) => c._id !== commentId) || [],
              }
            : post
        );
        if (state.currentPost?._id === postId) {
          state.currentPost.comments =
            state.currentPost.comments?.filter((c) => c._id !== commentId) ||
            [];
        }
      })
      .addCase(deleteCommunityComment.rejected, (state, action) => {
        state.status.actions = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearError, addTempPost, removeTempPost, resetPosts } =
  communitySlice.actions;
export default communitySlice.reducer;