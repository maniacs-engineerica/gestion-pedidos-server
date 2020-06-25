
import SuggestionsApi from '../apis/suggestionsApi.js'

function getSuggestionsRouter() {

    const router = expression.Router()

    const suggestionsApi = new SuggestionsApi()

    router.get('/', async(req,res) => {
        try{
            const queryParams = new Map(Object.entries(req.query))
            const suggestions = suggestionsApi.get(queryParams)
            res.json(suggestions)
        }
        catch(error){
            res.status(error.status).json(error)
        }
    })

    return router

}

export { getSuggestionsRouter }