import ProducteService from '../services/product.service.js';

async function createProduct(req, res, next) {
    try {
        let product = req.body;
        if (
            !product.name ||
            !product.description ||
            !product.value ||
            !product.stock ||
            !product.supplier_id
        ) {
            throw new Error(
                'Name, description, value, stock, supplier_id são obrigatorios'
            );
        }
        product = await ProducteService.createProduct(product);
        res.send(product);
        logger.info(`POST /product - ${JSON.stringify(product)}`);
    } catch (err) {
        console.log('CATCH');
        next(err);
    }
}

async function getProducts(_req, res, next) {
    try {
        res.send(await ProducteService.getProducts());
        logger.info('GET /product');
    } catch (err) {
        next(err);
    }
}

async function getProduct(req, res, next) {
    try {
        res.send(await ProducteService.getProduct(req.params.id));
        logger.info('GET /product/:id');
    } catch (err) {
        next(err);
    }
}

async function deleteProduct(req, res, next) {
    try {
        await ProducteService.deleteProduct(req.params.id);
        res.end();
        logger.info('DELETE /product/:id');
    } catch (err) {
        next(err);
    }
}

async function updateProduct(req, res, next) {
    try {
        const product = req.body;
        if (
            !product.product_id ||
            !product.name ||
            !product.description ||
            !product.value ||
            !product.stock ||
            !product.supplier_id
        ) {
            throw new Error(
                'Product Id, Name, description, value, stock, supplier_id são obrigatorios'
            );
        }
        res.send(await ProducteService.updateProduct(product));
        logger.info(`PUT /product - ${JSON.stringify(product)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
};
