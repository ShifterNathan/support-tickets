export const SEED_USERS = [
    {
        fullName: 'Super Admin',
        email: 'super.admin@email.com',
        password: '123456',
        roles: ['user','admin','superAdmin'],
        isActive: true
    },
    {
        fullName: 'Admin',
        email: 'admin@email.com',
        password: '123456',
        roles: ['user','admin'],
        isActive: false
    },
    {
        fullName: 'Nathaniel Boyd',
        email: 'nathaniel.boyd@email.com',
        password: '123456',
        roles: ['user','admin'],
        isActive: true
    },
    {
        fullName: 'Common User',
        email: 'common.user@email.com',
        password: '123456',
        roles: ['user'],
        isActive: true
    },
    {
        fullName: 'Pepito Grillo',
        email: 'pepito.grillo@email.com',
        password: '123456',
        roles: ['user'],
        isActive: false
    },
]

export const SEED_CLAIMS = [
    {
        title: 'Defective Item',
        description: 'I purchased a new electronic device, but it is not functioning properly. I would like to request a replacement or repair for the defective item.',
        csv_data: 'claim1.csv',
        claim_number: '1',
        img_data: 'product_image_1.jpg'
    },
    {
        title: 'Missing Components',
        description: 'I received my order, but some of the components mentioned in the product description are missing. I would like to request the missing components to be sent to me.',
        csv_data: 'claim2.csv',
        claim_number: '2',
        img_data: 'product_image_2.jpeg'
    },
    {
        title: 'Wrong Product Shipped',
        description: 'I ordered a specific product, but I received a different product instead. I would like to return the wrong product and receive the correct one.',
        csv_data: 'claim3.csv',
        claim_number: '3',
        img_data: 'product_image_3.png'
    },
    {
        title: 'Package Not Delivered',
        description: 'I placed an order, but the package has not been delivered to my address. I would like to track the package or request a refund.',
        csv_data: 'claim4.csv',
        claim_number: '4',
        img_data: 'product_image_4.jpg'
    },
    {
        title: 'Product Warranty Claim',
        description: 'I purchased a product with a warranty, but it has stopped working within the warranty period. I would like to claim the warranty and get it repaired or replaced.',
        csv_data: 'claim5.csv',
        claim_number: '5',
        img_data: 'product_image_5.jpeg'
    },
    {
        title: 'Incorrect Product Description',
        description: 'The product I received does not match the description provided on the website. I would like to return it and get a refund.',
        csv_data: 'claim6.csv',
        claim_number: '6',
        img_data: 'product_image_6.png'
    },
    {
        title: 'Billing Discrepancy',
        description: 'There is a discrepancy in the billing amount for my order. I have been charged more than the total value of the items. I would like to resolve this issue and get a refund for the extra amount.',
        csv_data: 'claim7.csv',
        claim_number: '7',
        img_data: 'product_image_7.jpg'
    },
    {
        title: 'Product Exchange Request',
        description: 'I would like to exchange the product I purchased for a different size/color/model. Please let me know the procedure for product exchange.',
        csv_data: 'claim8.csv',
        claim_number: '8',
        img_data: 'product_image_8.jpeg'
    },
    {
        title: 'Cancellation Request',
        description: 'I want to cancel my order as I no longer require the product. Please initiate the cancellation and process the refund.',
        csv_data: 'claim9.csv',
        claim_number: '9',
        img_data: 'product_image_9.png'
    },
    {
        title: 'Product Quality Issue',
        description: 'The quality of the product I received is not up to my expectations. I would like to return it and receive a refund.',
        csv_data: 'claim10.csv',
        claim_number: '10',
        img_data: 'product_image_10.jpg'
    }
];
