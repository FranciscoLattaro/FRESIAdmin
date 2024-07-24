
import bimportaciones_ from "../models/bimportaciones_.js";

// Mostrar todos los registros
export const getAllBImp = async (req, res) => {
    try {
        const bimps = await bimportaciones_.findAll()
        res.json(bimps)
    } catch (error) {
        res.json({message: error.message})
    }
}

// Mostrar un registro
export const getBImp = async (req, res) => {
    try {
        const row = await bimportaciones_.findAll({
            where : {
                id: req.params.id
            }
        })
        res.json(row[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

// Crear un registro
export const createBImp = async (req, res) => {
    try {
        await bimportaciones_.create(
            req.body
        )
        res.json({
            message: 'El registro fue creado correctamente'
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

// Actualizar un registro
export const updateBImp = async (req, res) => {
    try {
        await bimportaciones_.update(req.body,{
            where : { id: req.params.id}
        })
        res.json({
            message: 'El registro fue actualizado correctamente'
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

// Eliminar un registro
export const deleteBImp = async (req, res) => {
    try {
        await bimportaciones_.destroy({
            where : { id: req.params.id}
        })
        res.json({
            message: 'El registro fue eliminado correctamente'
        })
    } catch (error) {
        res.json({message: error.message})
    }
}