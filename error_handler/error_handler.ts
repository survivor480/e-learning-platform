const error_handler = async (err, res) => {
    console.log("Error Handler Called");

    if(err.errors !== undefined){
        return res.status(err.statusCode || 400).json({
            status: 'failed',
            message: 'Request does not meet Requirements',
            errors: err.errors
        })
    }

    if(err.error !== undefined){
        return res.status(err.statusCode || 400).json({
            status: 'failed',
            message: err.error
        })
    }

    return res.status(500).json({
        status: 'failed',
        message: 'Oops!! We ran into an error'
    })
}

const request_errors = async (validation_result) => {
    if(!validation_result.isEmpty()){
        throw validation_result.array().length === 1 ? {error: validation_result.array()[1], statusCode: 406} : {errors: validation_result.array(), statusCode: 406};
    }
}


export {error_handler, request_errors};