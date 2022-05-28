import SuppliereService from '../services/supplier.service.js';

async function createSupplier(req, res, next) {
    try {
        let supplier = req.body;
        if (
            !supplier.name ||
            !supplier.cnpj ||
            !supplier.phone ||
            !supplier.email ||
            !supplier.address
        ) {
            throw new Error(
                'Name, cnpj, phone, email, address são obrigatorios'
            );
        }
        supplier = await SuppliereService.createSupplier(supplier);
        res.send(supplier);
        logger.info(`POST /supplier - ${JSON.stringify(supplier)}`);
    } catch (err) {
        console.log('CATCH');
        next(err);
    }
}

async function getSuppliers(_req, res, next) {
    try {
        res.send(await SuppliereService.getSuppliers());
        logger.info('GET /supplier');
    } catch (err) {
        next(err);
    }
}

async function getSupplier(req, res, next) {
    try {
        res.send(await SuppliereService.getSupplier(req.params.id));
        logger.info('GET /supplier/:id');
    } catch (err) {
        next(err);
    }
}

async function deleteSupplier(req, res, next) {
    try {
        await SuppliereService.deleteSupplier(req.params.id);
        res.end();
        logger.info('DELETE /supplier/:id');
    } catch (err) {
        next(err);
    }
}

async function updateSupplier(req, res, next) {
    try {
        const supplier = req.body;
        if (
            !supplier.supplier_id ||
            !supplier.name ||
            !supplier.cnpj ||
            !supplier.phone ||
            !supplier.email ||
            !supplier.address
        ) {
            throw new Error(
                'Supplier Id, Name, cnpj, phone, email, address são obrigatorios'
            );
        }
        res.send(await SuppliereService.updateSupplier(supplier));
        logger.info(`PUT /supplier - ${JSON.stringify(supplier)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    createSupplier,
    getSuppliers,
    getSupplier,
    deleteSupplier,
    updateSupplier,
};
