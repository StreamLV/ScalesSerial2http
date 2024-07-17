let weightData = {
    is_error: false,
    error: '',
    result: 0,
};

const getWeight = async (req, res, next) => {
    res.json(weightData);
}


const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getWeightFromScale = async () => {
    
};

const setWeight = (req, res, next) => {
    
    let curWeight = 0;

    try {
        curWeight = Number(req.params.weight);
    } catch (error) {
        
    }

    weightData = {
        is_error: false,
        error: '',
        result: curWeight/1000,
    };

    res.json(weightData);
}

exports.getWeightFromScale = getWeightFromScale;
exports.getWeight = getWeight;
exports.setWeight = setWeight;