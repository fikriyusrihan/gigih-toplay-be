import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import toJSON from './plugins/toJSON.plugin.js';

const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image_url: String,
  product_url: {
    type: String,
    required: true,
  },
});

productSchema.plugin(mongoosePaginate);
productSchema.plugin(toJSON);

const Product = mongoose.model('Product', productSchema);

export default Product;

/**
 * @swagger
 * components:
 *  schemas:
 *    ProductRequest:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - price
 *        - product_url
 *      properties:
 *        title:
 *          type: string
 *          description: The product's title
 *        description:
 *          type: string
 *          description: The product's description
 *        price:
 *          type: number
 *          description: The product's price
 *        product_url:
 *          type: string
 *          description: The product's url
 *      example:
 *        title: Macbook Pro M1
 *        description: Macbook Pro M1 2020
 *        price: 20000000
 *        product_url: https://www.tokopedia.com/appleofficialstore/macbook-pro-m1-2020-13-inch-8gb-256gb-ssd-macbookpro-macbookprom1-macbookprom12020-macbookprom1-8gb-256gb-ssd
 *    Product:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - price
 *        - images_url
 *        - product_url
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the product
 *        title:
 *          type: string
 *          description: The product's title
 *        description:
 *          type: string
 *          description: The product's description
 *        price:
 *          type: number
 *          description: The product's price
 *        image_url:
 *          type: string
 *          description: The product's image
 *        product_url:
 *          type: string
 *          description: The product's url
 *      example:
 *        id: 5f8d0f4d7f4bba1d9c9bce1f
 *        title: Macbook Pro M1
 *        description: Macbook Pro M1 2020
 *        price: 20000000
 *        image_url: https://ecs7.tokopedia.net/img/cache/700/product-1/2020/11/18/109508/109508_0e3b3b9a-1b1a-4b9a-9b0a-9b0b0b0b0b0b_700_700
 *        product_url: https://www.tokopedia.com/appleofficialstore/macbook-pro-m1-2020-13-inch-8gb-256gb-ssd-macbookpro-macbookprom1-macbookprom12020-macbookprom1-8gb-256gb-ssd
 */
