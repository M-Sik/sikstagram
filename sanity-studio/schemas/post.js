export default {
    title: 'Post',
    name: 'post',
    type: 'document',
    fields: [
        // 누가 작성했는지
        {
            title: 'Author',
            name: 'author',
            type: 'reference',
            to: [{type: 'user'}],
        },
        // 포스트에 올리는 이미지
        {
            title: 'Photo',
            name: 'photo',
            type: 'image',
        },
        // 좋아요에 대한 스키마
        {
            title: 'Likes',
            name: 'likes',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'user'}]
                }
            ],
            validation: (Rule) => Rule.unique(),
        },
        // 댓글에 대한 스키마
        {
            title: 'Comments',
            name: 'comments',
            type: 'array',
            of: [
                {
                    title: 'Comment',
                    name: 'comment',
                    type: 'document',
                    fields: [
                        {
                            title: 'Author',
                            name: 'author',
                            type: 'reference',
                            to: [{type: 'user'}]
                        },
                        {
                            title: 'Comment',
                            name: 'comment',
                            type: 'string',
                        }
                    ]
                }
            ]
        }
    ]
}