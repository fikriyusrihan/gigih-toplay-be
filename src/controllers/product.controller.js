import httpStatus from 'http-status';
import handlerWrapper from '../utils/handlerWrapper.js';

class ProductController {
  constructor(productService) {
    this.productService = productService;

    this.handlePostProduct = this.handlePostProduct.bind(this);
    this.handleGetProducts = this.handleGetProducts.bind(this);
    this.handleGetProductById = this.handleGetProductById.bind(this);
    this.handlePutProductById = this.handlePutProductById.bind(this);
    this.handleDeleteProductById = this.handleDeleteProductById.bind(this);
  }

  handlePostProduct = handlerWrapper(async (req, res) => {
    const product = await this.productService.createProduct(req.body);
    const response = {
      status: 'success',
      message: 'Product successfully created',
      data: product,
    };

    res.status(httpStatus.CREATED).json(response);
  });

  handleGetProducts = handlerWrapper(async (req, res) => {
    let { title, page, limit } = req.query;

    if (!title) {
      title = '';
    }

    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }

    const result = await this.productService.queryProducts(
      { title: { $regex: title, $options: 'i' } },
      { page, limit },
    );

    const response = {
      status: 'success',
      message: 'Products successfully retrieved',
      data: result,
    };

    res.status(httpStatus.OK).json(response);
  });

  handleGetProductById = handlerWrapper(async (req, res) => {
    const { productId } = req.params;
    const product = await this.productService.getProductById(productId);
    const response = {
      status: 'success',
      message: 'Product successfully retrieved',
      data: product,
    };

    res.status(httpStatus.OK).json(response);
  });

  handlePutProductById = handlerWrapper(async (req, res) => {
    const { productId } = req.params;
    const product = await this.productService.updateProductById(productId, req.body);
    const response = {
      status: 'success',
      message: 'Product successfully updated',
      data: product,
    };

    res.status(httpStatus.OK).json(response);
  });

  handleDeleteProductById = handlerWrapper(async (req, res) => {
    const { productId } = req.params;
    const product = await this.productService.deleteProductById(productId);
    const response = {
      status: 'success',
      message: 'Product successfully deleted',
      data: product,
    };

    res.status(httpStatus.OK).json(response);
  });
}

export default ProductController;
