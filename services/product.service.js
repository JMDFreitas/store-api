import ProductRepository from '../repositories/product.repository.js';
/*
 * Necessário esse import do supplier para criar uma validação do supplier_id.
 * Quando cria ou atualiza um product, se não houver o supplier_id em questão trataremos a msg de erro que vem do database
 */
import SupplierRepository from '../repositories/supplier.repository.js';

async function createProduct(product) {
    if (await SupplierRepository.getSupplier(product.supplier_id)) {
        return await ProductRepository.insertProduct(product);
    }
    throw new Error('O Id do supplier não existe no banco de dados');
}

async function getProducts() {
    return await ProductRepository.getProducts();
}

async function getProduct(id) {
    return await ProductRepository.getProduct(id);
}

async function deleteProduct(id) {
    await ProductRepository.deleteProduct(id);
}

async function updateProduct(product) {
    if (await SupplierRepository.getSupplier(product.supplier_id)) {
        return await ProductRepository.updateProduct(product);
    }
    throw new Error('O Id do supplier não existe no banco de dados');
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
};
