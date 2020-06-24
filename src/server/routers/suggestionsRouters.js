


function getSuggestionsRouter() {

    const router = expression.Router()

    const suggestionsApi = new SuggestionsApi()

    router.get('/api/sugerencias', async(req,res) => {
        try{
            const queryParams = new Map(Object.entries(req.query))
            const suggestions = this.suggestionsApi.get(queryParams)
            res.json(suggestions)
        }
        catch(error){
            res.status(error.status).json(error)
        }
    }
    )


}