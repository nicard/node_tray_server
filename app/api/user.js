const jwt = require('jsonwebtoken');
const { UserDao } = require('../infra');

const api = {}

api.login = async (req, res) => {
    const { userName, password } = req.body;
    console.log('####################################');
    const user = await new UserDao(req.db).findByNameAndPassword(userName, password);
    console.log(user);
    if(user) {
        console.log(`User ${userName} authenticated`);
        console.log('Authentication Token added to response');
        const token = jwt.sign(user, req.app.get('secret'), {
            expiresIn: 86400 // seconds, 24h
        });
        res.set('x-access-token', token);
        return res.json(user);
    } else {
        console.log(`Authentication failed for user ${userName}`);
        console.log('No token generated');
        res.status(401).json({ message: `Authentication failed for user ${userName}`});  
    }
};

api.register = async (req, res) => {
    const user = req.body;
    const userId = await new UserDao(req.db).add(user);
    res.status(204).end();
};

api.checkUserNameTaken = async (req, res) => {
    const { userName } = req.params;
    const user = await new UserDao(req.db).findByName(userName);
    res.json(!!user);
};

api.produtos = async (req, res) => {
    const Rssult = `{
        "paging": {
            "total": 1,
            "page": 1,
            "offset": 0,
            "limit": 30,
            "maxLimit": 50
        },
        "sort": [
            {
                "id": "asc"
            }
        ],
        "availableFilters": [
            "id",
            "name",
            "category_id",
            "ean",
            "available",
            "price",
            "brand",
            "model",
            "hot",
            "quantity_sold",
            "release",
            "free_shipping",
            "weight",
            "image",
            "release_date",
            "stock",
            "promotion",
            "reference",
            "has_buy_together",
            "has_description",
            "modified",
            "created",
            "price_range",
            "current_price_range"
        ],
        "appliedFilters": [
            {
                "Product.price_range BETWEEN ? AND ?": [
                    "5.00",
                    "100.00"
                ]
            }
        ],
        "Products": [
            {
                "Product": {
                    "ean": "123",
                    "modified": "2016-01-01 11:40:00",
                    "slug": "categoria/produto-de-teste",
                    "ncm": "99999999",
                    "id": "1",
                    "name": "Produto de Teste Descricao Nova",
                    "title": "Titulo do Produto",
                    "description": "Descrição completa do produto",
                    "description_small": "Descrição resumida do produto",
                    "price": "10.00",
                    "cost_price": "0.00",
                    "promotional_price": "0.00",
                    "start_promotion": "0000-00-00",
                    "end_promotion": "0000-00-00",
                    "brand": "Marca",
                    "model": "Modelo",
                    "weight": "100",
                    "length": "10",
                    "width": "10",
                    "height": "10",
                    "stock": "20",
                    "category_id": "2",
                    "available": "0",
                    "availability": "",
                    "reference": "0001",
                    "hot": "1",
                    "release": "0",
                    "additional_button": "",
                    "has_variation": "0",
                    "has_acceptance_terms": "0",
                    "has_buy_together": "0",
                    "additional_message": "",
                    "warranty": "",
                    "rating": "0",
                    "count_rating": "0",
                    "quantity_sold": "1",
                    "ProductImage": [
                        
                    ],
                    "image": "1",
                    "url": {
                        
                    },
                    "created": "2014-11-01 10:12:00",
                    "Properties": {

                    },
                    "payment_option": "",
                    "related_categories": ["4", "6"],
                    "release_date": "0000-00-00",
                    "shortcut": "produto-de-teste",
                    "virtual_product": "",
                    "minimum_stock": "0",
                    "minimum_stock_alert": "0",
                    "promotion_id": "0",
                    "included_items": "",
                    "related_products": ["6", "8", "27", "29"],
                    "free_shipping": "0",
                    "current_price": "0.00",
                    "ipi": "0",
                    "acceptance_term_option": "2",
                    "acceptance_term": "",
                    "warranty_days": "0",
                    "availability_days": "0",
                    "Variant": [
                        {
                            "id": "1"
                        },
                        {
                            "id": "3"
                        }
                    ]
                }
            }, 
            {
                "Product": {
                    "ean": "123",
                    "modified": "2016-01-01 11:40:00",
                    "slug": "categoria/produto-de-teste",
                    "ncm": "99999999",
                    "id": "2",
                    "name": "Produto de Teste 2 Descricao Nova",
                    "title": "Titulo do Produto 2",
                    "description": "Descrição completa do produto 2",
                    "description_small": "Descrição resumida do produto 2",
                    "price": "10.00",
                    "cost_price": "0.00",
                    "promotional_price": "0.00",
                    "start_promotion": "0000-00-00",
                    "end_promotion": "0000-00-00",
                    "brand": "Marca",
                    "model": "Modelo",
                    "weight": "100",
                    "length": "10",
                    "width": "10",
                    "height": "10",
                    "stock": "20",
                    "category_id": "2",
                    "available": "0",
                    "availability": "",
                    "reference": "0001",
                    "hot": "1",
                    "release": "0",
                    "additional_button": "",
                    "has_variation": "0",
                    "has_acceptance_terms": "0",
                    "has_buy_together": "0",
                    "additional_message": "",
                    "warranty": "",
                    "rating": "0",
                    "count_rating": "0",
                    "quantity_sold": "1",
                    "ProductImage": [
                        
                    ],
                    "image": "1",
                    "url": {
                        
                    },
                    "created": "2014-11-01 10:12:00",
                    "Properties": {

                    },
                    "payment_option": "",
                    "related_categories": ["4", "6"],
                    "release_date": "0000-00-00",
                    "shortcut": "produto-de-teste",
                    "virtual_product": "",
                    "minimum_stock": "0",
                    "minimum_stock_alert": "0",
                    "promotion_id": "0",
                    "included_items": "",
                    "related_products": ["6", "8", "27", "29"],
                    "free_shipping": "0",
                    "current_price": "0.00",
                    "ipi": "0",
                    "acceptance_term_option": "2",
                    "acceptance_term": "",
                    "warranty_days": "0",
                    "availability_days": "0",
                    "Variant": [
                        {
                            "id": "2"
                        }
                    ]
                }
            }
        ]
    }`;
    res.status(200).end(Rssult);
};



api.variants = async (req, res) => {
    const Rssult = `{
            "paging": {
            "total": 38,
            "page": 1,
            "offset": 0,
            "limit": 1,
            "maxLimit": 50
        },
        "sort": [
            {
                "id": "asc"
            }
        ],
        "availableFilters": [
            "id",
            "product_id",
            "ean",
            "price",
            "promotional_price",
            "stock",
            "minimum_stock",
            "reference",
            "modified"
        ],
        "appliedFilters": [ ],
        "Variants": [
            {
                "Variant": {
                    "id": "1",
                    "ean": "",
                    "product_id": "1",
                    "price": "123.00",
                    "cost_price": "90.00",
                    "stock": "100",
                    "minimum_stock": "0",
                    "reference": "M123",
                    "weight": "2",
                    "cubic_weight": "2",
                    "length": "1",
                    "width": "10",
                    "height": "15",
                    "start_promotion": "0000-00-00",
                    "end_promotion": "0000-00-00",
                    "promotional_price": "0.00",
                    "payment_option": "R$ 110,00 à vista com desconto Boleto - TrayCheckout",
                    "payment_option_details": [
                        {
                            "display_name": "Boleto - TrayCheckout",
                            "plots": "1",
                            "value": "110.00"
                        }
                    ],
                    "available": "1",
                    "illustrative_image": "",
                    "color_id_1": "2",
                    "color_id_2": "0",
                    "Sku": [
                        {
                            "type": "Cor",
                            "value": "Azul",
                            "image": "http://images.tcdn.com.br/img/img_prod/123/cor_1.png?123123",
                            "image_secure": "https://images.tcdn.com.br/img/img_prod/123/cor_1.png?123123"
                        }
                    ],
                    "VariantImage": [
                        {
                            "http": "http://images.tcdn.com.br/img/img_prod/123/43_1_123123.jpg",
                            "https": "https://images.tcdn.com.br/img/img_prod/123/43_1_123123.jpg",
                            "thumbs": {
                                "30": {
                                    "http": "http://images.tcdn.com.br/img/img_prod/123/30_43_1_123123.jpg",
                                    "https": "https://images.tcdn.com.br/img/img_prod/123/30_43_1_123123.jpg"
                                },
                                "90": {
                                    "http": "http://images.tcdn.com.br/img/img_prod/123/90_43_1_123123.jpg",
                                    "https": "https://images.tcdn.com.br/img/img_prod/123/90_43_1_123123.jpg"
                                },
                                "180": {
                                    "http": "http://images.tcdn.com.br/img/img_prod/123/180_43_1_123123.jpg",
                                    "https": "https://images.tcdn.com.br/img/img_prod/123/180_43_1_123123.jpg"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "Variant": {
                    "id": "2",
                    "ean": "",
                    "product_id": "2",
                    "price": "123.00",
                    "cost_price": "90.00",
                    "stock": "100",
                    "minimum_stock": "0",
                    "reference": "M321",
                    "weight": "2",
                    "cubic_weight": "2",
                    "length": "1",
                    "width": "10",
                    "height": "15",
                    "start_promotion": "0000-00-00",
                    "end_promotion": "0000-00-00",
                    "promotional_price": "0.00",
                    "payment_option": "R$ 110,00 à vista com desconto Boleto - TrayCheckout",
                    "payment_option_details": [
                        
                    ],
                    "available": "1",
                    "illustrative_image": "",
                    "color_id_1": "2",
                    "color_id_2": "0",
                    "Sku": [
                        
                    ],
                    "VariantImage": [
                        
                    ]
                }
            },
            {
                "Variant": {
                    "id": "3",
                    "ean": "",
                    "product_id": "1",
                    "price": "123.00",
                    "cost_price": "90.00",
                    "stock": "100",
                    "minimum_stock": "0",
                    "reference": "M123",
                    "weight": "2",
                    "cubic_weight": "2",
                    "length": "1",
                    "width": "10",
                    "height": "15",
                    "start_promotion": "0000-00-00",
                    "end_promotion": "0000-00-00",
                    "promotional_price": "0.00",
                    "payment_option": "R$ 110,00 à vista com desconto Boleto - TrayCheckout",
                    "payment_option_details": [
                        
                    ],
                    "available": "1",
                    "illustrative_image": "",
                    "color_id_1": "2",
                    "color_id_2": "0",
                    "Sku": [
                        
                    ],
                    "VariantImage": [
                        
                    ]
                }
            }
        ]
    }`;
    res.status(200).end(Rssult);
};

module.exports = api;