import { Product } from "../models/productModel"
import { databaseResponseTimeHistogram } from "../utils/metrics"

export const GetProducts = async () => {
    const metricsLabels = {
        operation: 'GetProducts'
    }
    const timer = databaseResponseTimeHistogram.startTimer()
    try {
        const products = await Product.find({})
        timer({ ...metricsLabels, success: 'true' })
        return products
    } catch (err) {
        timer({ ...metricsLabels, success: 'false' })
        throw err
    }
}