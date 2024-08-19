const toUSD = 25137
const limitProduct = 5
const limitPage = 5
const limitUser = 10
const limitOrder = 5
const colors = [
    {
        id: 1,
        label: 'Red',
        value: 'Red'
    },
    {
        id: 2,
        label: 'Blue',
        value: 'Blue'
    },
    {
        id: 3,
        label: 'Green',
        value: 'Green'
    },
    {
        id: 4,
        label: 'Yellow',
        value: 'Yellow'
    },
    {
        id: 5,
        label: 'Black',
        value: 'Black'
    },
    {
        id: 6,
        label: 'White',
        value: 'White'
    },
    {
        id: 7,
        label: 'Gray',
        value: 'Gray'
    }
]
const internals = [
    {
        id: 1,
        label: '32 GB',
        value: '32 GB'
    },
    {
        id: 2,
        label: '64 GB',
        value: '64 GB'
    },
    {
        id: 3,
        label: '128 GB',
        value: '128 GB'
    },
    {
        id: 4,
        label: '256 GB',
        value: '256 GB'
    },
    {
        id: 5,
        label: '512 GB',
        value: '512 GB'
    },
    {
        id: 6,
        label: '1 TB',
        value: '1 TB'
    }
]
const contantsSort = [
    {
        id: 1,
        label: 'Price: Low to High',
        value: 'price'
    },
    {
        id: 2,
        label: 'Price: High to Low',
        value: '-price'
    },
    {
        id: 3,
        label: 'Newest',
        value: '-createAt'
    },
    {
        id: 4,
        label: 'Oldest',
        value: 'createAt'
    }
]
const navItems: {
    id: number
    title: string
    icon: string
    items?: {
        id: number
        title: string
        icon: string
    }[]
} = [
    {
        id: 1,
        title: 'Dashboard',
        icon: '',
        link: '/'
    },
    {
        id: 2,
        title: 'Products',
        icon: '',
        items: [
            {
                id: 1,
                title: 'All Products',
                icon: '',
                link: '/products/all'
            },
            {
                id: 2,
                title: 'Add Product',
                icon: '',
                link: '/products/add'
            },
            {
                id: 3,
                title: 'Categories',
                icon: '',
                link: '/products/categories'
            },
            {
                id: 4,
                title: 'Brands',
                icon: '',
                link: '/products/brands'
            }
        ]
    },
    {
        id: 3,
        title: 'Orders',
        icon: '',
        link: '/orders'
    },
    {
        id: 4,
        title: 'Customers',
        icon: '',
        items: [
            {
                id: 1,
                title: 'All Customers',
                icon: '',
                link: '/customers/all'
            }
        ]
    },
    {
        id: 5,
        title: 'Chat',
        icon: '',
        link: '/chat'
    }
]

export { navItems, limitPage, contantsSort, colors, internals, limitUser, toUSD, limitOrder, limitProduct }
