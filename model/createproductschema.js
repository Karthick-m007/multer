const mongoose=require("mongoose")

const createproductschema=mongoose.Schema({
    product_id:{
        type:Number,
        required:true,
        unique:true
    },
    product_name:
    {
        type:String,
        required:true,
    },

    product_price:
    {
        type:Number,
        required:true,
    },

    product_image:
    [{
        filename:
        {
            type:String,
            required:true
        },
        filepath:
        {
            type:String,
            required:true
        }
}]
})

const productmodel= mongoose.model('multer-bked',createproductschema)

module.exports=productmodel