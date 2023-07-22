import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  url: String,
});

productSchema.plugin(mongoosePaginate);

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

export default Product;

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - price
 *        - images
 *        - url
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
 *        image:
 *          type: string
 *          description: The product's image
 *        url:
 *          type: string
 *          description: The product's url
 *      example:
 *        id: 5f8d0f4d7f4bba1d9c9bce1f
 *        title: Macbook Pro M1
 *        description: Macbook Pro M1 2020
 *        price: 20000000
 *        image: https://ecs7.tokopedia.net/img/cache/700/product-1/2020/11/18/109508/109508_0e3b3b9a-1b1a-4b9a-9b0a-9b0b0b0b0b0b_700_700
 *        url: https://www.tokopedia.com/appleofficialstore/macbook-pro-m1-2020-13-inch-8gb-256gb-ssd-macbookpro-macbookprom1-macbookprom12020-macbookprom1-8gb-256gb-ssd
 */
