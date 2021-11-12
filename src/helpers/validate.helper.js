module.exports = class validateHelper {
    static async prefix(prefix) {
        if (prefix.length == 1) {
            return true;
        }
        
        return false;
    }
    
    static async timezone(timezone) {
        if (timezone.match(/^([+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$/)) {
            return true;
        }
        
        return false;
    }
    
    static async cardColor(cardColor) {
        if (cardColor.match(/^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i)) {
            return true;
        }
        
        return false;
    }
    
    static async adminRole(adminRole) {
        return true;
    }
}
