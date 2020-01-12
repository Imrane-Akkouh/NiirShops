class Shop{
    constructor(_id, shopName, imageUrl, longitude, latitude){
        this._id = _id;
        this.shopName = shopName;
        this.imageUrl = imageUrl;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}

module.exports = {Shop};