import SaleRepository from '../repositories/sale.repository.js';
import ClientRepository from '../repositories/client.repository.js';
import ProductRepository from '../repositories/product.repository.js';

async function createSale(sale) {
    const product = await ProductRepository.getProduct(sale.product_id);

    if (!(await ClientRepository.getClient(sale.client_id))) {
        throw new Error('O client_id informado não existe');
    }
    if (!product) {
        throw new Error('O product_id informado não existe');
    }

    // Check se tem product no stock e decrementa o produto tambem
    if (product.stock > 0) {
        sale = await SaleRepository.insertSale(sale);
        product.stock--;
        await ProductRepository.updateProduct(product);
        return sale;
    } else {
        throw new Error('O produto informado não possui estoque.');
    }
}

async function getSales(productId) {
    if (productId) {
        return await SaleRepository.getSalesByProductId(productId);
    }
    return await SaleRepository.getSales();
}

async function getSale(id) {
    return await SaleRepository.getSale(id);
}

async function deleteSale(id) {
    // Check se tem a venda antes de deletar e Incrementa o stock do produto dessa venda
    const sale = await SaleRepository.getSale(id);
    if (sale) {
        const product = await ProductRepository.getProduct(sale.product_id);
        await SaleRepository.deleteSale(id);
        product.stock++;
        await ProductRepository.updateProduct(product);
    } else {
        throw new Error('O id da sale informada não existe');
    }
}

async function updateSale(sale) {
    if (!(await ClientRepository.getClient(sale.client_id))) {
        throw new Error('O client_id informado não existe');
    }
    if (!(await ProductRepository.getProduct(sale.product_id))) {
        throw new Error('O product_id informado não existe');
    }
    return await SaleRepository.updateSale(sale);
}

export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale,
};
