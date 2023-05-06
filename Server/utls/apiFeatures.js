class ApiFeatures {
    constructor(query,querystr){
        this.query = query;
        this.querystr = querystr;
    }

    search() {
        const keyword = this.querystr.keyword ? {
            name:{
                $regex : this.querystr.keyword,
                $options : "i",
            },
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.querystr };
        const removeFields = ["keyword", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);
        console.log(queryCopy);
        let newQuery = JSON.stringify(queryCopy);
        newQuery = newQuery.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`);
        this.query = this.query.find(JSON.parse(newQuery));
        console.log(queryCopy);
        return this;
    }
}

module.exports = ApiFeatures