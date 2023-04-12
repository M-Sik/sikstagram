//  title: 세니티 스튜디오에서 볼 이름
// name: 백엔드에서 쓸 키 이름
export default {
    title: 'User',
    name: 'user',
    type: 'document',
    fields: [
        // 사용자 아이디
        {
            title: 'Username',
            name: 'username',
            type: 'string',
        },
        // 사용자 이름
        {
            title: 'Name',
            name: 'name',
            type: 'string'
        },
        {
            title: 'Email',
            name: 'email',
            type: 'string'
        },
        {
            title: 'Image',
            name: 'image',
            type: 'string'
        },
        {
            title: 'Following',
            name: 'following',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'user'}]
                }
            ],
            validation: (Rule) => Rule.unique(),
        },
        {
            title: 'Followers',
            name: 'followers',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'user'}]
                }
            ],
            validation: (Rule) => Rule.unique(),
        },
        {
            title: 'Bookmarks',
            name: 'bookmarks',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'post'}]
                }
            ],
            validation: (Rule) => Rule.unique(),
        }
    ]
}