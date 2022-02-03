import { createSlice } from "@reduxjs/toolkit"

const socialMediaSlice = createSlice({
    name: 'socialMedia',
    initialState: {
        value: {
            account: '',
            socialMedia: [],
            postCount: 0,
            posts: [],
            loading: true
        }
    },
    reducers: {
        setSocialMedia: (state, action) => {
            state.value = action.payload
        },
        createPost: (state, action) => {
            state.value.loading = true

            state.value.socialMedia.methods.createPost(action.payload.content, action.payload.mediaHash, action.payload.tip)
                .send({ from: state.value.account })
                .on('receipt', (receipt) => {
                    state.value.loading = false
                })
        },
        tipPost: (state, action) => {
            state.value.loading = true

            state.value.socialMedia.methods.tipPost(action.payload.id)
                .send({ from: state.value.account, value: action.payload.tip })
                .on('receipt', (receipt) => {
                    state.value.loading = false
                })
        }
    }
})

export const { setSocialMedia, createPost, tipPost } = socialMediaSlice.actions;

export default socialMediaSlice.reducer;