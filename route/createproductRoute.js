const express= require('express')

const productmodel=require('../model/createproductschema')
const path=require('path')


const productRoute=express.Router()
const fs=require('fs')
const multer=require('multer')
productRoute.use('/upload', express.static(path.join(__dirname, 'upload')));

const uploads='upload'
if(!fs.existsSync(uploads)){
    fs.mkdirSync(uploads)
}

const store=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        const name=Date.now()+"-"+path.extname(file.originalname)
        cb(null,name)
    }
})

const upload=multer({
    storage:store,

})


productRoute.post("/create-product",upload.single('image'),async(req,res)=>{
    try{
        const {product_name,product_price}=req.body
        const product_image=req.file

        if(!product_name || !product_price || !product_image){
            return res.json({success:false,message:"all fields are required"})
        }

        const lastid= await productmodel.findOne().sort({product_id:-1})
        const ids=lastid?lastid.product_id+1:1

        const image={
            filename:product_image.filename,
            filepath:product_image.path.replace(/\\/g,"/")
        }
        const newpro= new productmodel({
            product_id:ids,
            product_name,
            product_price,
            product_image:image
        })

        const save= await newpro.save()

        if(!save){
            return res.json({success:false,message:"product not saved to db" })
            
        }
        return res.json({success: true, message: "product  saved to db"})
    }

    catch(err){
        console.log("something error in create-product",err)
    }
})



productRoute.post("/create-multiple-product", upload.array('image',5), async (req, res) => {
    try {
        const { product_name, product_price } = req.body
        const product_image = req.files
        console.log(product_image)

        if (!product_name || !product_price || !product_image) {
            return res.json({ success: false, message: "all fields are required" })
        }

        const lastid = await productmodel.findOne().sort({ product_id: -1 })
        const ids = lastid ? lastid.product_id + 1 : 1

        const images = product_image.map(file => ({
            filename: file.filename,
            filepath: file.path.replace(/\\/g, "/")
        }));
        const newpro = new productmodel({
            product_id: ids,
            product_name,
            product_price,
            product_image: images
        })

        const save = await newpro.save()

        if (!save) {
            return res.json({ success: false, message: "product not saved to dbs" })

        }
        return res.json({ success: true, message: "product  saved to dbs" })
    }

    catch (err) {
        console.log("something error in create-products", err)
    }
})


module.exports=productRoute