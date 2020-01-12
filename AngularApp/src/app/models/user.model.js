class User{
    constructor(_id, username, password, preferredShops){
        this._id = _id;
        this.username = username;
        this.password = password;
        this.preferredShops = preferredShops;
    }

    addPreferredShop(shopId){
        this.preferredShops.push(shopId);
    }

    removePreferredShop(shopId){
        let indexOfpreferredShop = this.preferredShops.indexOf(shopId,1);
        this.preferredShops.splice(indexOfpreferredShop,1);
    }
}

module.exports = {User};