


const validateService=(req,res,next)=>{
    const { avatar, name, category, description, price, location, contacts, timeFrom, timeTo } = req.body;
 

  if (!name || !category || !description || !price || !location || !contacts || !timeFrom || !timeTo) {
    return handleError(res, StatusCodes.BAD_REQUEST, "Please fill all required fields");
  }

  if (!avatar) {
    return handleError(res, StatusCodes.BAD_REQUEST, "Service image is required");
  }

  next()

}
export{validateService}